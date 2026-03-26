import { useState } from "react";
import { Users, Plus, Copy, Check, Heart, ChevronRight, ArrowLeft, Share2, Crown, Gift } from "lucide-react";
import { C, P } from "../constants";
import { Btn, Cd, Pill, Bg } from "../components";
import { PRODUCTS } from "../data";

const GROUPS = [
  { id: 1, name: "JGA Sarah 🎉", type: "jga", members: ["Du", "Lisa", "Anna", "Marie", "Lena"], created: "vor 3 Tagen", matches: 2, totalPicks: 12, color: C.coral },
  { id: 2, name: "Girls Night", type: "freunde", members: ["Du", "Julia", "Sophie"], created: "vor 1 Woche", matches: 1, totalPicks: 6, color: C.purple },
];

const MEMBER_COLORS = [C.purple, C.coral, C.gold, "#2D7D6B", "#3B6BB5", "#C4702B"];
const MATCH_PRODUCTS = [PRODUCTS[1], PRODUCTS[3], PRODUCTS[5]];

const typeBadge = (type: string) => type === "jga" ? { label: "JGA", icon: Crown, bg: `${C.coral}12`, color: C.coral } : { label: "Freunde", icon: Users, bg: `${C.purple}10`, color: C.purple };

export function Groups({ onBack }: any) {
  const [view, setView] = useState<"list" | "detail" | "create">("list");
  const [activeGroup, setActiveGroup] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState<"jga" | "freunde">("jga");

  const copyLink = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const openGroup = (g: any) => { setActiveGroup(g); setView("detail"); };

  // --- Create Overlay ---
  if (view === "create") return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", paddingBottom: 80 }}><Bg v="couple" />
      <div style={{ position: "relative", zIndex: 1, padding: `24px ${P}px 0` }}>
        <button onClick={() => setView("list")} style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", padding: 0, marginBottom: 20 }}><ArrowLeft size={18} color={C.text} strokeWidth={2} /><span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Zurück</span></button>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: C.text, margin: "0 0 4px" }}>Neue Gruppe</h1>
        <p style={{ fontSize: 13, color: C.sub, margin: "0 0 24px" }}>Erstelle eine Wunschlisten-Gruppe</p>
      </div>
      <div style={{ position: "relative", zIndex: 1, padding: `0 ${P}px`, flex: 1 }}>
        <Cd style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 11, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: .5, display: "block", marginBottom: 8 }}>Gruppenname</label>
          <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="z.B. JGA Sarah, Girls Night..." style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${C.border}`, background: C.soft, fontSize: 14, fontWeight: 600, color: C.text, fontFamily: "inherit", outline: "none" }} />
        </Cd>
        <Cd style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 11, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: .5, display: "block", marginBottom: 10 }}>Gruppentyp</label>
          <div style={{ display: "flex", gap: 8 }}>
            {([["jga", "JGA / Bachelorette", Crown, C.coral], ["freunde", "Freundesgruppe", Users, C.purple]] as const).map(([key, label, Icon, clr]) => (
              <button key={key} onClick={() => setNewType(key as any)} style={{ flex: 1, padding: "14px 10px", borderRadius: 14, border: `2px solid ${newType === key ? clr : C.border}`, background: newType === key ? `${clr}08` : C.card, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: 18, background: newType === key ? `${clr}14` : C.soft, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={17} color={newType === key ? clr : C.muted} strokeWidth={1.8} /></div>
                <span style={{ fontSize: 11, fontWeight: 700, color: newType === key ? clr : C.sub }}>{label}</span>
              </button>
            ))}
          </div>
        </Cd>
        <Btn full onClick={() => { setView("list"); setNewName(""); }} disabled={!newName.trim()} icon={Share2}>Erstellen & Link teilen</Btn>
        <p style={{ fontSize: 11, color: C.muted, textAlign: "center", marginTop: 12, lineHeight: 1.5 }}>Nach dem Erstellen erhältst du einen Einladungslink,<br />den du mit deiner Gruppe teilen kannst.</p>
      </div>
    </div>
  );

  // --- Group Detail ---
  if (view === "detail" && activeGroup) {
    const g = activeGroup;
    const badge = typeBadge(g.type);
    const BadgeIcon = badge.icon;
    const groupMatches = MATCH_PRODUCTS.slice(0, g.matches);
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", paddingBottom: 80 }}><Bg v="couple" />
        <div style={{ position: "relative", zIndex: 1, padding: `24px ${P}px 0` }}>
          <button onClick={() => setView("list")} style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", padding: 0, marginBottom: 20 }}><ArrowLeft size={18} color={C.text} strokeWidth={2} /><span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Zurück</span></button>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: C.text, margin: 0 }}>{g.name}</h1>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 8, background: badge.bg, fontSize: 10, fontWeight: 800, color: badge.color }}><BadgeIcon size={11} />{badge.label}</span>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>{[{ l: "Picks", v: g.totalPicks }, { l: "Matches", v: g.matches, hl: g.matches > 0 }, { l: "Mitglieder", v: g.members.length }].map((s: any, i) => (<div key={i} style={{ flex: 1, padding: "10px 6px", borderRadius: 12, background: s.hl ? `${g.color}08` : C.card, boxShadow: C.sh, textAlign: "center" }}><div style={{ fontSize: 16, fontWeight: 900, color: s.hl ? g.color : C.text }}>{s.v}</div><div style={{ fontSize: 9, fontWeight: 700, color: C.muted }}>{s.l}</div></div>))}</div>
        </div>

        <div style={{ position: "relative", zIndex: 1, padding: `0 ${P}px`, flex: 1 }}>
          {/* Members */}
          <Cd style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: .5, marginBottom: 10 }}>Mitglieder</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{g.members.map((m: string, i: number) => (
              <div key={m} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 16, background: MEMBER_COLORS[i % MEMBER_COLORS.length], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ fontSize: 11, fontWeight: 900, color: "#fff" }}>{m.charAt(0)}</span></div>
                <div style={{ flex: 1, fontSize: 13, fontWeight: 700, color: C.text }}>{m}{i === 0 && <span style={{ fontSize: 10, fontWeight: 600, color: C.muted, marginLeft: 6 }}>(Admin)</span>}</div>
                {i === 0 && <Crown size={13} color={C.gold} />}
              </div>
            ))}</div>
          </Cd>

          {/* Invite Link */}
          <Cd style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: .5, marginBottom: 8 }}>Einladungslink</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1, padding: "10px 12px", borderRadius: 10, background: C.soft, fontSize: 12, fontWeight: 600, color: C.sub, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>circle.app/g/{g.id}x7k2m</div>
              <button onClick={copyLink} style={{ width: 38, height: 38, borderRadius: 10, border: "none", background: copied ? `${C.purple}10` : C.text, color: copied ? C.purple : "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .2s" }}>{copied ? <Check size={16} /> : <Copy size={16} />}</button>
            </div>
            {copied && <div style={{ fontSize: 11, fontWeight: 700, color: C.purple, marginTop: 6 }}>Link kopiert!</div>}
          </Cd>

          {/* Matches */}
          {groupMatches.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: .5, marginBottom: 10 }}>Gruppen-Matches</div>
              <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>{groupMatches.map(p => (
                <Cd key={p.id} style={{ minWidth: 150, padding: 12, flexShrink: 0, border: `1px solid ${g.color}12` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}><Heart size={10} color={g.color} fill={g.color} /><span style={{ fontSize: 9, fontWeight: 800, color: g.color }}>MATCH</span></div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 2 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 6 }}>€{p.price}</div>
                  <div style={{ display: "flex", marginBottom: 8 }}>{g.members.slice(0, 3).map((m: string, i: number) => (
                    <div key={m} style={{ width: 20, height: 20, borderRadius: 10, background: MEMBER_COLORS[i % MEMBER_COLORS.length], display: "flex", alignItems: "center", justifyContent: "center", marginLeft: i > 0 ? -6 : 0, border: `2px solid ${C.card}`, zIndex: 3 - i }}><span style={{ fontSize: 8, fontWeight: 900, color: "#fff" }}>{m.charAt(0)}</span></div>
                  ))}</div>
                  <button style={{ width: "100%", padding: "7px 0", borderRadius: 8, border: "none", background: C.text, color: "#fff", fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Shop</button>
                </Cd>
              ))}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- Group List ---
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", paddingBottom: 80 }}><Bg v="couple" />
      <div style={{ position: "relative", zIndex: 1, padding: `24px ${P}px 0` }}>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: C.text, margin: "0 0 4px" }}>Gruppen</h1>
        <p style={{ fontSize: 13, color: C.sub, margin: "0 0 18px" }}>Gemeinsam entdecken</p>

        {/* Create Button */}
        <button onClick={() => setView("create")} style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: `2px dashed ${C.purple}30`, background: `${C.purple}06`, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", marginBottom: 20 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: C.purple, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Plus size={18} color="#fff" strokeWidth={2.5} /></div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.text }}>Neue Gruppe erstellen</div>
            <div style={{ fontSize: 11, color: C.sub }}>JGA, Freundesgruppe oder mehr</div>
          </div>
          <ChevronRight size={16} color={C.muted} />
        </button>

        {/* Active Groups */}
        <div style={{ fontSize: 11, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: .5, marginBottom: 10 }}>Aktive Gruppen</div>
      </div>

      <div style={{ position: "relative", zIndex: 1, padding: `0 ${P}px`, flex: 1 }}>
        {GROUPS.map(g => {
          const badge = typeBadge(g.type);
          const BadgeIcon = badge.icon;
          return (
            <Cd key={g.id} style={{ marginBottom: 12, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: `${g.color}10`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{g.type === "jga" ? <Gift size={20} color={g.color} strokeWidth={1.6} /> : <Users size={20} color={g.color} strokeWidth={1.6} />}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: C.text }}>{g.name}</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "2px 7px", borderRadius: 6, background: badge.bg, fontSize: 9, fontWeight: 800, color: badge.color }}><BadgeIcon size={9} />{badge.label}</span>
                  </div>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 8 }}>Erstellt {g.created}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    {/* Member Avatars */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {g.members.slice(0, 4).map((m, i) => (
                        <div key={m} style={{ width: 24, height: 24, borderRadius: 12, background: MEMBER_COLORS[i % MEMBER_COLORS.length], display: "flex", alignItems: "center", justifyContent: "center", marginLeft: i > 0 ? -6 : 0, border: `2px solid ${C.card}`, zIndex: 5 - i }}><span style={{ fontSize: 9, fontWeight: 900, color: "#fff" }}>{m.charAt(0)}</span></div>
                      ))}
                      {g.members.length > 4 && <div style={{ width: 24, height: 24, borderRadius: 12, background: C.soft, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: -6, border: `2px solid ${C.card}`, zIndex: 0 }}><span style={{ fontSize: 9, fontWeight: 800, color: C.muted }}>+{g.members.length - 4}</span></div>}
                    </div>
                    <span style={{ fontSize: 11, color: C.sub, fontWeight: 600 }}>{g.members.length} Mitglieder</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}><Heart size={11} color={g.matches > 0 ? g.color : C.muted} fill={g.matches > 0 ? g.color : "none"} /><span style={{ fontSize: 11, fontWeight: 700, color: g.matches > 0 ? g.color : C.muted }}>{g.matches} Matches</span></div>
                    <span style={{ fontSize: 11, color: C.muted }}>·</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: C.muted }}>{g.totalPicks} Picks</span>
                  </div>
                </div>
              </div>
              <button onClick={() => openGroup(g)} style={{ width: "100%", marginTop: 12, padding: "10px 0", borderRadius: 10, border: "none", background: C.text, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>Öffnen<ChevronRight size={13} strokeWidth={2.5} /></button>
            </Cd>
          );
        })}
      </div>
    </div>
  );
}
