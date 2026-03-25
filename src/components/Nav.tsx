import { Sparkles, Star, Heart, BookOpen, Camera, Crown } from "lucide-react";
import { C } from "../constants";

export function Nav({ active, go }: { active: string; go: (s: string) => void }) {
  return (
    <nav style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: "rgba(255,255,255,.92)", backdropFilter: "blur(20px)", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-around", padding: "8px 0 24px", zIndex: 100 }}>
      {[
        { id: "home", i: Sparkles },
        { id: "earn", i: Star },
        { id: "couple", i: Heart },
        { id: "educational", i: BookOpen },
        { id: "creators", i: Camera },
        { id: "profile", i: Crown },
      ].map(t => (
        <button key={t.id} onClick={() => go(t.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 6px", position: "relative" }}>
          <t.i size={20} color={active === t.id ? C.purple : C.muted} fill={active === t.id ? C.purple : "none"} strokeWidth={active === t.id ? 2.2 : 1.4} />
          {active === t.id && <div style={{ position: "absolute", top: -3, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: 2, background: C.purple }} />}
        </button>
      ))}
    </nav>
  );
}
