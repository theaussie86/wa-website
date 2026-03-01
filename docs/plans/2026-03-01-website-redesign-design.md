# Website Redesign Design Document

*Approved: 2026-03-01*

## Overview

Complete rebuild of weissteiner-automation.com using Next.js. Moving from WordPress to a modern, fast, distinctive site that reflects the "Modern Handwerk" brand identity.

**Pages:** Homepage, About (Über mich), Services (Leistungen), Contact (Kontakt), Blog

**Language:** German primary (English optional later)

**Goals:** Balanced — lead generation, trust/credibility, and SEO content all matter equally

---

## Visual Identity

### Color Palette

| Role | Color | Hex | Reasoning |
|------|-------|-----|-----------|
| Primary | Deep blue | #003970 | Trust, precision, professionalism |
| Accent | Vibrant orange | #D86B00 | Energy, warmth, action |
| Neutral dark | Charcoal | #2D3436 | Text, grounding |
| Neutral light | Warm white | #FAF9F7 | Backgrounds, breathing room |
| Highlight | Soft amber | #F5A14D | CTAs, interactive elements |

### Typography

| Use | Font | Why |
|-----|------|-----|
| Headings | DM Serif Display or Fraunces | Modern serif with craft character |
| Body | Inter or DM Sans | Clean, professional, excellent German support |

### Pattern System

Subtle geometric patterns inspired by:
- Traditional Allgäu woodworking joints
- Precision engineering grids
- Alpine contour lines

Used sparingly as section dividers, background textures, or hover states.

---

## Homepage

### Hero Section
- Bold headline about partnership, not just automation
- Subhead clarifying long-term approach
- Primary CTA: "Kennenlernen" → Cal.com
- Secondary CTA: WhatsApp quick contact
- Abstract geometric pattern animation or striking image
- Trust bar: "Memmingen/Allgäu · Langfristige Partnerschaft · Keine Agentur"

### Problem/Agitation Section
- Addresses pain: agencies that leave, Excel chaos, wasted employee time
- Uses customer language from marketing context
- Clean layout with icons or geometric illustrations

### Solution Section: "System Stacking"
- Visual explanation of unique approach
- 3 connected blocks: Build → Maintain → Stack
- Emphasizes long-term partnership vs. one-off projects

### Trust Points (pulled from Services)
- Ownership & documentation
- Flexible contracts (3/6/12 months)
- Lower risk than hiring internally

### Services Overview
- 3 cards linking to full Services page
- Quick preview of offerings

### Social Proof
- Testimonial(s) available
- Designed for easy addition of more

### Final CTA Section
- Reinforce value proposition
- Cal.com + WhatsApp
- Regional touch: "Aus dem Allgäu, für den Mittelstand"

---

## About Page (Über mich)

### Hero
- Personal photo
- Short, direct intro: who you are, where you're based
- Tone: competent but approachable

### Your Story
- Why you do this work
- Background (credibility, not full CV)
- Connection to Allgäu region

### Philosophy Section
- "Warum Partnerschaft statt Projekt"
- Explains retainer model and System Stacking
- Addresses "build and leave" agency problem

### How I Work
- 3-4 step visual showing process
- What happens after booking a call

### Values/Principles
- 3-4 short statements
- Examples: "Systeme gehören in Ihre Infrastruktur", "Dokumentation ist nicht optional"

### CTA
- Cal.com + WhatsApp

---

## Services Page (Leistungen)

### Hero
- Clear headline: what you help businesses achieve
- Brief intro reinforcing partnership over projects

### Service Pillars

**1. Prozessautomatisierung**
- Rechnungsverarbeitung, CRM-Updates, Datenübertragungen
- Geometric craft aesthetic icons
- Outcomes: time saved, errors eliminated

**2. KI-Integration**
- Intelligent automation, document processing, analysis
- Enhancement, not replacement of people
- "Technologie, die arbeitet. Menschen, die gestalten."

**3. Wartung & Support**
- Ongoing care, updates, troubleshooting
- Key differentiator: what agencies don't do

### How Systems Stack
- Visual showing growth over time
- Timeline: Month 1 → Month 6 → Year 2
- Growing value of partnership

### Use Cases
- Concrete examples: Rechnungen, CRM, E-Mail, Onboarding
- Brief, scannable format

### Ownership & Documentation ("Ihre Systeme. Ihre Kontrolle.")
- Systems built in client's infrastructure
- Full documentation of everything relevant
- Any developer can take over
- Never locked in, never dependent

### Contract Model ("Planbare Zusammenarbeit")
- Headline: "Einfacher als eine Festanstellung. Flexibler als eine Agentur."
- Contract periods: 3, 6, or 12 months
- No onboarding overhead, no HR complexity
- Plannable cost, plannable timeline
- Extend if it works, part ways if not — no hard feelings

### "Nicht für jeden" Section
- Addresses anti-persona directly
- Filters unqualified leads through honesty

### CTA
- Cal.com + WhatsApp

---

## Contact Page (Kontakt)

### Hero
- Headline: "Lassen Sie uns sprechen"
- No pressure, just a conversation to see if it fits

### Contact Options (hierarchy)

**1. Kennenlernen buchen (Primary)**
- Cal.com embed or prominent button
- "15-30 Minuten, unverbindlich"

**2. WhatsApp (Quick/Casual)**
- Direct link to WhatsApp
- "Kurze Frage? Schreiben Sie mir direkt."

**3. Contact Form (Fallback)**
- Simple: Name, Email, Message
- "Ich melde mich innerhalb von 24 Stunden"

### Location
- "Memmingen, Allgäu"
- Regional touch/subtle map

### Closing
- No-pressure acknowledgment

---

## Blog

### Index Page
- Clean grid or list of posts
- Title, excerpt, date, optional category
- Future categories: Automatisierung, KI, Fallstudien, Insights

### Post Layout
- Large readable typography
- Author byline with photo
- Optional table of contents
- Related posts at bottom
- Soft CTA at end

### Design Integration
- Same geometric patterns as site
- Consistent "Modern Handwerk" feel
- Styled code blocks

---

## Global Components

### Navigation
- Logo left, links right
- Links: Homepage, Über mich, Leistungen, Blog, Kontakt
- Sticky on scroll
- Mobile: hamburger with full-screen overlay
- CTA in nav: "Kennenlernen" (orange accent)

### Footer
- Contact: Email, WhatsApp, Location
- Navigation links
- Social (LinkedIn)
- Copyright
- Geometric pattern accent

### Buttons
- Primary (Cal.com): Orange fill, geometric edge
- Secondary (WhatsApp): Outlined, blue accent
- Tertiary: Text with underline

### Cards & Sections
- Subtle shadows, warm white backgrounds
- Geometric dividers
- Consistent spacing

### Responsive
- Desktop-first, fully responsive
- Mobile: stacked layouts, larger touch targets
- WhatsApp more prominent on mobile

---

## Integrations

- **Cal.com:** Booking widget/link for consultations
- **WhatsApp:** Direct chat link (primary quick contact)
- **Contact form:** Simple form with email delivery
- **Future:** Chat widget (later phase)

---

## Technical Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Existing blog infrastructure (markdown posts)

---

## Content Needed

- Personal photo for About page
- Testimonial(s) available
- Case study/example content (some material ready)
- Blog posts (existing starter content to be replaced)
