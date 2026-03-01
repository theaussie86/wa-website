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
