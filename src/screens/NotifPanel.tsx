import { useState } from "react";
import { X, Check } from "lucide-react";
import { C, P } from "../constants";
import { Pill } from "../components";
import { NOTIFS } from "../data";
import { notifIcon, notifColor } from "../utils/helpers";

export function NotifPanel({ open, onClose, onNav }: { open: boolean; onClose: () => void; onNav: (s: string) => void }) {
  const [notifs, setNotifs] = useState(NOTIFS);
  const [filter, setFilter] = useState("all");
  const ur = notifs.filter(n => !n.read).length;
  const fl = filter === "all" ? notifs : filter === "unread" ? notifs.filter(n => !n.read) : notifs.filter(n => n.type === filter);
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 250, background: C.bg, display: "flex", flexDirection: "column", animation: "fi .15s" }}>
      <div style={{ padding: `18px ${P}px 0` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}><h1 style={{ fontSize: 22, fontWeight: 900, color: C.text, margin: 0 }}>Mitteilungen</h1><button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={20} color={C.sub} /></button></div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 6 }}>{[{ id: "all", l: "Alle" }, { id: "unread", l: `Neu (${ur})` }, { id: "match", l: "Matches" }].map(f => (<Pill key={f.id} active={filter === f.id} onClick={() => setFilter(f.id)}>{f.l}</Pill>))}</div>
          {ur > 0 && <button onClick={() => setNotifs(p => p.map(n => ({ ...n, read: true })))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, color: C.purple, fontFamily: "inherit" }}>Alle lesen</button>}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: `0 ${P}px 32px` }}>
        {fl.length === 0 && <div style={{ textAlign: "center", padding: "50px 0" }}><Check size={22} color={C.muted} /><p style={{ fontSize: 13, color: C.muted, marginTop: 8 }}>Alles gelesen</p></div>}
        {fl.map((n, i) => { const NI = notifIcon(n.type); return (
          <div key={n.id} onClick={() => { setNotifs(p => p.map(x => x.id === n.id ? { ...x, read: true } : x)); onNav(n.go); onClose() }} style={{ display: "flex", gap: 11, padding: "13px 0", borderBottom: i < fl.length - 1 ? `1px solid ${C.border}` : "none", cursor: "pointer", opacity: n.read ? .5 : 1 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: `${notifColor(n.type)}08`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative" }}><NI size={16} color={notifColor(n.type)} strokeWidth={1.8} fill={n.type === "match" ? notifColor(n.type) : "none"} />{!n.read && <div style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: 4, background: C.purple, border: "2px solid #fff" }} />}</div>
            <div style={{ flex: 1, minWidth: 0 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 1 }}><span style={{ fontSize: 13, fontWeight: n.read ? 600 : 800, color: C.text }}>{n.title}</span><span style={{ fontSize: 10, color: C.light }}>{n.time}</span></div><p style={{ fontSize: 12, color: C.sub, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{n.body}</p></div>
          </div>);
        })}
      </div>
    </div>
  );
}
