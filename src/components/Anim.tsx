import { useEffect } from "react";
import { C } from "../constants";

export function Anim({ show, amount, onDone }: { show: boolean; amount: number; onDone: () => void }) {
  useEffect(() => {
    if (show) { const t = setTimeout(onDone, 1400); return () => clearTimeout(t); }
  }, [show]);
  if (!show) return null;
  return (
    <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(250,250,248,.94)", backdropFilter: "blur(16px)", zIndex: 300, animation: "fi .15s" }}>
      <div style={{ textAlign: "center", animation: "pop .3s cubic-bezier(.34,1.56,.64,1)" }}>
        <div style={{ fontSize: 48, fontWeight: 900, color: C.text }}>+{amount}</div>
        <div style={{ fontSize: 13, color: C.muted, fontWeight: 600, marginTop: 2 }}>Punkte</div>
      </div>
    </div>
  );
}
