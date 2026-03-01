# Kontaktformular Gmail API Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Connect the contact form to send emails via Gmail API using a Google Workspace Service Account.

**Architecture:** Next.js API Route receives form data, validates input, uses googleapis library to send email via Gmail API with Service Account authentication and domain-wide delegation.

**Tech Stack:** Next.js 14 App Router, googleapis, Google Workspace Service Account

---

## Task 0: Setup - Install Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install googleapis package**

Run:
```bash
npm install googleapis
```

**Step 2: Verify installation**

Run: `cat package.json | grep googleapis`
Expected: `"googleapis": "^..."`

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add googleapis dependency for Gmail API"
```

---

## Task 1: Create Gmail Service

**Files:**
- Create: `src/lib/gmail.ts`

**Step 1: Create the Gmail service file**

```typescript
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

interface EmailOptions {
  to: string;
  from: string;
  replyTo: string;
  subject: string;
  body: string;
}

function createRawEmail(options: EmailOptions): string {
  const messageParts = [
    `From: ${options.from}`,
    `To: ${options.to}`,
    `Reply-To: ${options.replyTo}`,
    `Subject: =?UTF-8?B?${Buffer.from(options.subject).toString("base64")}?=`,
    `Content-Type: text/plain; charset=UTF-8`,
    ``,
    options.body,
  ];

  const message = messageParts.join("\n");
  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const userEmail = process.env.GMAIL_USER_EMAIL;

  if (!serviceAccountEmail || !privateKey || !userEmail) {
    throw new Error("Missing Gmail API configuration");
  }

  const auth = new google.auth.JWT({
    email: serviceAccountEmail,
    key: privateKey,
    scopes: SCOPES,
    subject: userEmail,
  });

  const gmail = google.gmail({ version: "v1", auth });

  const raw = createRawEmail(options);

  await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw,
    },
  });
}
```

**Step 2: Commit**

```bash
git add src/lib/gmail.ts
git commit -m "feat: add Gmail service for sending emails via Service Account"
```

---

## Task 2: Create Contact API Route

**Files:**
- Create: `src/app/api/contact/route.ts`

**Step 1: Create the API route**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/gmail";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitize(str: string): string {
  return str
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validation
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: "Alle Felder sind erforderlich" },
        { status: 400 }
      );
    }

    if (!isValidEmail(data.email)) {
      return NextResponse.json(
        { error: "Ungültige E-Mail-Adresse" },
        { status: 400 }
      );
    }

    if (data.name.length > 100 || data.message.length > 5000) {
      return NextResponse.json(
        { error: "Eingabe zu lang" },
        { status: 400 }
      );
    }

    const name = sanitize(data.name);
    const email = sanitize(data.email);
    const message = sanitize(data.message);

    const fromEmail = process.env.GMAIL_FROM_ALIAS || process.env.GMAIL_USER_EMAIL;
    const toEmail = process.env.GMAIL_FROM_ALIAS || process.env.GMAIL_USER_EMAIL;

    if (!fromEmail || !toEmail) {
      console.error("Missing email configuration");
      return NextResponse.json(
        { error: "Server-Konfigurationsfehler" },
        { status: 500 }
      );
    }

    await sendEmail({
      to: toEmail,
      from: fromEmail,
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${name}`,
      body: `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "E-Mail konnte nicht gesendet werden" },
      { status: 500 }
    );
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/contact/route.ts
git commit -m "feat: add contact form API route with validation"
```

---

## Task 3: Create Contact Form Client Component

**Files:**
- Create: `src/app/kontakt/contact-form.tsx`

**Step 1: Create the client component**

