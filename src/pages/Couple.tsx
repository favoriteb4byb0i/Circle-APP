import { useState } from "react";
import { Heart, Check, Plus, X, Package } from "lucide-react";
import { C, P } from "../constants";
import { Pill, Btn, Cd, Bg } from "../components";
import { PRODUCTS } from "../data";

export function Couple() {
  const [started, setStarted] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const [matchAnim, setMatchAnim] = useState<any>(null);
  const [filter, setFilter] = useState("All");
  const partner = [2, 4, 6, 7];
  const cats = ["All", ...new Set(PRODUCTS.map(p => p.cat))];
  const filtered = filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
  const isMatch = (id: number) => partner.includes(id);
  const matches = list.filter(w => isMatch(w.id));
  const add = (p: any) => { if (list.find(w => w.id === p.id)) return; setList(prev => [...prev, p]); if (isMatch(p.id)) { setMatchAnim(p); setTimeout(() => setMatchAnim(null), 1800) } };

  if (matchAnim) return (<div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(250,250,248,.95)", backdropFilter: "blur(16px)", zIndex: 400, animation: "fi .15s" }}><div style={{ animation: "pop .35s cubic-bezier(.34,1.56,.64,1)", textAlign: "center" }}><div style={{ width: 72, height: 72, borderRadius: 36, background: `${C.coral}10`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><Heart size={32} color={C.coral} fill={C.coral} /></div><h2 style={{ fontSize: 20, fontWeight: 900, color: C.text, margin: "0 0 4px" }}>It's a Match!</h2><p style={{ fontSize: 13, color: C.muted }}>Ihr wollt beide <span style={{ fontWeight: 700, color: C.purple }}>{matchAnim.name}</span></p></div></div>);
  if (!started) return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", paddingBottom: 80 }}><Bg v="couple" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 36px", position: "relative", zIndex: 1 }}>
        <div style={{ width: 80, height: 80, borderRadius: 40, background: `${C.coral}08`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}><Heart size={34} color={C.coral} strokeWidth={1.4} /></div>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: C.text, textAlign: "center", margin: "0 0 10px", lineHeight: 1.3 }}>Wählt getrennt,<br />entdeckt gemeinsam</h1>
        <p style={{ fontSize: 13, color: C.sub, textAlign: "center", lineHeight: 1.6, margin: "0 0 28px" }}>Gleiche Produkte gewählt? Match!</p>
        <Btn full onClick={() => setStarted(true)} icon={Heart}>Let's go</Btn>
        <Cd style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 10, width: "100%" }}><div style={{ width: 30, height: 30, borderRadius: 9, background: C.purple, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 11, fontWeight: 900, color: "#fff" }}>A</span></div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>Alex ist verbunden</div></div><Check size={14} color={C.purple} /></Cd>
      </div>
    </div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", paddingBottom: 80 }}><Bg v="couple" />
      <div style={{ position: "relative", zIndex: 1, padding: `24px ${P}px 0` }}><h1 style={{ fontSize: 22, fontWeight: 900, color: C.text, margin: "0 0 14px" }}>Couple</h1>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>{[{ l: "Picks", v: list.length }, { l: "Matches", v: matches.length, hl: matches.length > 0 }, { l: "Übrig", v: PRODUCTS.length - list.length }].map((s: any, i) => (<div key={i} style={{ flex: 1, padding: "10px 6px", borderRadius: 12, background: s.hl ? `${C.coral}08` : C.card, boxShadow: C.sh, textAlign: "center" }}><div style={{ fontSize: 16, fontWeight: 900, color: s.hl ? C.coral : C.text }}>{s.v}</div><div style={{ fontSize: 9, fontWeight: 700, color: C.muted }}>{s.l}</div></div>))}</div></div>
      {matches.length > 0 && <div style={{ padding: `0 ${P}px 12px`, position: "relative", zIndex: 1 }}><div style={{ display: "flex", gap: 8, overflowX: "auto" }}>{matches.map(p => (<Cd key={p.id} style={{ minWidth: 140, padding: 12, flexShrink: 0, border: `1px solid ${C.coral}12` }}><div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}><Heart size={10} color={C.coral} fill={C.coral} /><span style={{ fontSize: 9, fontWeight: 800, color: C.coral }}>MATCH</span></div><div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 1 }}>{p.name}</div><div style={{ fontSize: 11, color: C.muted }}>€{p.price}</div><button style={{ marginTop: 8, width: "100%", padding: "7px 0", borderRadius: 8, border: "none", background: C.text, color: "#fff", fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Shop</button></Cd>))}</div></div>}
      <div style={{ display: "flex", gap: 6, padding: `0 ${P}px 8px`, overflowX: "auto", position: "relative", zIndex: 1 }}>{cats.map(c => (<Pill key={c} active={filter === c} onClick={() => setFilter(c)}>{c}</Pill>))}</div>
      <div style={{ flex: 1, overflowY: "auto", padding: `0 ${P}px`, position: "relative", zIndex: 1 }}>{filtered.map((p, i) => { const added = list.find(w => w.id === p.id), matched = added && isMatch(p.id); return (<div key={p.id} style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 0", borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : "none", opacity: added ? .45 : 1 }}><div style={{ width: 44, height: 44, borderRadius: 12, background: matched ? `${C.coral}08` : C.soft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{matched ? <Heart size={16} color={C.coral} fill={C.coral} /> : <Package size={16} color={C.muted} strokeWidth={1.4} />}</div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{p.name}</div><div style={{ fontSize: 11, color: C.muted }}>€{p.price}</div></div>{added ? <div style={{ display: "flex", alignItems: "center", gap: 5 }}>{matched && <span style={{ fontSize: 9, fontWeight: 800, color: C.coral, background: `${C.coral}0a`, padding: "2px 7px", borderRadius: 5 }}>MATCH</span>}<button onClick={() => setList(prev => prev.filter(w => w.id !== p.id))} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}><X size={13} color={C.light} /></button></div> : <button onClick={() => add(p)} style={{ width: 34, height: 34, borderRadius: 10, border: "none", background: C.text, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Plus size={15} strokeWidth={2.5} /></button>}</div>); })}</div>
    </div>
  );
}
