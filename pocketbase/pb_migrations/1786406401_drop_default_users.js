/// <reference path="../pb_data/types.d.ts" />

// PocketBase legt beim ersten Start eine Beispiel-Collection `users` an, mit
// `createRule: ""` - also offen für jeden, der die API erreicht. Erreichbar
// ist sie hier nur aus dem internen Netz, gebraucht wird sie gar nicht: die
// Guide-Session läuft über ein eigenes HS256-JWT (src/lib/guide-auth.ts), die
// Anwendung meldet sich als Superuser an. Weg damit, statt sie mit Regeln
// zuzuschnüren, die niemand mehr liest.

migrate(
  (app) => {
    const users = app.findCollectionByNameOrId("users");
    if (users) app.delete(users);
  },
  (app) => {
    // Kein Rückweg nötig: die Collection war leer und wird nirgends benutzt.
    // PocketBase legt sie bei einer frischen Instanz ohnehin wieder an.
  }
);
