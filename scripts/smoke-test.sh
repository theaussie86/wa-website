#!/usr/bin/env bash
#
# Smoke-Test der Laufzeitumgebung (#23).
#
# Prueft die HTTP-Oberflaeche des laufenden Containers von aussen: Statuscodes,
# Inhalte, tatsaechliche Seiteneffekte. Kein Wissen ueber Dateipfade im Image,
# Layer-Aufbau oder Dokploy-Interna.
#
# Vor dem DNS-Cutover laeuft der Test direkt gegen die Server-Adresse mit
# gesetztem Host-Header, damit die Live-Domain unberuehrt bleibt:
#
#   ./scripts/smoke-test.sh --ip 186.240.157.55
#
# Nach dem Cutover derselbe Ablauf gegen die echte Domain, dann mit
# Zertifikatspruefung und www-Weiterleitung:
#
#   ./scripts/smoke-test.sh
#
# Zwei Pruefungen haben echte Seiteneffekte und laufen nur auf Zuruf:
#
#   --contact             sendet eine echte Kontaktanfrage (Mail wird zugestellt)
#   --doi <email>         laeuft den Double-Opt-in-Pfad mit einem in Brevo
#                         bestaetigten Kontakt durch
#
set -uo pipefail

HOST="weissteiner-automation.com"
IP=""
RUN_CONTACT=0
DOI_EMAIL=""

while [ $# -gt 0 ]; do
  case "$1" in
    --host) HOST="$2"; shift 2 ;;
    --ip) IP="$2"; shift 2 ;;
    --contact) RUN_CONTACT=1; shift ;;
    --doi) DOI_EMAIL="$2"; shift 2 ;;
    -h|--help) sed -n '2,30p' "$0"; exit 0 ;;
    *) echo "Unbekannte Option: $1" >&2; exit 2 ;;
  esac
done

BASE="https://$HOST"
CURL=(curl -sS --max-time 30)

# Vor dem Cutover zeigt die Namensaufloesung noch auf das alte Hosting. --resolve
# schickt den Request an die neue Adresse, der Host-Header bleibt die echte
# Domain. Traefik hat fuer diese Domain noch kein Zertifikat, weil Let's Encrypt
# sie noch nicht auf dieser Maschine sieht - deshalb hier -k. Nach dem Cutover
# faellt beides weg und das Zertifikat wird scharf geprueft.
if [ -n "$IP" ]; then
  CURL+=(--resolve "$HOST:443:$IP" -k)
  MODE="VPS $IP (Host: $HOST, Zertifikat ungeprueft)"
else
  MODE="$BASE (Zertifikat geprueft)"
fi

CHAPTER="/second-brain-anleitung/guide/was-ist-ein-second-brain"

PASS=0
FAIL=0
SKIP=0
FAILED_NAMES=()

ok()   { printf '  \033[32mOK\033[0m    %s\n' "$1"; PASS=$((PASS + 1)); }
bad()  { printf '  \033[31mFEHLER\033[0m %s\n     -> %s\n' "$1" "$2"; FAIL=$((FAIL + 1)); FAILED_NAMES+=("$1"); }
skip() { printf '  \033[33m-\033[0m     %s (uebersprungen: %s)\n' "$1" "$2"; SKIP=$((SKIP + 1)); }
head_() { printf '\n\033[1m%s\033[0m\n' "$1"; }

# status <name> <pfad> <erwarteter code>
status() {
  local name="$1" path="$2" want="$3" got
  got=$("${CURL[@]}" -o /dev/null -w '%{http_code}' "$BASE$path" 2>&1)
  if [ "$got" = "$want" ]; then ok "$name ($path -> $got)"
  else bad "$name" "$path lieferte $got statt $want"; fi
}

