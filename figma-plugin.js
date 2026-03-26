// Circle App — Figma Plugin Script
// So verwendest du es:
// 1. Öffne deine Figma-Datei (Circle)
// 2. Gehe zu: Plugins → Development → New Plugin
// 3. Wähle "Figma design" → "Run once"
// 4. Ersetze den gesamten code.ts Inhalt mit diesem Script
// 5. Klicke "Run"

// ============ DESIGN TOKENS ============
const C = {
  bg: { r: 0.98, g: 0.98, b: 0.973 },
  card: { r: 1, g: 1, b: 1 },
  soft: { r: 0.957, g: 0.953, b: 0.941 },
  text: { r: 0.102, g: 0.102, b: 0.18 },
  sub: { r: 0.42, g: 0.42, b: 0.482 },
  muted: { r: 0.659, g: 0.659, b: 0.722 },
  purple: { r: 0.271, g: 0.157, b: 0.38 },
  coral: { r: 0.91, g: 0.486, b: 0.424 },
  gold: { r: 0.831, g: 0.659, b: 0.251 },
  white: { r: 1, g: 1, b: 1 },
};

const SCREENS = [
  "1. Onboarding",
  "2. Home",
  "3. Earn",
  "4. Couple",
  "5. Educational Hub",
  "6. Creators",
  "7. Notifications",
  "8. Profile",
  "9. Referral",
  "10. Product Detail",
];

const SCREEN_ACCENT = [
  C.gold, C.purple, C.gold, C.coral, C.purple,
  C.purple, C.coral, C.purple, C.gold, C.purple,
];

