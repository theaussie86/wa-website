/// <reference path="../pb_data/types.d.ts" />

// Ausgangsschema des Freebie-Systems (#47), übernommen aus der abgelösten
// Supabase-Migration 20260509115847_freebie_system.sql.
//
// Abweichungen zum SQL-Original, alle drei aus PocketBase heraus:
//   - `id` ist ein 15-stelliger String, keine UUID. PocketBase vergibt ihn.
//   - `created_at` heißt `created` und ist ein autodate-Feld.
//   - Der Fremdschlüssel heißt `freebie` statt `freebie_id`; PocketBase hängt
//     bei Relationen keinen Suffix an.
//
// Keine API-Rules gesetzt: null bedeutet in PocketBase "nur Superuser". Alle
// Zugriffe laufen serverseitig über Server Actions mit dem Service-Token.

migrate(
  (app) => {
    const freebies = new Collection({
      type: "base",
      name: "freebies",
      listRule: null,
      viewRule: null,
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        { name: "slug", type: "text", required: true, max: 100 },
        { name: "title", type: "text", required: true, max: 200 },
        { name: "created", type: "autodate", onCreate: true, onUpdate: false },
      ],
      indexes: [
        "CREATE UNIQUE INDEX `idx_freebies_slug` ON `freebies` (`slug`)",
      ],
    });
    app.save(freebies);

    const progress = new Collection({
      type: "base",
      name: "freebie_progress",
      listRule: null,
      viewRule: null,
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        {
          name: "freebie",
          type: "relation",
          required: true,
          collectionId: freebies.id,
          cascadeDelete: true,
          maxSelect: 1,
        },
        { name: "email", type: "text", required: true, max: 320 },
        { name: "chapter_slug", type: "text", required: true, max: 200 },
        { name: "completed", type: "autodate", onCreate: true, onUpdate: false },
      ],
      indexes: [
        // Trägt den Toggle: ein zweites Häkchen für dieselbe Kombination
        // scheitert an dieser Stelle, nicht an einer Prüfung im Anwendungscode.
        "CREATE UNIQUE INDEX `idx_freebie_progress_unique` ON `freebie_progress` (`freebie`, `email`, `chapter_slug`)",
      ],
    });
    app.save(progress);

    // Die eine Zeile, die die Anwendung erwartet. Ohne sie liefert
    // getCompletedChapters() eine leere Liste und der Toggle den Fehler
    // "Freebie nicht gefunden".
    const record = new Record(freebies);
    record.set("slug", "second-brain-anleitung");
    record.set("title", "Second Brain Anleitung");
    app.save(record);
  },
  (app) => {
    // Reihenfolge zählt: freebie_progress hängt per Relation an freebies.
    app.delete(app.findCollectionByNameOrId("freebie_progress"));
    app.delete(app.findCollectionByNameOrId("freebies"));
  }
);
