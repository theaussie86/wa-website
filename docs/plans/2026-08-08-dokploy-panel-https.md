# Dokploy-Panel unter HTTPS-Subdomain

Issue #18, Teil des VPS-Umzugs (#16).

Ziel: Das Dokploy-Panel ist über `https://dokploy.weissteiner-automation.com` erreichbar,
damit GitHub Actions später den Deploy-Endpunkt mit einem API-Key aufrufen kann statt mit
einem SSH-Root-Key. Der Panel-Port bleibt in der Firewall geschlossen.

## Ausgangslage (geprüft am 2026-08-08)

| Punkt | Stand |
|---|---|
| VPS | `1889924`, KVM 4, `186.240.157.55`, `srv1889924` |
| Dokploy | `v0.29.14`, Docker 29.7.2 im Swarm-Mode |
| Traefik | Läuft, entrypoints `web:80` und `websecure:443`, certResolver `letsencrypt` |
| Firewall `kvm4-web-ssh` | Nur 22, 80, 443 - synchronisiert |
| Port 3000 von außen | Nicht erreichbar |
| Port 80/443 von außen | Erreichbar, Traefik antwortet mit 404 (kein Router matcht) |
| SSH-Tunnel auf das Panel | Funktioniert, liefert 200 |
| Panel-Router | Noch Default: `Host(dokploy.docker.localhost)`, nur entrypoint `web`, kein TLS |
| ACME-Mail | Noch Platzhalter `test@localhost.com` - Let's Encrypt akzeptiert das nicht |
| DNS `dokploy.weissteiner-automation.com` | Zeigt auf `145.223.85.132` (alte Coolify-VPS) - gefangen vom Wildcard `*.weissteiner-automation.com` |

## Reihenfolge

Die Reihenfolge ist nicht beliebig. Sobald die Domain im Panel gesetzt wird, stellt Dokploy
den Panel-Router auf `websecure` mit Let's-Encrypt-Zertifikat um. Zeigt der A-Record zu diesem
Zeitpunkt noch nicht auf die Box, scheitert die HTTP-01-Challenge und die Domain liefert so
lange nichts Brauchbares, bis Traefik es erneut versucht. Also: **erst DNS, dann Panel.**

Der SSH-Tunnel bleibt in jedem Fall der Rückweg - er geht direkt auf Port 3000 und ist von
Traefik und Zertifikaten unabhängig.

### 1. A-Record bei IONOS (Betreiber, manuell)

DNS liegt bei IONOS, nicht bei Hostinger. Kein API-Zugriff, also von Hand:

- Typ: `A`
- Name/Host: `dokploy`
- Wert: `186.240.157.55`
- TTL: `300`

Der Wildcard-Eintrag `*.weissteiner-automation.com` bleibt unangetastet - ein expliziter
Record für `dokploy` sticht den Wildcard.

Prüfen, bis die neue Adresse kommt:

```bash
dig +short dokploy.weissteiner-automation.com A
# erwartet: 186.240.157.55
```

Der alte Wildcard-Wert kann bei Resolvern noch bis zu 3600 Sekunden im Cache liegen.

### 2. Panel-Domain setzen (Betreiber, im Panel-UI)

Tunnel aufbauen:

```bash
ssh -N -L 13000:localhost:3000 root@186.240.157.55
```

Dann `http://localhost:13000` öffnen, einloggen, und unter
**Settings → Web Server → Domain** eintragen:

| Feld | Wert |
|---|---|
| Domain / Host | `dokploy.weissteiner-automation.com` |
| Certificate | `Let's Encrypt` |
| Let's Encrypt Email | `christoph.weissteiner@gmail.com` |
| HTTPS | an |

Dokploy schreibt daraufhin `/etc/dokploy/traefik/dynamic/dokploy.yml` neu (Router auf
`websecure`, Redirect von `web`) und trägt die Mail in `traefik.yml` ein. Der Weg über das
UI ist dem Editieren der Datei vorzuziehen, weil Dokploy die Domain zusätzlich in seiner
Datenbank ablegt - sonst laufen Datei und Panel-Zustand auseinander.

