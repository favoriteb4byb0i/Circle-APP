# Circle App — Projekt-Kontext für Claude Code

## Was ist Circle?

Gamifizierte Loyalty & Discovery App für einen Intimate-Lifestyle-Shop. Kuratiertes Ökosystem aus Educational Content, Creator-Partnerschaften und Gamification. **Keine offene Community, kein User-Generated Content** (außer Reviews).

## Tech Stack

- React 18 + TypeScript
- Vite 6 (Build, Dev-Server auf Port 3000)
- Lucide React (Icons)
- Inline Styles (Prototyp)
- Google Fonts: Plus Jakarta Sans

## Quick Start

```bash
npm install
npm run dev    # → http://localhost:3000
npm run build  # → dist/
```

## Projektstruktur

```
src/
├── components/    Pill, Btn, Ring, Cd, Anim, Nav, Bg (shared UI)
├── pages/         Home, Earn, Couple, Educational, Creators, Profile, Referral
├── screens/       Onboarding, NotifPanel, ProductDetail
├── data/          products, levels, badges, creators, notifications, educational, reviews
├── constants/     theme.ts (Farben C, Spacing P, globalCss)
├── utils/         helpers.ts (notifIcon, notifColor, topicColor, contentTypeColor, initials)
├── hooks/         (noch leer — geplant: usePoints, useAnimation)
├── App.tsx        Hauptkomponente mit Screen-Routing
└── main.tsx       Entry Point
```

## Design-Konstanten (src/constants/theme.ts)

- `C.bg`: #FAFAF8, `C.purple`: #452861, `C.coral`: #E87C6C, `C.gold`: #D4A840
- `C.text`: #1A1A2E, `C.sub`: #6B6B7B, `C.muted`: #A8A8B8
- `P`: 18 (Standard-Padding)
- Max-Width: 430px (Mobile Viewport)
- Font: Plus Jakarta Sans

## Screens — Status

| Screen | Datei | Status |
|--------|-------|--------|
| Onboarding | screens/Onboarding.tsx | ✅ Done |
| Home | pages/Home.tsx | ✅ Done |
| Earn | pages/Earn.tsx | ✅ Done |
| Couple | pages/Couple.tsx | ✅ Done |
| Educational Hub | pages/Educational.tsx | ✅ Done (ersetzt Community) |
| Creators | pages/Creators.tsx | ✅ Done |
| Profile | pages/Profile.tsx | ✅ Done |
| Referral | pages/Referral.tsx | ✅ Done |
| Notifications | screens/NotifPanel.tsx | ✅ Done |
| ProductDetail | screens/ProductDetail.tsx | ✅ Done |

## Was wurde gemacht (Phase 1 — erledigt)

1. ✅ Monolithische Single-File-App (352 Zeilen in index.html) in modulare Struktur aufgeteilt
2. ✅ Community-Screen → Educational Hub umgebaut:
   - Content-Browser mit Kategorien (Beginners, Couples, Self-Care, Wellness, Product Deep-Dives)
   - Lernpfade mit Fortschrittsringen
   - "Beliebt diese Woche" kuratierte Sektion
   - Content-Detail-Screen mit Punkte-Vergabe nach Lesen
   - Suche für Content-Discovery
   - Nav-Icon: BookOpen statt MessageCircle
3. ✅ Projekt-Setup korrigiert (package.json, tsconfig.json, .gitignore, vercel.json)

## Offene Todos

### Phase 2 (Nächste Iteration)
- [ ] Shop-Integration simulieren (Bestellhistorie, Reorder-Button, Checkout-Flow)
- [ ] KI-Empfehlungs-Mockup (personalisierte Produkt-Suggestions auf Home)
- [ ] Gruppen-Listen-Modus neben Couple (JGA, Freundesgruppen mit Einladungslinks)
- [ ] Event-Buchung & Kalender-Screen (Workshop-Liste, Buchung, Reminder)
- [ ] Content-Streak-Anzeige im Profil (Tage am Stück Content gelesen)

### Phase 3 (Hackathon-Vorbereitung)
- [ ] Tech-Stack für Production festlegen
- [ ] Figma Design System aufsetzen
- [ ] Vercel Deployment einrichten

### Phase 4 (MVP)
- [ ] Backend-API, Auth, Shop-API-Integration
- [ ] Push-Notifications, KI-Empfehlungen, Chat-Assistent

## Figma Integration

Figma MCP Server ist konfiguriert. Zum Verwenden:
- Figma-Datei-URL in die Session einfügen
- Claude kann dann Frames lesen, Designs inspizieren und Code ableiten

## Architektur-Prinzipien

- **Kein User-Generated Content** außer Reviews
- **Gamification** stark an Mobile Gaming angelehnt (Streaks, Badges, Levels)
- **Kuratierter Content** — redaktionell oder von geprüften Creatorn
- **Diskret** — neutraler App-Name, keine expliziten Bilder
- **Mobile-First** — 430px Viewport, Touch-optimiert

## Git

- Branch: `claude/refactor-educational-hub-uxqdX`
- PR: https://github.com/favoriteb4byb0i/Circle-APP/pull/1
