#!/usr/bin/env bash
#
# Bringt Schema und Image von PocketBase auf der VPS auf den Stand des
# Repositories: Migrationen hochladen, Image bereitstellen, Container neu
# starten, auf den Health-Check warten.
#
# Den Container selbst betreibt Dokploy (Compose-Anwendung "pocketbase",
# Provider Raw). Dieses Skript fasst seinen Lebenszyklus nicht an - es füllt
# nur das gemountete Migrationsverzeichnis und stößt einen Neustart an, weil
# PocketBase Migrationen ausschließlich beim Start anwendet.
#
# Ändert sich die Compose-Datei selbst, gehört sie von Hand ins Panel:
# Dokploy liest nicht aus diesem Repository.
#
#   scripts/pocketbase-deploy.sh            # Migrationen ausrollen
#   scripts/pocketbase-deploy.sh --status   # nur nachsehen, nichts ändern

set -euo pipefail

HOST="${POCKETBASE_SSH_HOST:-cwe-dokploy}"
REMOTE_DIR="${POCKETBASE_REMOTE_DIR:-/opt/pocketbase}"
LOCAL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../pocketbase" && pwd)"

# Der Containername wechselt mit dem Namen, den Dokploy der Anwendung gibt.
# Stabil ist das Compose-Label - danach wird gesucht, nicht nach dem Namen.
FIND_CONTAINER='docker ps -q --filter label=com.docker.compose.service=pocketbase | head -1'

if [[ -t 1 ]] && command -v tput >/dev/null 2>&1; then
  BOLD=$(tput bold); DIM=$(tput dim); RESET=$(tput sgr0)
  GREEN=$(tput setaf 2); RED=$(tput setaf 1); YELLOW=$(tput setaf 3)
else
  BOLD=""; DIM=""; RESET=""; GREEN=""; RED=""; YELLOW=""
fi
ok()   { printf '  %s✓%s %s\n' "$GREEN" "$RESET" "$1"; }
info() { printf '  %s%s%s\n' "$DIM" "$1" "$RESET"; }
warn() { printf '  %s⚠ %s%s\n' "$YELLOW" "$1" "$RESET"; }
die()  { printf '  %s✗ %s%s\n' "$RED" "$1" "$RESET" >&2; exit 1; }
step() { printf '\n%s▸ %s%s\n' "$BOLD" "$1" "$RESET"; }

container() { ssh "$HOST" "$FIND_CONTAINER"; }

status() {
  step "Status"
  ssh "$HOST" "docker ps --filter label=com.docker.compose.service=pocketbase \
    --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}'"
  ssh "$HOST" "docker volume inspect pocketbase-pb-data --format '  Volume: {{.Mountpoint}}'" 2>/dev/null \
    || warn "Volume pocketbase-pb-data existiert nicht"
}

if [[ "${1:-}" == "--status" ]]; then
  status
  exit 0
fi

cid=$(container)
[[ -n "$cid" ]] || die "Kein PocketBase-Container gefunden. Läuft die Compose-Anwendung in Dokploy?"

step "Migrationen hochladen nach $HOST:$REMOTE_DIR/pb_migrations"
ssh "$HOST" "mkdir -p '$REMOTE_DIR/pb_migrations'"

# Kein --delete: PocketBase legt bei Schemaänderungen über die Admin-UI selbst
# Migrationsdateien in diesem Verzeichnis ab. Die zu löschen, weil sie im
# Repository fehlen, würde genau die Historie wegwerfen, die man dort haben
# will. Stattdessen unten der Hinweis auf die Abweichung.
#
# -i statt --info=NAME: das rsync von macOS ist openrsync und kennt --info
# nicht. Die Ausgabe wird gebraucht - ohne Änderung kein Neustart.
migration_changes=$(rsync -aiz \
  "$LOCAL_DIR/pb_migrations/" \
  "$HOST:$REMOTE_DIR/pb_migrations/" | grep -E '\.js$' || true)

if [[ -n "$migration_changes" ]]; then
  ok "geändert:"
  printf '    %s\n' "$migration_changes"
else
  info "keine Änderung"
fi

extra=$(ssh "$HOST" "ls -1 '$REMOTE_DIR/pb_migrations' 2>/dev/null" \
  | grep -vxF -f <(ls -1 "$LOCAL_DIR/pb_migrations") || true)
if [[ -n "$extra" ]]; then
  warn "Auf dem Server liegen Migrationen, die das Repository nicht kennt:"
  printf '    %s\n' $extra
  warn "Diese Dateien nach pocketbase/pb_migrations/ übernehmen und committen."
fi

step "Image bereitstellen"
# Eigene Docker-Konfiguration: In /root/.docker/config.json liegen die
# GHCR-Zugangsdaten, die Dokploy für das private Image der Anwendung angelegt
# hat. Docker schickt sie an ghcr.io auch für fremde, öffentliche Pakete mit -
# und bekommt für die ein "denied" zurück, statt anonym zu ziehen. Ein leeres
# Konfigurationsverzeichnis umgeht das, ohne die Zugangsdaten anzufassen.
# Liegt das Image lokal, zieht auch Dokploy es nicht neu.
image=$(grep -oE 'ghcr\.io/[^ ]+' "$LOCAL_DIR/docker-compose.yml" | head -1)
ssh "$HOST" "mkdir -p /tmp/pocketbase-pull && \
  DOCKER_CONFIG=/tmp/pocketbase-pull docker pull '$image' | tail -1"

if [[ -z "$migration_changes" ]]; then
  status
  printf '\nNichts anzuwenden - kein Neustart.\n\n'
  exit 0
fi

step "Neustart, damit die Migrationen angewandt werden"
# Kostet ein paar Sekunden, in denen die Schreibpfade des Guides ins Leere
# laufen. Deshalb nur bei tatsächlich geänderten Migrationen.
ssh "$HOST" "docker restart \$($FIND_CONTAINER)" >/dev/null
ok "neu gestartet"

step "Auf Health-Check warten"
for i in $(seq 1 30); do
  state=$(ssh "$HOST" "docker inspect --format '{{.State.Health.Status}}' \$($FIND_CONTAINER) 2>/dev/null" || true)
  case "$state" in
    healthy) ok "gesund"; break ;;
    unhealthy) die "Container ist unhealthy - docker logs \$($FIND_CONTAINER)" ;;
    *) info "Status: ${state:-startet}"; sleep 2 ;;
  esac
  [[ $i -eq 30 ]] && die "Nach 60 Sekunden nicht gesund"
done

step "Angewandte Migrationen"
ssh "$HOST" "docker exec \$($FIND_CONTAINER) ls -1 /pb_migrations" | sed 's/^/  /'

status

printf '\n%sAdmin-UI:%s ssh -N -L 8090:127.0.0.1:8090 %s   →   http://127.0.0.1:8090/_/\n\n' \
  "$BOLD" "$RESET" "$HOST"
