// Circle App — Alle 10 Screens für Figma
// Kopiere diesen Code komplett in Scripter und drücke Run

const C = {
  bg: {r:0.98,g:0.98,b:0.973},
  card: {r:1,g:1,b:1},
  soft: {r:0.957,g:0.953,b:0.941},
  text: {r:0.102,g:0.102,b:0.18},
  sub: {r:0.42,g:0.42,b:0.482},
  muted: {r:0.659,g:0.659,b:0.722},
  purple: {r:0.271,g:0.157,b:0.38},
  coral: {r:0.91,g:0.486,b:0.424},
  gold: {r:0.831,g:0.659,b:0.251},
  white: {r:1,g:1,b:1},
}

await figma.loadFontAsync({family:"Inter",style:"Regular"})
await figma.loadFontAsync({family:"Inter",style:"Bold"})
await figma.loadFontAsync({family:"Inter",style:"Semi Bold"})

function txt(parent, x, y, w, text, size, color, style="Regular") {
  const t = figma.createText()
  t.x = x; t.y = y; t.resize(w, size * 1.5 * Math.max(text.split("\n").length, 1))
  t.characters = text
  t.fontSize = size
  t.fontName = {family:"Inter",style}
  t.fills = [{type:"SOLID",color}]
  parent.appendChild(t)
  return t
}

function box(parent, x, y, w, h, color, radius=0) {
  const r = figma.createRectangle()
  r.x = x; r.y = y; r.resize(w, h)
  r.fills = [{type:"SOLID",color}]
  r.cornerRadius = radius
  parent.appendChild(r)
  return r
}

function section(parent, yOff, label, h, opts={}) {
  const isCard = opts.card || false
  const isDark = opts.dark || false
  const accent = opts.accent || null
  const px = (isCard||isDark) ? 18 : 0
  const w = (isCard||isDark) ? 394 : 430
  const fill = isDark ? C.text : isCard ? C.card : accent || C.bg
  const r = box(parent, px, yOff, w, h, fill, (isCard||isDark) ? 16 : 0)
  if (isCard) r.effects = [{type:"DROP_SHADOW",color:{r:0,g:0,b:0,a:0.06},offset:{x:0,y:2},radius:8,spread:0,visible:true,blendMode:"NORMAL"}]
  if (label) {
    const tc = isDark ? C.white : C.text
    txt(parent, px+14, yOff+10, w-28, label, 12, tc)
  }
  return yOff + h + (isCard ? 8 : 0)
}

function screen(name, x, y, accent, sections) {
  const label = figma.createText()
  label.x = x; label.y = y - 32
  label.characters = name
  label.fontSize = 14
  label.fontName = {family:"Inter",style:"Bold"}
  label.fills = [{type:"SOLID",color:accent}]

  const f = figma.createFrame()
  f.name = name
  f.x = x; f.y = y; f.resize(430, 932)
  f.fills = [{type:"SOLID",color:C.bg}]
  f.cornerRadius = 40
  f.clipsContent = true
  f.strokes = [{type:"SOLID",color:{r:0.88,g:0.87,b:0.85}}]
  f.strokeWeight = 2

  box(f, 0, 0, 430, 50, C.bg)
  txt(f, 24, 16, 50, "9:41", 13, C.text, "Semi Bold")

  let yOff = 54
  for (const s of sections) {
    yOff = section(f, yOff, s.label, s.h, s)
  }

  const ind = box(f, 148, 910, 134, 5, C.text, 3)
  ind.opacity = 0.15

  return [label, f]
}

