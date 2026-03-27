# Circle — Loyalty & Discovery

## Projekt

**Typ:** React + Vite Single-Page-App (Prototype)
**Stack:** React 18, TypeScript, Vite, lucide-react
**Live:** https://circle-app-liard.vercel.app
**Repo-Branch:** Newwavebot

## Features

- **Onboarding** — 4-Step-Flow mit Animations
- **Home** — Produktkatalog mit Detailansicht, Wunschliste, Warenkorbflow
- **Earn** — Punkte-System (Reviews, Shares, Challenges, Streaks)
- **Couple** — Partnerverknüpfung, Produkt-Matching ("It's a Match!")
- **Community** — Diskussionsforum mit Topics und Likes
- **Creators** — Creator-Profile mit Rabattcodes und Exclusive Content
- **Profile** — Level-System (Curious → Explorer → Connoisseur → Ambassador), Badges, Referral
- **Notifications** — Bell mit Unread-Count, Filter nach Typ
- **Referral** — Freunde einladen mit Code

## Projektstruktur

```
/
├── src/
│   ├── App.tsx         # Gesamte App (ein File, ~353 Zeilen)
│   ├── main.tsx        # React-Entry
│   └── vite-env.d.ts   # Vite-Types
├── public/
│   └── circle.svg      # App-Icon (Lila #452861)
├── index.html          # HTML-Shell
├── package.json
├── tsconfig.json
├── vite.config.ts      # Port 3000
└── vercel.json         # SPA-Routing
```

## Design-System

```
Farben:
  bg:      #FAFAF8   (Warm White)
  card:    #FFFFFF
  soft:    #F4F3F0
  text:    #1A1A2E
  sub:     #6B6B7B
  purple:  #452861   (Brand-Primär)
  coral:   #E87C6C   (Couple/Match)
  gold:    #D4A840   (Punkte/Stars)

Font: Plus Jakarta Sans (Google Fonts, 400–900)
```

## Dev-Befehle

```bash
npm run dev      # Dev-Server auf Port 3000
npm run build    # tsc + vite build → dist/
npm run preview  # Preview des Builds
```

## Deployment

Vercel. `vercel.json` mit SPA-Rewrite-Rule (alle Routen → index.html).

## Architektur-Hinweise

- **Single-File-App:** Alle Screens, Components und Daten in `src/App.tsx`
- **Inline-Styles:** Kein CSS-Framework, alles via style-Props
- **Globales CSS:** Injiziert als `<style>` Tag in App-Komponente (Fonts, Resets, Animationen)
- **State:** Lokal via useState, kein State-Management-Framework
- **Routing:** Kein React-Router, Screen-Switching via useState(`screen`)
- **Daten:** Hardcoded Mock-Daten (PRODUCTS, CREATORS, NOTIFS, etc.)