```tsx
"use client";

import { useState, FormEvent } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unbekannter Fehler");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Etwas ist schiefgelaufen"
      );
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-sm p-6 text-center">
        <p className="text-green-800 font-medium mb-2">
          Vielen Dank für Ihre Nachricht!
        </p>
        <p className="text-green-700 text-sm">
          Ich melde mich innerhalb von 24 Stunden.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-green-600 underline hover:no-underline"
        >
          Neue Nachricht senden
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-sm p-4 text-red-700 text-sm">
          {errorMessage}
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-charcoal mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === "loading"}
          className="w-full px-4 py-3 border border-primary/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-charcoal mb-2"
        >
          E-Mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className="w-full px-4 py-3 border border-primary/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-charcoal mb-2"
        >
          Nachricht
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={status === "loading"}
          className="w-full px-4 py-3 border border-primary/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Wird gesendet..." : "Nachricht senden"}
      </button>

      <p className="text-center text-sm text-charcoal/60">
        Ich melde mich innerhalb von 24 Stunden.
      </p>
    </form>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/kontakt/contact-form.tsx
git commit -m "feat: add ContactForm client component with status handling"
```

---

## Task 4: Update Kontakt Page

**Files:**
- Modify: `src/app/kontakt/page.tsx`

**Step 1: Import and use the ContactForm component**

Replace the static `<form>` element (lines 91-134) with the new `ContactForm` component.

Add import at top:
```tsx
import { ContactForm } from "./contact-form";
```

Replace the `<form className="space-y-6">...</form>` block with:
```tsx
<ContactForm />
```

**Step 2: Commit**

```bash
git add src/app/kontakt/page.tsx
git commit -m "feat: integrate ContactForm component into contact page"
```

---

## Task 5: Add Environment Variables Template

**Files:**
- Create: `.env.example`

**Step 1: Create .env.example**

```env
# Gmail API (Service Account)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GMAIL_USER_EMAIL=your-workspace-user@weissteiner-automation.com
GMAIL_FROM_ALIAS=info@weissteiner-automation.com
```

**Step 2: Update .gitignore if needed**

Ensure `.env.local` is in `.gitignore` (should already be there for Next.js).

**Step 3: Commit**

```bash
git add .env.example
git commit -m "docs: add .env.example for Gmail API configuration"
```

---

## Task 6: Manual Testing & Google Cloud Setup

**This task requires manual steps outside of code:**

**Step 1: Google Cloud Console Setup**

1. Go to https://console.cloud.google.com
2. Create or select a project
3. Enable Gmail API: APIs & Services → Library → Gmail API → Enable
4. Create Service Account: IAM & Admin → Service Accounts → Create
5. Create key: Click service account → Keys → Add Key → JSON
6. Note the service account email (ends with @...iam.gserviceaccount.com)

**Step 2: Google Workspace Admin Setup**

1. Go to https://admin.google.com
2. Security → API Controls → Domain-wide Delegation
3. Add new API client:
   - Client ID: (from service account JSON, field "client_id")
   - OAuth Scopes: `https://www.googleapis.com/auth/gmail.send`

**Step 3: Add Vercel Environment Variables**

1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` = service account email
   - `GOOGLE_PRIVATE_KEY` = private_key from JSON (with quotes)
   - `GMAIL_USER_EMAIL` = your workspace user email
   - `GMAIL_FROM_ALIAS` = info@weissteiner-automation.com

**Step 4: Local Testing**

1. Create `.env.local` with same variables
2. Run `npm run dev`
3. Go to http://localhost:3000/kontakt
4. Submit test form
5. Check inbox for email

---

## Summary

| Task | Description | Commit Message |
|------|-------------|----------------|
| 0 | Install googleapis | `chore: add googleapis dependency` |
| 1 | Create Gmail service | `feat: add Gmail service for sending emails` |
| 2 | Create API route | `feat: add contact form API route` |
| 3 | Create ContactForm component | `feat: add ContactForm client component` |
| 4 | Update kontakt page | `feat: integrate ContactForm component` |
| 5 | Add .env.example | `docs: add .env.example` |
| 6 | Manual Google Cloud setup | (no commit) |