const screens = [
  {
    name: "1. Onboarding", accent: C.gold, sections: [
      {h:160,label:""},
      {h:88,label:"        ✦\n   Sparkles Icon",accent:C.purple,card:true},
      {h:10,label:""},
      {h:40,label:"Willkommen bei Circle",card:false},
      {h:50,label:"Dein Loyalty-Programm für mehr\nSpaß am Liebesleben."},
      {h:240,label:""},
      {h:20,label:"      ●  ●  ●  ●   Progress Dots"},
      {h:52,label:"\n              Weiter",dark:true},
      {h:36,label:"           Überspringen"},
    ]
  },
  {
    name: "2. Home", accent: C.purple, sections: [
      {h:28,label:"Guten Tag"},
      {h:32,label:"Circle                                     320 pts"},
      {h:18,label:"180 bis Explorer"},
      {h:12,label:""},
      {h:100,label:"⚡ NÄCHSTER SCHRITT\n\nReview schreiben & Punkte sammeln\n\n+50 Punkte",dark:true},
      {h:10,label:""},
      {h:20,label:"CHALLENGES"},
      {h:100,label:"  3-Review-Woche     Share 3 Items     7-Tage-Streak\n  ◯ 1/3  +150 pts    ◯ 1/3  +100 pts   ◯ 3/7  +200 pts",card:true},
      {h:10,label:""},
      {h:20,label:"WAS IST NEU"},
      {h:44,label:"📷  Max & Nora: Mystery Box!                    1h"},
      {h:44,label:"📅  Workshop: Self-Care Basics                  2d"},
      {h:44,label:"🔥  7-Tage-Streak? Fast geschafft!              3d"},
      {h:44,label:"📷  Sara K.: 3 Ways to Use Massage Oil         4d"},
      {h:40,label:""},
      {h:52,label:"    ✦        ★        ♥        📖       📷       👑\n   Home    Earn   Couple   Edu    Creators  Profile",card:true},
    ]
  },
  {
    name: "3. Earn", accent: C.gold, sections: [
      {h:36,label:"Earn                                      ◯ 320 pts"},
      {h:34,label:"  All    Vibratoren   Accessories   Wellness   Games"},
      {h:10,label:""},
      {h:30,label:"  EMPFOHLEN",accent:{r:0.271,g:0.157,b:0.38}},
      {h:160,label:"\n\n\n\n           📦  Product Image\n                (240px)",card:true},
      {h:70,label:"Vibratoren\nBloom G-Punkt-Vibrator\n€24.95",card:true},
      {h:44,label:"\n        Review · +50                    Share",dark:true},
      {h:10,label:""},
      {h:46,label:"📦  Velvet Touch Blindfold          €22.95     +50"},
      {h:46,label:"📦  Botanical Massage Oil            €19.95     +50"},
      {h:46,label:"📦  Intimacy Card Game               €24.95     +50"},
      {h:46,label:"📦  Midnight Silk Robe                €54.95     +50"},
      {h:46,label:"📦  Aromatic Bath Ritual Set         €34.95     +50"},
      {h:46,label:"📦  Couples Wellness Box            €79.95     +50"},
      {h:30,label:""},
      {h:52,label:"    ✦        ★        ♥        📖       📷       👑",card:true},
    ]
  },
  {
    name: "4. Couple", accent: C.coral, sections: [
      {h:120,label:""},
      {h:80,label:"\n\n              ♥\n         Heart Icon",accent:{r:0.91,g:0.486,b:0.424}},
      {h:16,label:""},
      {h:50,label:"     Wählt getrennt,\n     entdeckt gemeinsam"},
      {h:24,label:"     Gleiche Produkte gewählt? Match!"},
      {h:30,label:""},
      {h:52,label:"\n            ♥  Let's go",dark:true},
      {h:20,label:""},
      {h:70,label:"Partner\n\n  ◯  Alex ist verbunden                      ✓",card:true},
      {h:260,label:""},
      {h:52,label:"    ✦        ★        ♥        📖       📷       👑",card:true},
    ]
  },
  {
    name: "5. Educational Hub", accent: C.purple, sections: [
      {h:36,label:"Educational Hub                              🔍"},
      {h:54,label:"    12 Artikel          3 Gelesen         5 Pfade",card:true},
      {h:8,label:""},
      {h:20,label:"LERNPFADE"},
      {h:90,label:"  🏆 Beginner Guide    🏆 Couples 101     🏆 Wellness\n     ◯ 2/5  +100 pts      ◯ 1/4  +80 pts     ◯ 0/3  +60 pts",card:true},
      {h:8,label:""},
      {h:30,label:"  All   Beginners   Couples   Self-Care   Wellness"},
      {h:8,label:""},
      {h:20,label:"BELIEBT DIESE WOCHE"},
      {h:80,label:"  🔥 Communication       🔥 Self-Care           🔥 Beginner\n  Tips for Couples        Rituals That Work     Guide to...\n  ♥ 67 · 8 min · 40 pts  ♥ 45 · 4 min · 20 pts  ♥ 89 · 5 min",card:true},
      {h:8,label:""},
      {h:72,label:"📖  Beginner's Guide to Intimacy\n     Beginners · Guide · 5 min\n     ♥ 89  ★ +25 pts",card:true},
      {h:72,label:"📖  Communication 101 for Couples\n     Couples · Tutorial · 8 min\n     ♥ 67  ★ +40 pts",card:true},
      {h:72,label:"📖  Self-Care Rituals That Work\n     Self-Care · Guide · 4 min\n     ♥ 45  ★ +20 pts",card:true},
      {h:72,label:"📖  Wellness & Mindfulness Basics\n     Wellness · Article · 6 min\n     ♥ 34  ★ +30 pts",card:true},
      {h:14,label:""},
      {h:52,label:"    ✦        ★        ♥        📖       📷       👑",card:true},
    ]
  },
  {
    name: "6. Creators", accent: C.purple, sections: [
      {h:36,label:"Creators"},
      {h:16,label:"Exklusiver Content"},
      {h:70,label:"  ◯ Lena M.    ◯ Tom & Julia    ◯ Sara K.    ◯ Max & Nora",card:true},
      {h:30,label:"  All    Tutorial    Review    Unboxing    Vlog    Q&A"},
      {h:8,label:""},
      {h:200,label:"Lena M. · 2d · Tutorial · ⭐ Exclusive\n\nMy Evening Self-Care Ritual\nStep by step wind-down routine.\n\n📦 Bloom Vibrator · €21.21\n\nCODE: LENA15 · 15% Rabatt\n\n♥ 284   💬 42",card:true},
      {h:8,label:""},
      {h:200,label:"Tom & Julia · 3d · Vlog · ⭐ Exclusive\n\nDate Night In\nCooking + Intimacy Card Game.\n\n📦 Card Game · €19.96\n\nCODE: COUPLE20 · 20% Rabatt\n\n♥ 512   💬 87",card:true},
      {h:30,label:""},
      {h:52,label:"    ✦        ★        ♥        📖       📷       👑",card:true},
    ]
  },
  {
    name: "7. Notifications", accent: C.coral, sections: [
      {h:36,label:"Mitteilungen                                     ✕"},
      {h:34,label:"  Alle     Neu (3)     Matches          Alle lesen"},
      {h:12,label:""},
      {h:62,label:"♥  It's a Match!\n   Alex hat auch die Card Game gewählt           12m",card:true},
      {h:62,label:"📷  Neuer Content\n   Max & Nora: Mystery Box!                       1h",card:true},
      {h:62,label:"★  +50 Punkte\n   Review veröffentlicht                            3h",card:true},
      {h:62,label:"💬  Antwort erhalten\n   Lisa: Toller Tipp!                                5h",card:true},
      {h:62,label:"⚡  Fast geschafft!\n   2 Reviews für +300 pts                          8h",card:true},
      {h:62,label:"📅  Event Reminder\n   Workshop in 5 Tagen                             2d",card:true},
      {h:280,label:""},
    ]
  },
  {
    name: "8. Profile", accent: C.purple, sections: [
      {h:24,label:""},
      {h:80,label:"       ◯  Ring (76px)\n            👑\n          Crown",accent:C.purple},
      {h:60,label:"         Curious\n       320 pts\n     180 bis Explorer"},
      {h:54,label:"  2 Reviews    2 Badges    0 Streak    1 Share",card:true},
      {h:10,label:""},
      {h:34,label:"  Badges  |  Rewards  |  Activity  |  Settings"},
      {h:10,label:""},
      {h:52,label:"✅  First Voice\n    Erste Review geschrieben — Verdient",card:true},
      {h:52,label:"✅  Amplifier\n    Erstes Produkt geteilt — Verdient",card:true},
      {h:52,label:"🔒  Power Couple\n    Partner verknüpfen",card:true},
      {h:52,label:"🔒  Explorer\n    3 Kategorien kaufen",card:true},
      {h:52,label:"🔒  On Fire\n    7 Tage am Stück aktiv",card:true},
      {h:52,label:"🔒  Matchmaker\n    1 Freund erfolgreich einladen",card:true},
      {h:60,label:""},
      {h:52,label:"    ✦        ★        ♥        📖       📷       👑",card:true},
    ]
  },
  {
    name: "9. Referral", accent: C.gold, sections: [
      {h:30,label:"←  Zurück"},
      {h:16,label:""},
      {h:72,label:"\n\n            🎁\n         Gift Icon",accent:C.purple},
      {h:10,label:""},
      {h:36,label:"       Freunde einladen"},
      {h:24,label:"    Ihr bekommt beide 200 Punkte"},
      {h:16,label:""},
      {h:90,label:"DEIN CODE\n\n          CIRCLE-A7X9\n\n              [ Kopieren ]",card:true},
      {h:44,label:"  WhatsApp     SMS      E-Mail      Mehr",card:true},
      {h:10,label:""},
      {h:34,label:"  Meilensteine           |           Freunde (2)"},
      {h:10,label:""},
      {h:48,label:"●  1 Freund — 200 Punkte                          ✓",card:true},
      {h:48,label:"○  3 Freunde — 500 Punkte                  Nächstes",card:true},
      {h:48,label:"○  5 Freunde — Mystery Box                      🔒",card:true},
      {h:48,label:"○  10 Freunde — VIP Event                        🔒",card:true},
      {h:160,label:""},
    ]
  },
  {
    name: "10. Product Detail", accent: C.purple, sections: [
      {h:240,label:"\n  ←                                                ♥\n\n\n\n\n           📦  Product Image\n                (280px)",accent:C.soft},
      {h:10,label:""},
      {h:22,label:"VIBRATOREN"},
      {h:28,label:"Bloom G-Punkt-Vibrator"},
      {h:22,label:"★★★★☆  4.3  (47 Reviews)"},
      {h:32,label:"€24.95                              [ Shop ]"},
      {h:10,label:""},
      {h:34,label:"  Details   |   Reviews (3)   |   Ähnlich"},
      {h:10,label:""},
      {h:56,label:"Geschwungener G-Punkt-Vibrator mit\n3 Modi. Wasserdicht, wiederaufladbar."},
      {h:10,label:""},
      {h:50,label:"✓ Silikon & ABS        ✓ Wasserdicht IP57\n✓ 14 cm                  ✓ 90 Min",card:true},
      {h:12,label:""},
      {h:48,label:"\n       ★  Review schreiben · +50",dark:true},
      {h:16,label:""},
      {h:24,label:"Ähnliche Produkte"},
      {h:40,label:"📦  Velvet Touch Blindfold               €22.95  ›"},
      {h:40,label:"📦  Botanical Massage Oil                 €19.95  ›"},
      {h:40,label:"📦  Intimacy Card Game                    €24.95  ›"},
      {h:52,label:""},
    ]
  },
]