# contains <name> <pfad> <erwarteter code> <erwarteter textbaustein>
contains() {
  local name="$1" path="$2" want="$3" needle="$4" body code
  body=$("${CURL[@]}" -w '\n%{http_code}' "$BASE$path" 2>&1)
  code=$(printf '%s' "$body" | tail -n1)
  if [ "$code" != "$want" ]; then
    bad "$name" "$path lieferte $code statt $want"; return
  fi
  if printf '%s' "$body" | grep -qF "$needle"; then ok "$name ($path -> $code, Inhalt gefunden)"
  else bad "$name" "$path lieferte $code, aber \"$needle\" fehlt im Markup"; fi
}

printf '\033[1mSmoke-Test\033[0m %s\n' "$MODE"

head_ "1. Plattform"

status "Health-Endpoint erreichbar" "/api/health" "200"
health=$("${CURL[@]}" "$BASE/api/health" 2>&1)
if [ "$health" = '{"status":"ok"}' ]; then ok "Health-Endpoint liefert das Erfolgsobjekt"
else bad "Health-Endpoint liefert das Erfolgsobjekt" "Antwort war: $health"; fi

head_ "2. Seiten"

# Die Startseite muss Inhalt tragen, nicht nur 200 - #34 hat gezeigt, dass ein
# leerer Seitenbaum serverseitig mit Status 200 ausgeliefert werden kann.
contains "Startseite" "/" "200" "Weissteiner Automation"
contains "Blog-Uebersicht" "/blog" "200" "<article"
# Deckt MDX-Verarbeitung und Dateisystem-Zugriff im Container ab.
contains "Blogartikel" "/blog/spart-ki-wirklich-zeit" "200" "<h1"
contains "Kontaktseite" "/kontakt" "200" "<form"

head_ "3. Auslieferung"

# Statisches Asset aus public/ - liegt im Image, nicht im Build-Output.
status "Statisches Asset (public/)" "/robots.txt" "200"
status "Logo aus public/" "/logo-wide.svg" "200"

# Image-Optimizer: der einzige Pfad mit nativer Abhaengigkeit (sharp unter
# Alpine/musl). Ein Fehler hier zeigt sich sonst erst als kaputte Bilder.
# Mit Accept: image/webp muss auch der Encoder laufen, nicht nur der Resizer -
# genau der Schritt bricht, wenn sharp gegen die falsche libc gebaut wurde.
img=$("${CURL[@]}" -H 'Accept: image/webp,image/*' \
  -o /dev/null -w '%{http_code} %{content_type} %{size_download}' \
  "$BASE/_next/image?url=%2Fgruenten.jpg&w=1080&q=75" 2>&1)
img_code=$(printf '%s' "$img" | cut -d' ' -f1)
img_type=$(printf '%s' "$img" | cut -d' ' -f2)
img_size=$(printf '%s' "$img" | cut -d' ' -f3)
if [ "$img_code" = "200" ] && [ "$img_type" = "image/webp" ] && [ "${img_size:-0}" -gt 1000 ]; then
  ok "Image-Optimizer (sharp) transkodiert nach $img_type, $img_size Bytes"
else
  bad "Image-Optimizer (sharp)" "Antwort war: $img (erwartet: 200 image/webp)"
fi

head_ "4. Lead-Wege"

# Kontaktformular: der Test gilt erst als bestanden, wenn die Mail zugestellt
# wurde. success:true heisst nur, dass die Gmail-API den Auftrag angenommen hat -
# das ist der Nachweis, dass der mehrzeilige GOOGLE_PRIVATE_KEY korrekt beim
# Container ankommt. Die Zustellung selbst wird im Postfach geprueft.
if [ "$RUN_CONTACT" = "1" ]; then
  stamp=$(date +%Y-%m-%dT%H:%M:%S)
  payload=$(printf '{"name":"Smoke-Test %s","email":"smoke-test@weissteiner-automation.com","message":"Automatischer Smoke-Test der VPS-Umgebung (#23) vom %s. Diese Nachricht kann geloescht werden."}' "$stamp" "$stamp")
  resp=$("${CURL[@]}" -X POST -H 'Content-Type: application/json' -d "$payload" \
    -w '\n%{http_code}' "$BASE/api/contact" 2>&1)
  code=$(printf '%s' "$resp" | tail -n1)
  body=$(printf '%s' "$resp" | sed '$d')
  if [ "$code" = "200" ] && printf '%s' "$body" | grep -q '"success":true'; then
    ok "Kontaktformular angenommen (Betreff: \"Neue Kontaktanfrage von Smoke-Test $stamp\")"
    printf '        \033[33mmanuell zu bestaetigen:\033[0m Mail im Postfach angekommen?\n'
  else
    bad "Kontaktformular" "POST /api/contact lieferte $code: $body"
  fi
