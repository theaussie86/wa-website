#!/usr/bin/env bash
#
# Zieht eine frische PocketBase-Sicherung von der VPS auf diesen Rechner.
#
# Die Sicherungen, die PocketBase selbst nach Zeitplan anlegt, liegen im
# Volume auf demselben Server wie die Datenbank. Ein verlorener Server nimmt
# sie mit. Dieses Skript ist die Kopie außerhalb der VPS.
#
#   scripts/pocketbase-backup-pull.sh            # nach ~/Backups/pocketbase
#   scripts/pocketbase-backup-pull.sh /pfad/dir  # woanders hin
#
# Braucht POCKETBASE_TOKEN aus .env.local (Superuser-Token, siehe .env.example).

set -euo pipefail

HOST="${POCKETBASE_SSH_HOST:-cwe-dokploy}"
# Ueber das Compose-Label statt ueber den Namen: den vergibt Dokploy mit einem
# Zufallsanteil, der sich beim Neuanlegen der Anwendung aendert.
FIND='docker ps -q --filter label=com.docker.compose.service=pocketbase | head -1'
TARGET_DIR="${1:-$HOME/Backups/pocketbase}"
KEEP_LOCAL="${POCKETBASE_KEEP_LOCAL:-14}"

cd "$(dirname "${BASH_SOURCE[0]}")/.."
[[ -f .env.local ]] || { echo "Keine .env.local - POCKETBASE_TOKEN fehlt." >&2; exit 1; }
# shellcheck disable=SC1091
set -a; . ./.env.local; set +a
[[ -n "${POCKETBASE_TOKEN:-}" ]] || { echo "POCKETBASE_TOKEN nicht gesetzt." >&2; exit 1; }

mkdir -p "$TARGET_DIR"
# PocketBase prüft den Namen gegen `^[a-z0-9_-]+\.zip$` und lehnt alles andere
# mit HTTP 400 ab - deshalb kein ISO-Zeitstempel mit T und Z. Zeit ist UTC.
stamp=$(date -u +%Y%m%d-%H%M%S)
name="pb-$stamp.zip"

echo "▸ Sicherung auf dem Server anlegen: $name"
# Über die API, nicht per Kopie der SQLite-Dateien: PocketBase hält für die
# Dauer der Sicherung die Schreibvorgänge an und packt einen konsistenten
# Stand. Eine Kopie im laufenden Betrieb kann mitten in einer Transaktion
# stehen und ist dann beim Zurückspielen wertlos.
ssh "$HOST" "docker exec \$($FIND) sh -c '
  wget -qO- --header=\"Content-Type: application/json\" \
    --header=\"Authorization: $POCKETBASE_TOKEN\" \
    --post-data=\"{\\\"name\\\":\\\"$name\\\"}\" \
    http://127.0.0.1:8090/api/backups'" >/dev/null

echo "▸ Herunterladen"
ssh "$HOST" "docker exec \$($FIND) cat /pb_data/backups/$name" > "$TARGET_DIR/$name"

size=$(wc -c < "$TARGET_DIR/$name" | tr -d ' ')
[[ "$size" -gt 1000 ]] || { rm -f "$TARGET_DIR/$name"; echo "Sicherung ist leer - abgebrochen." >&2; exit 1; }

# Gegenprobe: ein Zip, das sich nicht öffnen lässt, ist kein Backup. Der Fehler
# fällt sonst erst auf, wenn man es braucht.
unzip -tq "$TARGET_DIR/$name" >/dev/null || { echo "Archiv ist beschädigt." >&2; exit 1; }

echo "  ✓ $TARGET_DIR/$name ($((size / 1024)) KB, Archiv lesbar)"

echo "▸ Ältere lokale Kopien aufräumen (die letzten $KEEP_LOCAL bleiben)"
ls -1t "$TARGET_DIR"/pb-*.zip 2>/dev/null | tail -n "+$((KEEP_LOCAL + 1))" | while read -r old; do
  echo "  weg: $(basename "$old")"
  rm -f "$old"
done

cat <<EOF

Zurückspielen (überschreibt den Datenbestand):
  scp $TARGET_DIR/$name $HOST:/tmp/
  ssh $HOST 'docker cp /tmp/$name \$(docker ps -q --filter label=com.docker.compose.service=pocketbase):/pb_data/backups/'
  Admin-UI -> Settings -> Backups -> Zeile $name -> Restore
EOF