const allNodes = []
const W = 430
const H = 932
const GAP = 80
const COLS = 5

const title = figma.createText()
title.characters = "Circle App — Screen Overview"
title.fontSize = 42
title.fontName = {family:"Inter",style:"Bold"}
title.fills = [{type:"SOLID",color:C.purple}]
title.x = 0; title.y = -100
allNodes.push(title)

const sub = figma.createText()
sub.characters = "10 Screens · 430×932 · Mobile-First · Plus Jakarta Sans"
sub.fontSize = 16
sub.fontName = {family:"Inter",style:"Regular"}
sub.fills = [{type:"SOLID",color:C.muted}]
sub.x = 0; sub.y = -50
allNodes.push(sub)

const colors = [
  {n:"Purple\n#452861",c:C.purple},{n:"Coral\n#E87C6C",c:C.coral},{n:"Gold\n#D4A840",c:C.gold},
  {n:"BG\n#FAFAF8",c:C.bg},{n:"Text\n#1A1A2E",c:C.text},{n:"Sub\n#6B6B7B",c:C.sub},
  {n:"Muted\n#A8A8B8",c:C.muted},{n:"Card\n#FFFFFF",c:C.card},{n:"Soft\n#F4F3F0",c:C.soft},
]
colors.forEach((col,i) => {
  const sw = figma.createRectangle()
  sw.x = i * 110; sw.y = -46 + H + GAP + H + GAP + 100
  sw.resize(90, 50); sw.fills = [{type:"SOLID",color:col.c}]
  sw.cornerRadius = 10
  sw.strokes = [{type:"SOLID",color:{r:0.85,g:0.85,b:0.85}}]; sw.strokeWeight = 1
  allNodes.push(sw)
  const lb = figma.createText()
  lb.x = i * 110; lb.y = sw.y + 58; lb.characters = col.n
  lb.fontSize = 10; lb.fontName = {family:"Inter",style:"Semi Bold"}
  lb.fills = [{type:"SOLID",color:C.sub}]
  allNodes.push(lb)
})

for (let i = 0; i < screens.length; i++) {
  const s = screens[i]
  const col = i % COLS
  const row = Math.floor(i / COLS)
  const x = col * (W + GAP)
  const y = row * (H + GAP + 40)
  const [label, frame] = screen(s.name, x, y, s.accent, s.sections)
  allNodes.push(label, frame)
}

figma.currentPage.selection = allNodes
figma.viewport.scrollAndZoomIntoView(allNodes)
figma.notify("✅ Circle App — 10 Screens erstellt!")
figma.closePlugin()
