import { C } from "../constants";

export function Btn({ children, onClick, disabled, full, variant = "dark", small, icon: I }: any) {
  const bg = variant === "dark" ? C.text : variant === "outline" ? "transparent" : C.soft;
  const cl = variant === "dark" ? "#fff" : C.text;
  return (
    <button onClick={onClick} disabled={disabled} style={{ padding: small ? "8px 16px" : "12px 22px", borderRadius: 14, border: variant === "outline" ? `1.5px solid ${C.border}` : "none", background: bg, color: cl, fontSize: small ? 12 : 14, fontWeight: 700, cursor: disabled ? "default" : "pointer", opacity: disabled ? .25 : 1, width: full ? "100%" : "auto", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, fontFamily: "inherit" }}>
      {I && <I size={small ? 13 : 15} strokeWidth={2.2} />}{children}
    </button>
  );
}
