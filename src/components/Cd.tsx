import { C } from "../constants";

export function Cd({ children, style: s, ...p }: any) {
  return <div style={{ padding: 16, borderRadius: 16, background: C.card, boxShadow: C.sh, ...s }} {...p}>{children}</div>;
}
