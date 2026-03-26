import { useState } from "react";
import { Package, Truck, Check, ShoppingBag, ChevronRight, ArrowLeft, Star, RotateCcw } from "lucide-react";
import { C, P } from "../constants";
import { Btn, Pill, Cd, Bg } from "../components";
import { PRODUCTS } from "../data";

const ORDERS = [
  { id: "ORD-2847", date: "18. März 2026", items: [PRODUCTS[0], PRODUCTS[2]], total: "44.90", status: "delivered", pts: 100 },
  { id: "ORD-2831", date: "4. März 2026", items: [PRODUCTS[3]], total: "24.95", status: "shipped", pts: 50 },
  { id: "ORD-2819", date: "22. Feb 2026", items: [PRODUCTS[6], PRODUCTS[1]], total: "102.90", status: "delivered", pts: 200 },
];

const STATUS: Record<string, { label: string; color: string; icon: any }> = {
  delivered: { label: "Geliefert", color: "#2D7D6B", icon: Check },
  shipped: { label: "Unterwegs", color: C.purple, icon: Truck },
  processing: { label: "Verarbeitung", color: C.gold, icon: Package },
};

export function Shop({ points, onBack }: any) {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [reorder, setReorder] = useState<typeof ORDERS[0] | null>(null);

  const filtered = filter === "all" ? ORDERS : ORDERS.filter(o => filter === "delivered" ? o.status === "delivered" : o.status === "shipped");
  const totalValue = ORDERS.reduce((a, o) => a + parseFloat(o.total), 0).toFixed(2);
  const totalPts = ORDERS.reduce((a, o) => a + o.pts, 0);

  return (
    <div style={{ paddingBottom: 80, position: "relative" }}><Bg v="profile" /><div style={{ position: "relative", zIndex: 1 }}>
      {/* Header */}
      <div style={{ padding: `36px ${P}px 0`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 12, background: C.soft, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><ArrowLeft size={18} color={C.sub} strokeWidth={1.8} /></button>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: C.text, margin: 0 }}>Bestellungen</h1>
        </div>
        <div style={{ padding: "6px 14px", borderRadius: 20, background: `${C.purple}0a`, display: "flex", alignItems: "center", gap: 5 }}><Star size={13} color={C.purple} strokeWidth={2} fill={C.purple} /><span style={{ fontSize: 13, fontWeight: 800, color: C.purple }}>{points}</span></div>
      </div>

      {/* Quick Stats */}
      <div style={{ display: "flex", gap: 8, padding: `16px ${P}px 0` }}>
        {[{ l: "Bestellungen", v: `${ORDERS.length}` }, { l: "Gesamtwert", v: `€${totalValue}` }, { l: "Punkte verdient", v: `${totalPts}` }].map((s, i) => (
          <div key={i} style={{ flex: 1, padding: "10px 6px", borderRadius: 12, background: C.card, boxShadow: C.sh, textAlign: "center" }}><div style={{ fontSize: 16, fontWeight: 900, color: C.text }}>{s.v}</div><div style={{ fontSize: 9, fontWeight: 700, color: C.muted }}>{s.l}</div></div>
        ))}
      </div>

      {/* Filter Pills */}
      <div style={{ display: "flex", gap: 8, padding: `16px ${P}px 0` }}>
        {[{ id: "all", l: "Alle" }, { id: "delivered", l: "Geliefert" }, { id: "shipped", l: "Unterwegs" }].map(f => (
          <Pill key={f.id} active={filter === f.id} onClick={() => setFilter(f.id)}>{f.l}</Pill>
        ))}
      </div>

      {/* Order Cards */}
      <div style={{ padding: `14px ${P}px` }}>
        {filtered.map(order => {
          const st = STATUS[order.status];
          const SI = st.icon;
          const isExp = expanded === order.id;
          return (
            <Cd key={order.id} style={{ marginBottom: 12, padding: 0, overflow: "hidden" }}>
              {/* Order Header — clickable to expand */}
              <div onClick={() => setExpanded(isExp ? null : order.id)} style={{ padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${st.color}0a`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><ShoppingBag size={18} color={st.color} strokeWidth={1.5} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{order.id}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 20, background: `${st.color}10` }}><SI size={11} color={st.color} strokeWidth={2.2} /><span style={{ fontSize: 10, fontWeight: 700, color: st.color }}>{st.label}</span></div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 3 }}>
                    <span style={{ fontSize: 11, color: C.muted }}>{order.date} · {order.items.length} {order.items.length === 1 ? "Artikel" : "Artikel"}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: C.text }}>€{order.total}</span>
                  </div>
                </div>
                <ChevronRight size={14} color={C.light} strokeWidth={2} style={{ transform: isExp ? "rotate(90deg)" : "none", transition: "transform .2s", flexShrink: 0 }} />
              </div>

              {/* Expanded Items */}
              {isExp && (
                <div style={{ borderTop: `1px solid ${C.border}`, padding: "12px 16px" }}>
                  {order.items.map((item, idx) => (
                    <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: idx < order.items.length - 1 ? `1px solid ${C.border}` : "none" }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: C.soft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Package size={18} color={C.muted} strokeWidth={1.5} /></div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                        <div style={{ fontSize: 11, color: C.muted }}>{item.cat}</div>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: C.text, flexShrink: 0 }}>€{item.price}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}><Star size={12} color={C.gold} strokeWidth={2} fill={C.gold} /><span style={{ fontSize: 11, fontWeight: 700, color: C.gold }}>+{order.pts} Punkte verdient</span></div>
                    {order.status === "delivered" && (
                      <Btn small icon={RotateCcw} onClick={() => setReorder(order)}>Nachbestellen</Btn>
                    )}
                  </div>
                </div>
              )}
            </Cd>
          );
        })}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <ShoppingBag size={36} color={C.light} strokeWidth={1.2} />
            <p style={{ fontSize: 13, color: C.muted, fontWeight: 600, marginTop: 10 }}>Keine Bestellungen gefunden</p>
          </div>
        )}
      </div>
    </div>

    {/* Reorder Overlay */}
    {reorder && (
      <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
        <div onClick={() => setReorder(null)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.45)" }} />
        <div style={{ position: "relative", width: "100%", maxWidth: 430, background: C.card, borderRadius: "24px 24px 0 0", padding: `24px ${P}px 32px`, zIndex: 1 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: C.light, margin: "0 auto 20px" }} />
          <h3 style={{ fontSize: 17, fontWeight: 900, color: C.text, margin: "0 0 4px" }}>Nachbestellen</h3>
          <p style={{ fontSize: 12, color: C.muted, margin: "0 0 18px" }}>Bestellung {reorder.id} erneut aufgeben?</p>
          {reorder.items.map(item => (
            <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: C.soft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Package size={18} color={C.muted} strokeWidth={1.5} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{item.name}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{item.cat}</div>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>€{item.price}</span>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Gesamt</span>
            <span style={{ fontSize: 16, fontWeight: 900, color: C.text }}>€{reorder.total}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "10px 0 18px" }}><Star size={13} color={C.gold} strokeWidth={2} fill={C.gold} /><span style={{ fontSize: 12, fontWeight: 700, color: C.gold }}>+{reorder.pts} Punkte bei dieser Bestellung</span></div>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn full variant="outline" onClick={() => setReorder(null)}>Abbrechen</Btn>
            <Btn full onClick={() => setReorder(null)}>Jetzt bestellen</Btn>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}