else
  skip "Kontaktformular (echte Mail)" "--contact nicht gesetzt"
fi

# Double-Opt-in-Pfad: bestaetigt Brevo-Anbindung (Kontaktabfrage), JWT-Secret
# (Token wird signiert) und Supabase (die Kapitelseite liest den Fortschritt).
if [ -n "$DOI_EMAIL" ]; then
  jar=$(mktemp)
  loc=$("${CURL[@]}" -o /dev/null -c "$jar" \
    -w '%{http_code} %{redirect_url}' \
    "$BASE/api/auth/confirm?email=$(printf '%s' "$DOI_EMAIL" | sed 's/@/%40/')" 2>&1)
  code=$(printf '%s' "$loc" | cut -d' ' -f1)
  target=$(printf '%s' "$loc" | cut -d' ' -f2-)
  # Absolut pruefen, nicht nur den Pfad: der Nutzer klickt diesen Link in seinem
  # Mailprogramm, ein falscher Host macht ihn wertlos. Ein reiner Pfad-Vergleich
  # laesst genau diesen Fehler durch.
  if [ "$target" = "$BASE/second-brain-anleitung/guide/" ]; then
    ok "Bestaetigungslink leitet auf den Guide ($code -> $target)"
  else
    bad "Bestaetigungslink" "lieferte $code -> $target (erwartet: $BASE/second-brain-anleitung/guide/)"
  fi

  if grep -q 'guide_token' "$jar"; then
    ok "JWT-Token wurde signiert und als Cookie gesetzt (GUIDE_JWT_SECRET aktiv)"
  else
    bad "JWT-Token" "kein guide_token-Cookie in der Antwort"
  fi

  # Mit dem Cookie durch den Proxy auf eine Kapitelseite.
  page=$(mktemp)
  chapter=$("${CURL[@]}" -b "$jar" -o "$page" -w '%{http_code}' \
    "$BASE$CHAPTER" 2>&1)
  if [ "$chapter" = "200" ]; then
    ok "Guide-Kapitel mit Token erreichbar ($chapter)"
  else
    bad "Guide-Kapitel" "lieferte $chapter statt 200"
  fi

  # Status 200 auf der Kapitelseite beweist Supabase NICHT: der Lesepfad
  # (getCompletedChapters) verschluckt jeden Fehler und liefert eine leere
  # Liste, die Seite rendert trotzdem. Nachgewiesen ist die Verbindung erst
  # durch einen echten Schreibvorgang. Die Server Action wird direkt
  # aufgerufen; ihre ID wechselt mit jedem Build und wird deshalb aus den
  # ausgelieferten Chunks gelesen statt fest verdrahtet.
  chunkdir=$(mktemp -d)
  action=""
  for u in $(grep -o '/_next/static/chunks/[^"]*\.js' "$page" | sort -u); do
    "${CURL[@]}" -o "$chunkdir/$(basename "$u")" "$BASE$u" 2>/dev/null
  done
  action=$(grep -ho 'createServerReference)\?("[0-9a-f]\{40,64\}"[^)]*toggleChapterComplete' "$chunkdir"/*.js 2>/dev/null \
    | head -n1 | grep -o '[0-9a-f]\{40,64\}')
  rm -rf "$chunkdir"

  if [ -z "$action" ]; then
    bad "Supabase-Schreibpfad" "Server-Action-ID nicht in den Chunks gefunden - Pruefung nicht moeglich"
  else
    # Zweimal aufrufen: der erste Aufruf schaltet um, der zweite zurueck. Der
    # Datenbestand ist danach unveraendert.
    res1=$("${CURL[@]}" -b "$jar" -X POST "$BASE$CHAPTER" \
      -H "Next-Action: $action" -H "Content-Type: text/plain;charset=UTF-8" \
      --data '["was-ist-ein-second-brain"]' 2>&1 | grep -o '{"completed":[a-z]*}\|{"error":"[^"]*"}' | head -n1)
    res2=$("${CURL[@]}" -b "$jar" -X POST "$BASE$CHAPTER" \
      -H "Next-Action: $action" -H "Content-Type: text/plain;charset=UTF-8" \
      --data '["was-ist-ein-second-brain"]' 2>&1 | grep -o '{"completed":[a-z]*}\|{"error":"[^"]*"}' | head -n1)
    if printf '%s' "$res1" | grep -q '"completed"' && printf '%s' "$res2" | grep -q '"completed"'; then
      ok "Supabase-Schreibpfad bestaetigt (Fortschritt gesetzt und zurueckgenommen)"
    else
      bad "Supabase-Schreibpfad" "Server Action antwortete: $res1 / $res2"
    fi
  fi
  rm -f "$page" "$jar"

  # Gegenprobe: ohne Token schickt der Proxy zurueck auf die Landingpage.
  gated=$("${CURL[@]}" -o /dev/null -w '%{redirect_url}' "$BASE$CHAPTER" 2>&1)
  if printf '%s' "$gated" | grep -q '/second-brain-anleitung'; then
    ok "Guide ohne Token bleibt gesperrt"
  else
    bad "Guide-Sperre" "ohne Token kam: $gated"
  fi
else
  skip "Double-Opt-in-Pfad" "--doi <email> nicht gesetzt"
fi

head_ "5. Domain"

# Vor dem Cutover nicht pruefbar: das Zertifikat stellt Traefik erst aus, wenn
# die Domain auf diese Maschine zeigt, und die www-Weiterleitung haengt am
# zweiten A-Record.
if [ -n "$IP" ]; then
  skip "Gueltiges Zertifikat" "vor dem Cutover nicht pruefbar"
  skip "www-Weiterleitung" "vor dem Cutover nicht pruefbar"
else
  if curl -sS --max-time 20 -o /dev/null "$BASE/" 2>/dev/null; then
    ok "Zertifikat ist gueltig und auf $HOST ausgestellt"
  else
    bad "Zertifikat" "Verbindung ohne -k schlug fehl"
  fi
  wloc=$(curl -sS --max-time 20 -o /dev/null -w '%{http_code} %{redirect_url}' "https://www.$HOST/" 2>&1)
  wcode=$(printf '%s' "$wloc" | cut -d' ' -f1)
  wtarget=$(printf '%s' "$wloc" | cut -d' ' -f2-)
  if [ "$wcode" = "301" ] || [ "$wcode" = "308" ]; then
    if printf '%s' "$wtarget" | grep -q "^https://$HOST"; then
      ok "www leitet dauerhaft auf $BASE weiter ($wcode)"
    else
      bad "www-Weiterleitung" "$wcode -> $wtarget"
    fi
  else
    bad "www-Weiterleitung" "lieferte $wcode -> $wtarget (erwartet: 301 oder 308)"
  fi
fi

printf '\n\033[1mErgebnis:\033[0m %d bestanden, %d fehlgeschlagen, %d uebersprungen\n' "$PASS" "$FAIL" "$SKIP"
if [ "$FAIL" -gt 0 ]; then
  printf 'Fehlgeschlagen:\n'
  for n in "${FAILED_NAMES[@]}"; do printf '  - %s\n' "$n"; done
  exit 1
fi
exit 0