// Screen section definitions
const SCREEN_SECTIONS: Record<string, { label: string; h: number; color?: RGB }[]> = {
  "1. Onboarding": [
    { label: "", h: 200 },
    { label: "Icon (88×88)", h: 120, color: C.purple },
    { label: "Willkommen bei Circle", h: 60 },
    { label: "Dein Loyalty-Programm für\nmehr Spaß am Liebesleben.", h: 60 },
    { label: "", h: 200 },
    { label: "● ● ● ●  Progress Dots", h: 30 },
    { label: "[ Weiter ]", h: 56, color: C.text },
    { label: "Überspringen", h: 40 },
  ],
  "2. Home": [
    { label: "Guten Tag                    🔔  ◯", h: 50 },
    { label: "Circle                            320 pts", h: 40 },
    { label: "180 bis Explorer", h: 20 },
    { label: "NÄCHSTER SCHRITT\nReview schreiben & Punkte sammeln\n+50 Punkte", h: 110, color: C.text },
    { label: "CHALLENGES", h: 24 },
    { label: "[ 3-Review ]  [ Share-3 ]  [ 7-Tage ]", h: 110 },
    { label: "WAS IST NEU", h: 24 },
    { label: "Max & Nora: Mystery Box!         1h", h: 44 },
    { label: "Workshop: Self-Care Basics      2d", h: 44 },
    { label: "7-Tage-Streak? Fast!              3d", h: 44 },
    { label: "Sara K.: 3 Ways Massage Oil     4d", h: 44 },
    { label: "", h: 30 },
    { label: "NAV: ✦  ★  ♥  📖  📷  👑", h: 56, color: C.white },
  ],
  "3. Earn": [
    { label: "Earn                           ◯ 320 pts", h: 60 },
    { label: "[ All ] [ Vibratoren ] [ Accessories ] ...", h: 40 },
    { label: "EMPFOHLEN", h: 20, color: C.purple },
    { label: "Product Image (240px)", h: 200, color: C.soft },
    { label: "Vibratoren\nBloom G-Punkt-Vibrator\n€24.95", h: 80 },
    { label: "[ Review · +50 ]        [ Share ]", h: 48 },
    { label: "Velvet Touch Blindfold     €22.95  +50", h: 50 },
    { label: "Botanical Massage Oil      €19.95  +50", h: 50 },
    { label: "Intimacy Card Game         €24.95  +50", h: 50 },
    { label: "Midnight Silk Robe         €54.95  +50", h: 50 },
    { label: "", h: 30 },
    { label: "NAV: ✦  ★  ♥  📖  📷  👑", h: 56, color: C.white },
  ],
  "4. Couple": [
    { label: "", h: 100 },
    { label: "♥ Icon (80×80)", h: 100, color: C.coral },
    { label: "Wählt getrennt,\nentdeckt gemeinsam", h: 70 },
    { label: "Gleiche Produkte gewählt? Match!", h: 30 },
    { label: "", h: 40 },
    { label: "[ ♥ Let's go ]", h: 56, color: C.text },
    { label: "", h: 30 },
    { label: "Partner Card\n◯ Alex ist verbunden  ✓", h: 70, color: C.white },
    { label: "", h: 100 },
    { label: "", h: 30 },
    { label: "NAV: ✦  ★  ♥  📖  📷  👑", h: 56, color: C.white },
  ],
  "5. Educational Hub": [
    { label: "Educational Hub                    🔍", h: 50 },
    { label: "[ 12 Artikel ] [ 3 Gelesen ] [ 5 Pfade ]", h: 60 },
    { label: "LERNPFADE", h: 24 },
    { label: "[ Beginner ◯ ]  [ Couples ◯ ]  [ Wellness ◯ ]", h: 110 },
    { label: "[ All ] [ Beginners ] [ Couples ] [ Self-Care ]", h: 40 },
    { label: "BELIEBT DIESE WOCHE", h: 24 },
    { label: "[ Hot Article 1 ]  [ Hot Article 2 ]  [ 3 ]", h: 110 },
    { label: "📖 Beginner's Guide to...\n5 min · +25 pts · ♥ 89", h: 80 },
    { label: "📖 Communication 101\n8 min · +40 pts · ♥ 67", h: 80 },
    { label: "📖 Self-Care Rituals\n4 min · +20 pts · ♥ 45", h: 80 },
    { label: "", h: 30 },
    { label: "NAV: ✦  ★  ♥  📖  📷  👑", h: 56, color: C.white },
  ],
  "6. Creators": [
    { label: "Creators\nExklusiver Content", h: 60 },
    { label: "◯ Lena  ◯ Tom&J  ◯ Sara  ◯ Max&N", h: 80 },
    { label: "[ All ] [ Tutorial ] [ Review ] [ Unboxing ]", h: 40 },
    { label: "Lena M. · 2d · Tutorial · Exclusive\nMy Evening Self-Care Ritual\nStep by step wind-down routine.\n📦 Bloom Vibrator · €21.21\nCODE · LENA15\n♥ 284  💬 42", h: 220, color: C.white },
    { label: "Tom & Julia · 3d · Vlog · Exclusive\nDate Night In\nCooking + Intimacy Card Game.\n📦 Card Game · €19.96\nCODE · COUPLE20\n♥ 512  💬 87", h: 220, color: C.white },
    { label: "", h: 6 },
    { label: "NAV: ✦  ★  ♥  📖  📷  👑", h: 56, color: C.white },
  ],
  "7. Notifications": [
    { label: "Mitteilungen                        ✕", h: 50 },
    { label: "[ Alle ] [ Neu (3) ] [ Matches ]   Alle lesen", h: 40 },
    { label: "♥  It's a Match!\nAlex hat auch die Card Game gewählt     12m", h: 60 },
    { label: "📷  Neuer Content\nMax & Nora: Mystery Box!                1h", h: 60 },
    { label: "★  +50 Punkte\nReview veröffentlicht                   3h", h: 60 },
    { label: "💬  Antwort erhalten\nLisa: Toller Tipp!                      5h", h: 60 },
    { label: "⚡  Fast geschafft!\n2 Reviews für +300 pts                  8h", h: 60 },
    { label: "📅  Event Reminder\nWorkshop in 5 Tagen                     2d", h: 60 },
    { label: "", h: 200 },
    { label: "", h: 32 },
  ],
  "8. Profile": [
    { label: "◯ Ring (76px)\n👑 Crown", h: 100 },
    { label: "Curious\n320 pts\n180 bis Explorer", h: 70 },
    { label: "[ 2 Reviews ] [ 2 Badges ] [ 0 Streak ] [ 1 Share ]", h: 60 },
    { label: "[ Badges | Rewards | Activity | Settings ]", h: 40 },
    { label: "✓ First Voice — Verdient\n✓ Amplifier — Verdient\n🔒 Power Couple — Partner verknüpfen\n🔒 Explorer — 3 Kategorien\n🔒 On Fire — 7 Tage aktiv\n🔒 Matchmaker — 1 Freund einladen", h: 300 },
    { label: "", h: 76 },
    { label: "NAV: ✦  ★  ♥  📖  📷  👑", h: 56, color: C.white },
  ],
  "9. Referral": [
    { label: "← Zurück", h: 36 },
    { label: "🎁 Icon (72×72)", h: 90, color: C.purple },
    { label: "Freunde einladen\nIhr bekommt beide 200 Punkte", h: 60 },
    { label: "DEIN CODE\nCIRCLE-A7X9\n[ Kopieren ]", h: 100, color: C.white },
    { label: "[ WhatsApp ] [ SMS ] [ E-Mail ] [ Mehr ]", h: 50 },
    { label: "[ Meilensteine | Freunde (2) ]", h: 40 },
    { label: "● 1 Freund — 200 Punkte ✓\n○ 3 Freunde — 500 Punkte (Nächstes)\n○ 5 Freunde — Mystery Box 🔒\n○ 10 Freunde — VIP Event 🔒", h: 200 },
    { label: "", h: 156 },
  ],
  "10. Product Detail": [
    { label: "←                              ♥\nProduct Image (280px)", h: 280, color: C.soft },
    { label: "VIBRATOREN\nBloom G-Punkt-Vibrator\n★★★★☆ 4.3 (47 Reviews)\n€24.95          [ Shop ]", h: 120 },
    { label: "[ Details | Reviews (3) | Ähnlich ]", h: 40 },
    { label: "Geschwungener G-Punkt-Vibrator\nmit 3 Modi. Wasserdicht,\nwiederaufladbar.", h: 70 },
    { label: "✓ Silikon & ABS    ✓ Wasserdicht IP57\n✓ 14 cm            ✓ 90 Min", h: 60 },
    { label: "[ ★ Review schreiben · +50 ]", h: 56, color: C.text },
    { label: "", h: 50 },
    { label: "Ähnliche Produkte\nVelvet Touch Blindfold      €22.95  ›\nBotanical Massage Oil       €19.95  ›\nIntimacy Card Game          €24.95  ›", h: 150 },
    { label: "", h: 6 },
  ],
};

