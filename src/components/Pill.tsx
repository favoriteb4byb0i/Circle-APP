import { C } from "../constants";

export function Pill({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${active ? C.purple : C.border}`, background: active ? C.purple : C.bg, color: active ? "#fff" : C.sub, fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" }}>
      {children}
    </button>
  );
}
