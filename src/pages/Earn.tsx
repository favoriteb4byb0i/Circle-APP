import { useState } from "react";
import { Star, Share2, Check, ArrowLeft, Package, Send } from "lucide-react";
import { C, P } from "../constants";
import { Pill, Btn, Ring, Anim, Bg } from "../components";
import { PRODUCTS } from "../data";
import { ProductDetail } from "../screens";

export function Earn({ points, addPoints }: any) {
  const [sel, setSel] = useState<any>(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [anim, setAnim] = useState({ show: false, amt: 0 });
  const [done, setDone] = useState<any>({});
  const [filter, setFilter] = useState("All");
  const [success, setSuccess] = useState(false);
  const [detail, setDetail] = useState<any>(null);
  const cats = ["All", ...new Set(PRODUCTS.map(p => p.cat))];
  const sorted = [...PRODUCTS].sort((a, b) => (done[`r${a.id}`] ? 1 : 0) - (done[`r${b.id}`] ? 1 : 0));
  const list = filter === "All" ? sorted : sorted.filter(p => p.cat === filter);
  const reviewed = Object.keys(done).filter(k => k.startsWith("r")).length;
  const hero = list.find(p => !done[`r${p.id}`]) || list[0];
  const rest = list.filter(p => p.id !== hero?.id);
  const submit = () => { if (!sel || rating === 0) return; const pts = review.length > 50 ? 75 : 50; setSuccess(true); setTimeout(() => { setSuccess(false); setAnim({ show: true, amt: pts }); addPoints(pts); setDone((p: any) => ({ ...p, [`r${sel.id}`]: true })); setReview(""); setRating(0); setSel(null) }, 1600) };
  const share = (p: any, e?: any) => { e?.stopPropagation(); if (done[`s${p.id}`]) return; setAnim({ show: true, amt: 30 }); addPoints(30); setDone((prev: any) => ({ ...prev, [`s${p.id}`]: true })) };

  if (success) return (<div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: C.bg, zIndex: 400, animation: "fi .2s" }}><div style={{ animation: "pop .35s cubic-bezier(.34,1.56,.64,1)", textAlign: "center" }}><div style={{ width: 72, height: 72, borderRadius: 36, background: `${C.purple}10`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><Check size={32} color={C.purple} strokeWidth={2.5} /></div><h2 style={{ fontSize: 20, fontWeight: 900, color: C.text, margin: "0 0 4px" }}>Danke!</h2><p style={{ fontSize: 13, color: C.muted }}>+{review.length > 50 ? 75 : 50} Punkte</p></div></div>);
  if (detail && !sel) return (<ProductDetail product={detail} onBack={() => setDetail(null)} onReview={() => { setSel(detail); setDetail(null) }} />);
  if (sel) return (
    <div style={{ paddingBottom: 80 }}><Anim show={anim.show} amount={anim.amt} onDone={() => setAnim({ show: false, amt: 0 })} />
      <div style={{ padding: `18px ${P}px` }}><button onClick={() => { setSel(null); setRating(0); setReview("") }} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: C.muted, padding: 0, fontFamily: "inherit", marginBottom: 20 }}><ArrowLeft size={15} /> Zurück</button>
        <div style={{ height: 180, borderRadius: 16, background: C.soft, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}><Package size={44} color={C.muted} strokeWidth={1} /></div>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.purple, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 3 }}>{sel.cat}</div><h2 style={{ fontSize: 20, fontWeight: 900, color: C.text, margin: "0 0 2px" }}>{sel.name}</h2><p style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 24px" }}>€{sel.price}</p>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 8 }}>Bewertung</div>
        <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>{[1, 2, 3, 4, 5].map(s => (<button key={s} onClick={() => setRating(s)} style={{ flex: 1, height: 44, borderRadius: 12, border: "none", cursor: "pointer", background: s <= rating ? `${C.gold}15` : C.soft, display: "flex", alignItems: "center", justifyContent: "center" }}><Star size={20} color={s <= rating ? C.gold : C.light} fill={s <= rating ? C.gold : "none"} strokeWidth={1.5} /></button>))}</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 8 }}>Feedback</div>
        <textarea value={review} onChange={e => setReview(e.target.value)} placeholder="Was hat dir gefallen?" style={{ width: "100%", minHeight: 100, padding: 14, borderRadius: 14, background: C.soft, border: "none", color: C.text, fontSize: 13, lineHeight: 1.6, resize: "none", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "5px 0 20px" }}><span style={{ fontSize: 11, color: C.muted }}>{review.length} Zeichen</span>{review.length >= 50 && <span style={{ fontSize: 11, fontWeight: 700, color: C.purple }}>Bonus! +75</span>}</div>
        <Btn full disabled={rating === 0} onClick={submit} icon={Send}>Absenden</Btn>
      </div>
    </div>
  );
  return (
    <div style={{ paddingBottom: 80, position: "relative" }}><Bg v="earn" /><Anim show={anim.show} amount={anim.amt} onDone={() => setAnim({ show: false, amt: 0 })} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ padding: `28px ${P}px 0`, display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}><h1 style={{ fontSize: 22, fontWeight: 900, color: C.text, margin: 0 }}>Earn</h1><div style={{ display: "flex", alignItems: "center", gap: 8 }}><Ring size={36} sw={3} pct={reviewed / PRODUCTS.length}><span style={{ fontSize: 10, fontWeight: 900, color: C.text }}>{reviewed}/{PRODUCTS.length}</span></Ring><span style={{ fontSize: 13, fontWeight: 800, color: C.purple }}>{points} pts</span></div></div>
        <div style={{ display: "flex", gap: 6, padding: `0 ${P}px 14px`, overflowX: "auto" }}>{cats.map(c => (<Pill key={c} active={filter === c} onClick={() => setFilter(c)}>{c}</Pill>))}</div>
        {hero && <div style={{ padding: `0 ${P}px` }}><div style={{ borderRadius: 16, overflow: "hidden", background: C.card, boxShadow: C.sh, opacity: done[`r${hero.id}`] ? .35 : 1 }}><div onClick={() => !done[`r${hero.id}`] && setDetail(hero)} style={{ height: 240, background: C.soft, display: "flex", alignItems: "center", justifyContent: "center", cursor: done[`r${hero.id}`] ? "default" : "pointer", position: "relative" }}><Package size={44} color={C.muted} strokeWidth={1} />{!done[`r${hero.id}`] && <span style={{ position: "absolute", top: 12, left: 12, fontSize: 9, fontWeight: 800, color: C.purple, background: `${C.purple}0a`, padding: "3px 10px", borderRadius: 7 }}>Empfohlen</span>}</div>
          <div style={{ padding: "14px 16px 16px" }}><div style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginBottom: 2 }}>{hero.cat}</div><div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}><h3 style={{ fontSize: 16, fontWeight: 800, color: C.text, margin: 0 }}>{hero.name}</h3><span style={{ fontSize: 15, fontWeight: 800, color: C.text }}>€{hero.price}</span></div>
            <div style={{ display: "flex", gap: 8 }}><button onClick={() => !done[`r${hero.id}`] && setSel(hero)} disabled={done[`r${hero.id}`]} style={{ flex: 1, padding: "11px 0", borderRadius: 12, border: "none", background: done[`r${hero.id}`] ? C.soft : C.text, color: done[`r${hero.id}`] ? C.muted : "#fff", fontSize: 13, fontWeight: 700, cursor: done[`r${hero.id}`] ? "default" : "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}><Star size={14} strokeWidth={2} /> Review · +50</button><button onClick={e => share(hero, e)} disabled={done[`s${hero.id}`]} style={{ padding: "11px 16px", borderRadius: 12, border: `1.5px solid ${done[`s${hero.id}`] ? C.border : C.text}`, background: "transparent", cursor: done[`s${hero.id}`] ? "default" : "pointer", fontFamily: "inherit" }}>{done[`s${hero.id}`] ? <Check size={14} color={C.muted} /> : <Share2 size={14} color={C.text} />}</button></div></div></div></div>}
        <div style={{ padding: `14px ${P}px 0` }}>{rest.map((p, i) => { const rd = done[`r${p.id}`], sd = done[`s${p.id}`]; return (<div key={p.id} onClick={() => { if (!rd) setDetail(p) }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < rest.length - 1 ? `1px solid ${C.border}` : "none", cursor: rd ? "default" : "pointer", opacity: rd ? .3 : 1 }}><div style={{ width: 50, height: 50, borderRadius: 12, background: C.soft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Package size={20} color={C.muted} strokeWidth={1.3} /></div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 9, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginBottom: 1 }}>{p.cat}</div><div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{p.name}</div><div style={{ fontSize: 12, fontWeight: 600, color: C.sub }}>€{p.price}</div></div><div style={{ display: "flex", gap: 5, flexShrink: 0 }}><button onClick={e => { e.stopPropagation(); if (!rd) setSel(p) }} disabled={rd} style={{ padding: "7px 11px", borderRadius: 8, border: "none", background: rd ? C.soft : C.text, color: rd ? C.muted : "#fff", fontSize: 10, fontWeight: 700, cursor: rd ? "default" : "pointer", fontFamily: "inherit" }}>+50</button><button onClick={e => { e.stopPropagation(); share(p, e) }} disabled={sd} style={{ padding: "7px 9px", borderRadius: 8, border: `1.5px solid ${sd ? C.border : C.text}`, background: "transparent", cursor: sd ? "default" : "pointer", fontFamily: "inherit" }}>{sd ? <Check size={11} color={C.muted} /> : <Share2 size={11} color={C.text} />}</button></div></div>); })}</div>
      </div>
    </div>
  );
}
