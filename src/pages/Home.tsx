import { Zap, Globe, Star, UserPlus, Camera, Calendar, Flame, Sparkles, Package } from "lucide-react";
import { C, P } from "../constants";
import { Ring, Cd, Bg } from "../components";
import { LEVELS, PRODUCTS } from "../data";

export function Home({ points, go, onNotif, unreadCount }: any) {
  const lvl = LEVELS.reduce((a, l) => points >= l.min ? l : a, LEVELS[0]);
  const next = LEVELS[LEVELS.indexOf(lvl) + 1];
  const pct = next ? (points - lvl.min) / (next.min - lvl.min) : 1;
  const hr = new Date().getHours();
  const greet = hr < 12 ? "Guten Morgen" : hr < 18 ? "Guten Tag" : "Guten Abend";
  const chlg = [
    { title: "Try a new category", reward: 150, p: 0, t: 1, icon: Globe, color: "#2D7D6B" },
    { title: "Write 3 reviews", reward: 300, p: 1, t: 3, icon: Star, color: C.purple },
    { title: "Refer a friend", reward: 400, p: 0, t: 2, icon: UserPlus, color: "#C4702B" },
  ];
  const feed = [
    { title: "Lena M. hat gepostet", sub: "Self-Care Ritual", time: "2h", icon: Camera, go: "creators" },
    { title: "Wellness Workshop", sub: "Apr 12 · Virtual", time: "5d", icon: Calendar, go: "events" },
    { title: "Neuer Artikel", sub: "Einsteiger-Guide · +20 pts", time: "1d", icon: Flame, go: "educational" },
    { title: "Max & Nora", sub: "Mystery Box Challenge!", time: "1d", icon: Camera, go: "creators" },
  ];
  const recs = [
    { product: PRODUCTS[2], reason: "Passt zu deinem letzten Kauf" },
    { product: PRODUCTS[4], reason: "Beliebt in deiner Kategorie" },
    { product: PRODUCTS[5], reason: "Basierend auf deinem Profil" },
  ];
  return (
    <div style={{ paddingBottom: 80, position: "relative" }}><Bg v="home" />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ padding: `36px ${P}px 0`, display: "flex", alignItems: "center", justifyContent: "space-between" }}><div><p style={{ fontSize: 12, color: C.muted, fontWeight: 600, margin: 0 }}>{greet}</p><h1 style={{ fontSize: 22, fontWeight: 900, color: C.text, margin: "2px 0 0" }}>Circle</h1></div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><button onClick={onNotif} style={{ width: 36, height: 36, borderRadius: 12, background: C.soft, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>{unreadCount > 0 && <div style={{ position: "absolute", top: -2, right: -2, minWidth: 16, height: 16, borderRadius: 8, background: C.purple, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #fff" }}><span style={{ fontSize: 8, fontWeight: 900, color: "#fff" }}>{unreadCount}</span></div>}</button>
            <div onClick={() => go("profile")} style={{ cursor: "pointer" }}><Ring size={56} sw={4} pct={pct}><span style={{ fontSize: 13, fontWeight: 900, color: C.text }}>{points}</span></Ring></div></div></div>
        {next && <p style={{ fontSize: 12, color: C.muted, fontWeight: 600, padding: `3px ${P}px 0`, margin: 0 }}>{next.min - points} bis <span style={{ fontWeight: 700, color: C.text }}>{next.name}</span></p>}
        <div style={{ padding: `20px ${P}px 0` }}><div onClick={() => go("earn")} style={{ padding: "18px 20px", borderRadius: 16, background: C.text, cursor: "pointer", position: "relative", overflow: "hidden" }}><div style={{ position: "absolute", top: -35, right: -25, width: 120, height: 120, borderRadius: 60, background: C.purple, opacity: .25 }} /><div style={{ position: "relative", zIndex: 1 }}><div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}><Zap size={13} color="#d8ffab" strokeWidth={2.5} /><span style={{ fontSize: 9, fontWeight: 800, color: "#d8ffab", textTransform: "uppercase", letterSpacing: ".06em" }}>Nächster Schritt</span></div><h2 style={{ fontSize: 15, fontWeight: 800, color: "#fff", margin: "0 0 3px" }}>Review schreiben & Punkte sammeln</h2><p style={{ fontSize: 11, color: "rgba(255,255,255,.4)", margin: 0 }}>+50 Punkte</p></div></div></div>
        <div style={{ padding: "24px 0 0" }}><div style={{ display: "flex", alignItems: "center", gap: 8, padding: `0 ${P}px`, margin: "0 0 10px" }}><h2 style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".03em", color: C.muted, margin: 0 }}>Für dich empfohlen</h2><div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 8, background: `${C.purple}0a` }}><Sparkles size={10} color={C.purple} strokeWidth={2} /><span style={{ fontSize: 9, fontWeight: 700, color: C.purple }}>KI-Empfehlung</span></div></div>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: `0 ${P}px 4px` }}>{recs.map((r, i) => (<Cd key={i} style={{ minWidth: 200, padding: 14, flexShrink: 0 }}><div style={{ width: 44, height: 44, borderRadius: 12, background: C.soft, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}><Package size={18} color={C.sub} strokeWidth={1.8} /></div><h3 style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: "0 0 2px" }}>{r.product.name}</h3><span style={{ fontSize: 12, fontWeight: 800, color: C.purple, display: "block", margin: "0 0 6px" }}>€{r.product.price}</span><p style={{ fontSize: 10, color: C.muted, margin: "0 0 10px", lineHeight: 1.3 }}>{r.reason}</p><button style={{ fontSize: 11, fontWeight: 700, color: C.purple, background: `${C.purple}0a`, border: "none", borderRadius: 8, padding: "6px 14px", cursor: "pointer" }}>Ansehen</button></Cd>))}</div></div>
        <div style={{ padding: "24px 0 0" }}><h2 style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".03em", color: C.muted, padding: `0 ${P}px`, margin: "0 0 10px" }}>Challenges</h2>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: `0 ${P}px 4px` }}>{chlg.map((c, i) => { const cp = c.t > 0 ? c.p / c.t : 0; return (<Cd key={i} style={{ minWidth: 180, padding: 14, flexShrink: 0 }}><div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}><div style={{ width: 36, height: 36, borderRadius: 11, background: `${c.color}0a`, display: "flex", alignItems: "center", justifyContent: "center" }}><c.icon size={16} color={c.color} strokeWidth={1.8} /></div><Ring size={38} sw={3} pct={cp} color={c.color}><span style={{ fontSize: 10, fontWeight: 800, color: C.text }}>{c.p}/{c.t}</span></Ring></div><h3 style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: "0 0 2px" }}>{c.title}</h3><span style={{ fontSize: 11, fontWeight: 700, color: c.color }}>+{c.reward} pts</span></Cd>); })}</div></div>
        <div style={{ padding: `24px ${P}px 16px` }}><h2 style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".03em", color: C.muted, margin: "0 0 10px" }}>Was ist neu</h2>
          {feed.map((f, i) => { const FI = f.icon; return (<div key={i} onClick={() => go(f.go)} style={{ display: "flex", gap: 10, padding: "12px 0", borderBottom: i < feed.length - 1 ? `1px solid ${C.border}` : "none", cursor: "pointer" }}><div style={{ width: 34, height: 34, borderRadius: 10, background: C.soft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><FI size={14} color={C.sub} strokeWidth={1.8} /></div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{f.title}</div><div style={{ fontSize: 11, color: C.muted, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.sub}</div></div><span style={{ fontSize: 10, color: C.light, flexShrink: 0 }}>{f.time}</span></div>); })}</div>
      </div>
    </div>
  );
}