// ============ HELPERS ============
function rgb(c: RGB): RGB { return { r: c.r, g: c.g, b: c.b }; }

async function loadFont() {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
}

function createCard(x: number, y: number, w: number, h: number, fill: RGB, radius = 0): RectangleNode {
  const rect = figma.createRectangle();
  rect.x = x; rect.y = y; rect.resize(w, h);
  rect.fills = [{ type: "SOLID", color: fill }];
  rect.cornerRadius = radius;
  return rect;
}

function createText(x: number, y: number, w: number, content: string, size: number, color: RGB, weight: "Regular" | "Bold" | "Semi Bold" = "Regular"): TextNode {
  const t = figma.createText();
  t.x = x; t.y = y;
  t.resize(w, size * 1.6 * (content.split("\n").length));
  t.characters = content;
  t.fontSize = size;
  t.fontName = { family: "Inter", style: weight };
  t.fills = [{ type: "SOLID", color }];
  return t;
}

// ============ MAIN ============
async function main() {
  await loadFont();

  const GAP = 80;
  const W = 430;
  const H = 932;
  const COLS = 5;

  // Title
  const title = createText(0, -120, 2000, "Circle App — Screen Overview", 48, C.purple, "Bold");
  const subtitle = createText(0, -60, 2000, "10 Screens · 430×932 · Mobile-First · Plus Jakarta Sans", 18, C.sub);

  const allNodes: SceneNode[] = [title, subtitle];

  for (let i = 0; i < SCREENS.length; i++) {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const x = col * (W + GAP);
    const y = row * (H + GAP + 60);

    const accent = SCREEN_ACCENT[i];
    const screenName = SCREENS[i];

    // Screen label
    const label = createText(x, y - 30, W, screenName, 14, accent, "Bold");
    allNodes.push(label);

    // Phone frame
    const frame = figma.createFrame();
    frame.name = screenName;
    frame.x = x; frame.y = y;
    frame.resize(W, H);
    frame.fills = [{ type: "SOLID", color: C.bg }];
    frame.cornerRadius = 40;
    frame.clipsContent = true;
    frame.strokes = [{ type: "SOLID", color: { r: 0.88, g: 0.87, b: 0.85 } }];
    frame.strokeWeight = 3;

    // Status bar placeholder
    const statusBar = createCard(0, 0, W, 54, C.bg);
    frame.appendChild(statusBar);
    const timeText = createText(20, 16, 60, "9:41", 14, C.text, "Semi Bold");
    frame.appendChild(timeText);

    // Screen sections
    const sections = SCREEN_SECTIONS[screenName] || [];
    let yOff = 54;

    for (const section of sections) {
      if (section.h <= 0) continue;

      const sectionBg = section.color || C.bg;
      const isCard = section.color === C.white;
      const isDark = section.color === C.text;

      const rect = createCard(isCard ? 18 : 0, yOff, isCard ? W - 36 : W, section.h, sectionBg, isCard ? 16 : isDark ? 16 : 0);
      if (isCard) {
        rect.x = 18;
        rect.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.04 }, offset: { x: 0, y: 1 }, radius: 3, spread: 0, visible: true, blendMode: "NORMAL" }];
      }
      if (isDark) {
        rect.x = 18;
        rect.resize(W - 36, section.h);
      }
      frame.appendChild(rect);

      if (section.label) {
        const textColor = isDark ? C.white : (section.color === C.purple ? C.white : C.text);
        const textX = (isCard || isDark) ? 32 : 18;
        const textW = (isCard || isDark) ? W - 68 : W - 36;
        const txt = createText(textX, yOff + 10, textW, section.label, 12, textColor, "Regular");
        frame.appendChild(txt);
      }

      yOff += section.h + (isCard ? 10 : 0);
    }

    // Home indicator
    const homeInd = createCard(W / 2 - 67, H - 20, 134, 5, C.text, 3);
    homeInd.opacity = 0.2;
    frame.appendChild(homeInd);

    allNodes.push(frame);
  }

  // Color palette section
  const paletteY = 2 * (H + GAP + 60) + 40;
  const paletteTitle = createText(0, paletteY, 800, "Design Tokens", 24, C.purple, "Bold");
  allNodes.push(paletteTitle);

  const colors = [
    { name: "Purple #452861", c: C.purple },
    { name: "Coral #E87C6C", c: C.coral },
    { name: "Gold #D4A840", c: C.gold },
    { name: "BG #FAFAF8", c: C.bg },
    { name: "Text #1A1A2E", c: C.text },
    { name: "Sub #6B6B7B", c: C.sub },
    { name: "Muted #A8A8B8", c: C.muted },
    { name: "Card #FFFFFF", c: C.card },
    { name: "Soft #F4F3F0", c: C.soft },
  ];

  colors.forEach((col, i) => {
    const cx = i * 120;
    const swatch = createCard(cx, paletteY + 40, 100, 60, col.c, 12);
    swatch.strokes = [{ type: "SOLID", color: { r: 0.85, g: 0.85, b: 0.85 } }];
    swatch.strokeWeight = 1;
    allNodes.push(swatch);
    const lbl = createText(cx, paletteY + 108, 110, col.name, 10, C.sub, "Semi Bold");
    allNodes.push(lbl);
  });

  // Typography section
  const typoY = paletteY + 160;
  const typoTitle = createText(0, typoY, 800, "Typography: Plus Jakarta Sans", 24, C.purple, "Bold");
  allNodes.push(typoTitle);

  const sizes = [
    "Title: 22px / weight 900",
    "Subtitle: 14-16px / weight 700-800",
    "Body: 12-13px / weight 400-600",
    "Caption: 9-11px / weight 600-800",
    "Padding: 18px (P constant)",
    "Max-Width: 430px / Border-Radius: 16px cards",
  ];
  sizes.forEach((s, i) => {
    const t = createText(0, typoY + 40 + i * 24, 600, s, 13, C.sub);
    allNodes.push(t);
  });

  // Select and zoom
  figma.currentPage.selection = allNodes;
  figma.viewport.scrollAndZoomIntoView(allNodes);
  figma.notify("✅ Circle App — 10 Screens + Design Tokens erstellt!");
}

main().then(() => figma.closePlugin());