Das Panel kann sich beim Speichern kurz neu verbinden. Der Tunnel bleibt gültig.

### 3. API-Key erzeugen (Betreiber, im Panel-UI)

**Settings → Profile → API/CLI → Generate API Key.**

Der Key wird genau einmal angezeigt. Ablage: Passwortmanager. Später wandert er als
Repository-Secret `DOKPLOY_API_KEY` nach GitHub (das passiert in #22, nicht hier).

Nicht im Repository ablegen, nicht in ein Runbook kopieren.

## Verifikation

Nach Schritt 2:

```bash
# Zertifikat gültig und von Let's Encrypt ausgestellt
curl -sSI https://dokploy.weissteiner-automation.com/ | head -1
echo | openssl s_client -connect dokploy.weissteiner-automation.com:443 \
  -servername dokploy.weissteiner-automation.com 2>/dev/null \
  | openssl x509 -noout -issuer -subject -dates

# HTTP leitet auf HTTPS um
curl -sS -o /dev/null -w '%{http_code} -> %{redirect_url}\n' \
  http://dokploy.weissteiner-automation.com/

# Panel-Port weiterhin dicht
nc -z -w 5 186.240.157.55 3000 && echo "FEHLER: 3000 offen" || echo "ok: 3000 dicht"

# SSH-Tunnel weiterhin nutzbar
ssh -f -N -L 13000:localhost:3000 root@186.240.157.55
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:13000/   # erwartet 200
pkill -f '13000:localhost:3000'
```

Nach Schritt 3 - der Key wird gegen die API geprüft, nicht gegen den Deploy-Endpunkt:
Zu diesem Zeitpunkt existiert noch keine Anwendung (die kommt in #21), ein
`application.deploy` hätte also keine gültige `applicationId`. Geprüft wird deshalb an
`/api/project.all`, derselbe Auth-Pfad, dieselbe `x-api-key`-Prüfung:

```bash
# mit Key: 200
curl -sS -o /dev/null -w '%{http_code}\n' \
  -H "x-api-key: $DOKPLOY_API_KEY" \
  https://dokploy.weissteiner-automation.com/api/project.all

# ohne Key: 401
curl -sS -o /dev/null -w '%{http_code}\n' \
  https://dokploy.weissteiner-automation.com/api/project.all

# falscher Key: 401
curl -sS -o /dev/null -w '%{http_code}\n' \
  -H "x-api-key: definitiv-falsch" \
  https://dokploy.weissteiner-automation.com/api/project.all
```

Sobald die Anwendung aus #21 existiert, ist der eigentliche Trigger:

```bash
curl -X POST "https://dokploy.weissteiner-automation.com/api/application.deploy" \
  -H "x-api-key: $DOKPLOY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"applicationId": "<id>"}'
```

## Wenn das Zertifikat nicht kommt

1. `dig +short dokploy.weissteiner-automation.com A` - zeigt der Record wirklich auf
   `186.240.157.55`? Solange dort die alte Adresse steht, kann die HTTP-01-Challenge nicht
   ankommen.
2. Steht in `/etc/dokploy/traefik/traefik.yml` noch `test@localhost.com`? Let's Encrypt
   lehnt die Adresse ab. Über das UI korrigieren, nicht in der Datei.
3. Traefik-Logs: `ssh root@186.240.157.55 'docker service logs dokploy-traefik --tail 100'`
4. Let's Encrypt hat Rate Limits. Nach mehreren Fehlversuchen hilft nur warten - nicht in
   einer Schleife neu auslösen.

Rückweg, falls das Panel über die Domain unerreichbar wird: SSH-Tunnel benutzen und im UI
das Zertifikat auf `None` stellen. Notfalls
`/etc/dokploy/traefik/dynamic/dokploy.yml` auf den Default zurücksetzen (Router auf
entrypoint `web`, `Host(dokploy.docker.localhost)`) - der Tunnel funktioniert unabhängig
davon weiter.

## Nicht Teil dieser Änderung

- Firewall-Regeln - stehen bereits richtig, es gibt nichts zu tun.
- Ablage des API-Keys als GitHub-Secret (#22).
- A-Records für Hauptdomain und `www` (#25).
