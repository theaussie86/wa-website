# Schema als Code

PocketBase verwaltet sein Schema in der SQLite-Datei im Volume. Diese
Verzeichnis ist die nachvollziehbare Fassung davon: jede Datei hier ist eine
Migration, die PocketBase beim Start genau einmal anwendet und in der Tabelle
`_migrations` abhakt.

## Schema ändern

Zwei Wege, beide gültig, aber nicht beliebig mischbar:

**Über eine neue Datei (bevorzugt).** Datei nach dem Muster
`<unix-timestamp>_<beschreibung>.js` anlegen, `migrate(up, down)` ausfüllen,
committen, `scripts/pocketbase-deploy.sh` laufen lassen. Der Container wendet
sie beim Start an.

**Über die Admin-UI.** PocketBase schreibt die Änderung dann selbst als
Migrationsdatei nach `/pb_migrations`, also in das gemountete Verzeichnis auf
dem Server. Diese Datei gehört anschließend hierher ins Repository:

```bash
rsync -az cwe-dokploy:/opt/pocketbase/pb_migrations/ pocketbase/pb_migrations/
git status pocketbase/pb_migrations
```

`scripts/pocketbase-deploy.sh` meldet Dateien, die auf dem Server liegen und
hier fehlen. Diese Meldung ist der Hinweis, dass jemand die Admin-UI benutzt
und den Rückweg vergessen hat.

## Was hier nicht passiert

Migrationen werden **nicht** rückwärts angewandt, nur weil eine Datei
verschwindet. Der `down`-Teil läuft ausschließlich über
`pocketbase migrate down`, von Hand. Eine hier gelöschte Datei ist damit kein
Rollback, sondern nur eine Lücke in der Historie.
