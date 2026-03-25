import { useState } from "react";
import { Sparkles, Star, Heart, Crown } from "lucide-react";
import { C } from "../constants";
import { Btn } from "../components";

export function Onboarding({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const steps = [
    { icon: Sparkles, color: C.purple, title: "Willkommen bei Circle", desc: "Dein Loyalty-Programm für mehr Spaß am Liebesleben." },
    { icon: Star, color: C.gold, title: "Sammle Punkte", desc: "Reviews, Shares und Challenges — je aktiver, desto mehr Rewards." },
    { icon: Heart, color: C.coral, title: "Entdeckt gemeinsam", desc: "Wählt getrennt Produkte. Gleiches gewählt? Match!" },
    { icon: Crown, color: C.purple, title: "Bereit?", desc: "Steige auf, sammle Badges, werde Ambassador." },
  ];
  const s = steps[step], last = step === 3, SI = s.icon;
  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 36px" }}>
        <div key={step} style={{ animation: "fi .25s", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 88, height: 88, borderRadius: 30, background: `${s.color}08`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}><SI size={40} color={s.color} strokeWidth={1.3} fill={step === 2 ? s.color : "none"} /></div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: C.text, textAlign: "center", margin: "0 0 12px", lineHeight: 1.25 }}>{s.title}</h1>
          <p style={{ fontSize: 14, color: C.sub, textAlign: "center", lineHeight: 1.7, margin: 0, maxWidth: 280 }}>{s.desc}</p>
        </div>
      </div>
      <div style={{ padding: "0 32px 56px" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 24 }}>{steps.map((_, i) => (<div key={i} style={{ width: i === step ? 20 : 6, height: 6, borderRadius: 3, background: i === step ? C.purple : C.soft, transition: "all .3s" }} />))}</div>
        <Btn full onClick={() => last ? onDone() : setStep(step + 1)}>{last ? "Let's go" : "Weiter"}</Btn>
        {!last && <button onClick={onDone} style={{ width: "100%", padding: "12px 0", marginTop: 8, background: "none", border: "none", fontSize: 13, fontWeight: 600, color: C.muted, cursor: "pointer", fontFamily: "inherit" }}>Überspringen</button>}
      </div>
    </div>
  );
}
