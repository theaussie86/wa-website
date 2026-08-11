import PocketBase from "pocketbase";

// Serverseitiger Client für die selbst gehostete PocketBase-Instanz (#47).
//
// Das Token ist ein Impersonate-Token des Superusers `app@...` mit langer
// Laufzeit, erzeugt in der Admin-UI. Es wird nie erneuert - deshalb kein
// authRefresh, kein persistenter Auth-Store. Widerrufen wird es, indem man
// das Passwort dieses Superusers ändert.
export function getPocketBase() {
  const url = process.env.POCKETBASE_URL;
  const token = process.env.POCKETBASE_TOKEN;
  if (!url || !token) throw new Error("PocketBase env vars not configured");

  const pb = new PocketBase(url);
  pb.authStore.save(token, null);

  // Ohne das bricht das SDK zwei gleichartige Anfragen, die sich zeitlich
  // überlappen, gegenseitig ab ("autocancelled duplicate request"). Auf dem
  // Server ist genau das der Normalfall: mehrere Besucher, dieselbe Abfrage.
  pb.autoCancellation(false);

  return pb;
}
