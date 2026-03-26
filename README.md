# Circle — Gamified Loyalty & Discovery App

> A gamified loyalty and discovery app for an intimate lifestyle shop. Built with React + TypeScript + Vite.

🔗 **Live Preview:** [circle-app.vercel.app](https://circle-app.vercel.app) *(nach Deployment aktualisieren)*

---

## Was ist Circle?

Circle ist eine kuratierte Loyalty-App, die Kunden durch Gamification, Educational Content und soziale Features langfristig bindet. Statt einer offenen Community (Moderationsrisiko) setzen wir auf ein geschlossenes Ökosystem:

- **Educational Hub** — Professionell kuratierte Tutorials, Guides, Expert Content
- **Reward Engine** — Punkte, Badges, Levels, Streaks (Game-inspiriert)
- **Shared Lists** — Wunschlisten für Singles, Paare, Gruppen + Match-Mechanik
- **Creator Platform** — Influencer-Content, Rabattcodes, exklusive Reviews
- **Events & Workshops** — Virtuelle und lokale Events mit Buchung
- **Shop-Integration** — Direkter Link zum Shop-Account

## Tech Stack

| Layer | Technologie |
|-------|------------|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Icons | Lucide React |
| Styling | Inline Styles (Prototyp) |
| Hosting | Vercel |

## Quick Start

```bash
# Repo klonen
git clone https://github.com/YOUR_ORG/circle-app.git
cd circle-app

# Dependencies installieren
npm install

# Dev Server starten
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) — die App wird im Mobile-Viewport (430px) angezeigt.

## Projektstruktur

```
circle-app/
├── public/
│   └── circle.svg          # Favicon
├── src/
│   ├── App.tsx              # Gesamte App (Prototyp, Single File)
│   └── main.tsx             # Entry Point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

> **Hinweis:** Der Prototyp ist aktuell eine Single-File-App (`App.tsx`). Bei der Weiterentwicklung wird die Struktur in Components, Pages, Hooks und Utils aufgeteilt.

## Screens

| Screen | Beschreibung | Status |
|--------|-------------|--------|
| Onboarding | 4-Step Wizard | ✅ Done |
| Home | Dashboard, Challenges, Feed | ✅ Done |
| Earn | Produkte, Reviews, Shares, Punkte | ✅ Done |
| Couple | Produktauswahl, Match-Mechanik | ✅ Done |
| Community | *(wird zu Educational Hub umgebaut)* | 🔄 In Progress |
| Creators | Profile, Content, Codes, Follow | ✅ Done |
| Profile | Badges, Rewards, Activity, Settings | ✅ Done |
| Referral | Einladungscode, Meilensteine | ✅ Done |
| Notifications | Filterbar, Typen, Read/Unread | ✅ Done |
| Product Detail | Specs, Reviews, Ähnliche Produkte | ✅ Done |

## Vercel Deployment

```bash
# Vercel CLI installieren (einmalig)
npm i -g vercel

# Deployen
vercel

# Oder für Production
vercel --prod
```

Alternativ: Repo auf GitHub pushen → [vercel.com/new](https://vercel.com/new) → GitHub Repo verbinden → Auto-Deploy.

## Figma + Claude Code Integration

Der Prototyp kann über Claude Code direkt mit Figma synchronisiert werden:

```bash
# Figma MCP Server zu Claude Code hinzufügen
claude mcp add --scope user --transport http figma https://mcp.figma.com/mcp

# Verbindung prüfen
# In Claude Code: /mcp → figma → Authenticate
```

Damit kannst du:
- React-Screens als Figma Frames importieren
- Designs in Figma iterieren und zurück in Code konvertieren
- Design Tokens und Components synchron halten

## Hackathon Tracks

Beim anstehenden Hackathon gibt es 5 Tracks:

| Track | Scope | Key Challenge |
|-------|-------|--------------|
| **A — Educational Hub** | Content-Browser, Lernpfade, Streaks | Community → Education Umbau |
| **B — Reward Engine** | Punkte, Level-Ups, Badge-Logik | Gamification-Loop optimieren |
| **C — Couple Match** | Listen, Match-Reveal, Einladung | Neue Gruppen-Modi (JGA, Freunde) |
| **D — Shop Bridge** | API-Integration, Checkout, History | Shop-System evaluieren |
| **E — AI Layer** | Empfehlungen, Smart Notifications | KI-Chat-Assistent |

## Roadmap

- [x] Prototyp (React Single-File)
- [ ] Community → Educational Hub Umbau
- [ ] GitHub Repo + Vercel Deployment
- [ ] Figma Design System aufsetzen
- [ ] Tech-Stack für Production festlegen
- [ ] Hackathon durchführen (Q2 2026)
- [ ] MVP Development (Q3 2026)
- [ ] Closed Beta (Q3 2026)
- [ ] Launch (Q4 2026)

## Mitwirken

Interesse mitzumachen? Wir suchen:

- **Frontend Devs** — React / React Native, TypeScript
- **Backend Devs** — Node.js / Python, API Design
- **UX/UI Designer** — Figma, Mobile Design, Gamification
- **Product / Strategy** — Product Thinking, Business Modelling
- **Data / ML** — Empfehlungssysteme, NLP

Melde dich oder fork das Repo und leg los!

## Lizenz

Proprietary — Alle Rechte vorbehalten. Nur für eingeladene Contributors.
