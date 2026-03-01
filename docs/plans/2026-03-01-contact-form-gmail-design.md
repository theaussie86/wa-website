# Kontaktformular mit Gmail API (Service Account)

## Übersicht

Das Kontaktformular auf `/kontakt` wird mit der Gmail API verbunden, um E-Mails an info@weissteiner-automation.com zu senden. Authentifizierung erfolgt über einen Google Workspace Service Account.

## Architektur

```
[Kontaktformular] → [Next.js API Route] → [Gmail API] → [info@weissteiner-automation.com]
        ↓                    ↓
   Client-Side         Server-Side
   Validierung         Validierung + E-Mail senden
```

## Komponenten

### 1. API Route: `src/app/api/contact/route.ts`

- POST-Endpoint für Formular-Submissions
- Input-Validierung (Name, E-Mail, Nachricht)
- XSS-Schutz durch Sanitization
- Sendet E-Mail über Gmail API
- Gibt JSON-Response zurück (success/error)

### 2. Gmail Service: `src/lib/gmail.ts`

- Service Account Authentication mit googleapis
- `sendEmail()` Funktion
- Base64-kodierte E-Mail nach RFC 2822

### 3. Kontaktformular Update: `src/app/kontakt/page.tsx`

- Client Component für Interaktivität
- React State für Formularfelder
- Loading, Success, Error States
- Client-seitige Validierung vor Submit

## Environment Variables

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=...@...iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...
GMAIL_USER_EMAIL=<workspace-user>@weissteiner-automation.com
GMAIL_FROM_ALIAS=info@weissteiner-automation.com
```

## E-Mail Format

- **Von:** info@weissteiner-automation.com (Alias)
- **An:** info@weissteiner-automation.com
- **Reply-To:** E-Mail des Absenders
- **Betreff:** Neue Kontaktanfrage von [Name]
- **Body:**
  ```
  Name: [Name]
  E-Mail: [E-Mail]

  Nachricht:
  [Nachricht]
  ```

## Google Cloud Setup (Manuell)

1. Google Cloud Console → Neues Projekt oder existierendes auswählen
2. Gmail API aktivieren
3. Service Account erstellen
4. JSON-Key herunterladen
5. In Google Workspace Admin → Domain-wide Delegation aktivieren
6. OAuth Scope hinzufügen: `https://www.googleapis.com/auth/gmail.send`

## Sicherheit

- Credentials nur server-seitig (nie im Client)
- Input-Validierung auf Server-Seite
- Rate Limiting über Vercel (optional)

## Dependencies

- `googleapis` - Google APIs Node.js Client
