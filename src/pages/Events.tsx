import { useState } from "react";
import { Calendar, MapPin, Users, Clock, Check, ChevronDown, ChevronUp, ArrowLeft, Sparkles } from "lucide-react";
import { C, P } from "../constants";
import { Pill, Btn, Cd, Bg } from "../components";

const EVENTS = [
  { id: 1, title: "Self-Care Basics Workshop", type: "Workshop", date: "12. Apr 2026", time: "18:00 – 20:00", location: "Online · Zoom", spots: 8, maxSpots: 20, price: "Kostenlos", pts: 100, booked: false, desc: "Lerne die Grundlagen der Selbstfürsorge. Mit praktischen Übungen und Tipps für den Alltag." },
  { id: 2, title: "Massage-Techniken für Paare", type: "Workshop", date: "19. Apr 2026", time: "19:00 – 21:00", location: "Berlin · Studio Calm", spots: 3, maxSpots: 12, price: "€29.95", pts: 150, booked: true, desc: "Hands-on Workshop für Paare. Professionelle Anleitung für entspannende Massagen." },
  { id: 3, title: "Intimität & Kommunikation", type: "Webinar", date: "25. Apr 2026", time: "20:00 – 21:30", location: "Online · Zoom", spots: 45, maxSpots: 100, price: "Kostenlos", pts: 75, booked: false, desc: "Expert-Talk über offene Kommunikation in Beziehungen. Q&A am Ende." },
  { id: 4, title: "Product Deep-Dive: Wellness", type: "Webinar", date: "2. Mai 2026", time: "19:00 – 20:00", location: "Online · Zoom", spots: 62, maxSpots: 100, price: "Kostenlos", pts: 50, booked: false, desc: "Alles über unsere Wellness-Produkte. Inhaltsstoffe, Anwendung, Tipps." },
  { id: 5, title: "Summer Wellness Retreat", type: "Vor Ort", date: "15. Jun 2026", time: "10:00 – 18:00", location: "München · Wellness Loft", spots: 2, maxSpots: 15, price: "€89.00", pts: 300, booked: false, desc: "Ganztägiges Retreat mit Yoga, Meditation, Workshops und Networking." },
];

const typeColor = (type: string) => type === "Workshop" ? "#2D7D6B" : type === "Webinar" ? C.purple : C.coral;

export function Events({ onBack }: any) {
  const [filter, setFilter] = useState("Alle");
  const [booked, setBooked] = useState<Record<number, boolean>>(
    Object.fromEntries(EVENTS.filter(e => e.booked).map(e => [e.id, true]))
  );
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const filters = ["Alle", "Workshops", "Webinare", "Vor Ort"];
  const filterMap: Record<string, string> = { Workshops: "Workshop", Webinare: "Webinar", "Vor Ort": "Vor Ort" };
  const filtered = filter === "Alle" ? EVENTS : EVENTS.filter(e => e.type === filterMap[filter]);

  const toggleExpand = (id: number) => setExpanded(p => ({ ...p, [id]: !p[id] }));
  const toggleBook = (id: number) => setBooked(p => ({ ...p, [id]: !p[id] }));

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", position: "relative" }}>
      <Bg v="educational" />

      <div style={{ position: "relative", zIndex: 1, padding: `24px ${P}px 0` }}>
        {/* Back button */}
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: C.muted, padding: 0, fontFamily: "inherit", marginBottom: 12 }}>
          <ArrowLeft size={15} /> Zurück
        </button>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: C.text, margin: 0 }}>Events & Workshops</h1>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: C.soft, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Calendar size={15} color={C.sub} />
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          {[
            { l: "Events", v: EVENTS.length.toString() },
            { l: "Gebucht", v: Object.values(booked).filter(Boolean).length.toString() },
            { l: "Punkte mögl.", v: EVENTS.reduce((s, e) => s + e.pts, 0).toString() },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, padding: "10px 6px", borderRadius: 12, background: C.card, boxShadow: C.sh, textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 900, color: C.text }}>{s.v}</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: C.muted }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Filter pills */}
        <div style={{ display: "flex", gap: 6, marginBottom: 14, overflowX: "auto" }}>
          {filters.map(f => (
            <Pill key={f} active={filter === f} onClick={() => setFilter(f)}>{f}</Pill>
          ))}
        </div>
      </div>

      {/* Event list */}
      <div style={{ flex: 1, overflowY: "auto", padding: `0 ${P}px 96px`, position: "relative", zIndex: 1 }}>
        {filtered.map(ev => {
          const isBooked = booked[ev.id];
          const isExpanded = expanded[ev.id];
          const spotsLeft = ev.maxSpots - ev.spots;
          const spotsPct = ev.spots / ev.maxSpots;
          const spotColor = spotsLeft <= 3 ? C.coral : spotsLeft <= 10 ? C.gold : "#2D7D6B";

          return (
            <Cd key={ev.id} style={{ marginBottom: 10, padding: 0, overflow: "hidden", borderLeft: isBooked ? `3px solid ${C.purple}` : "none" }}>
              <div style={{ padding: 14 }}>
                {/* Type badge + title */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", background: typeColor(ev.type), padding: "3px 8px", borderRadius: 6 }}>{ev.type}</span>
                  {isBooked && (
                    <span style={{ fontSize: 9, fontWeight: 800, color: C.purple, background: `${C.purple}12`, padding: "3px 8px", borderRadius: 6, display: "flex", alignItems: "center", gap: 3 }}>
                      <Check size={9} strokeWidth={3} /> Gebucht
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: 14, fontWeight: 800, color: C.text, margin: "0 0 8px", lineHeight: 1.3 }}>{ev.title}</h3>

                {/* Date + time */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: C.sub }}>
                    <Calendar size={11} strokeWidth={2} /> {ev.date}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: C.sub }}>
                    <Clock size={11} strokeWidth={2} /> {ev.time}
                  </span>
                </div>

                {/* Location */}
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: C.muted, marginBottom: 10 }}>
                  <MapPin size={11} strokeWidth={2} /> {ev.location}
                </div>

                {/* Spots bar */}
                <div style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 600, color: C.sub }}>
                      <Users size={10} strokeWidth={2} /> {spotsLeft} Plätze frei
                    </span>
                    <span style={{ fontSize: 10, color: C.muted }}>{ev.spots}/{ev.maxSpots}</span>
                  </div>
                  <div style={{ height: 4, borderRadius: 2, background: C.soft, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${spotsPct * 100}%`, borderRadius: 2, background: spotColor, transition: "width .3s" }} />
                  </div>
                </div>

                {/* Price + points + book */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: C.text }}>{ev.price}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: C.purple, background: `${C.purple}0a`, padding: "3px 8px", borderRadius: 6, display: "flex", alignItems: "center", gap: 3 }}>
                      <Sparkles size={10} /> +{ev.pts} pts
                    </span>
                  </div>
                  {isBooked ? (
                    <button onClick={() => toggleBook(ev.id)} style={{ padding: "8px 16px", borderRadius: 14, border: `1.5px solid ${C.purple}`, background: `${C.purple}08`, color: C.purple, fontSize: 12, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5, fontFamily: "inherit" }}>
                      <Check size={13} strokeWidth={2.5} /> Gebucht
                    </button>
                  ) : (
                    <Btn small onClick={() => toggleBook(ev.id)}>Buchen</Btn>
                  )}
                </div>

                {/* Expand toggle */}
                <button onClick={() => toggleExpand(ev.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 600, color: C.muted, padding: 0, fontFamily: "inherit", marginTop: 10 }}>
                  {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  {isExpanded ? "Weniger anzeigen" : "Mehr anzeigen"}
                </button>
              </div>

              {/* Expandable description */}
              {isExpanded && (
                <div style={{ padding: `0 14px 14px`, animation: "fi .15s" }}>
                  <div style={{ padding: "12px 14px", borderRadius: 12, background: C.soft }}>
                    <p style={{ fontSize: 12, color: C.sub, lineHeight: 1.6, margin: 0 }}>{ev.desc}</p>
                  </div>
                  {isBooked && (
                    <button style={{ marginTop: 10, background: "none", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "10px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: C.sub, width: "100%", justifyContent: "center", fontFamily: "inherit" }}>
                      <Calendar size={13} strokeWidth={2} /> Zum Kalender hinzufügen
                    </button>
                  )}
                </div>
              )}
            </Cd>
          );
        })}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: C.muted }}>
            <Calendar size={32} strokeWidth={1} color={C.light} style={{ marginBottom: 12 }} />
            <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>Keine Events in dieser Kategorie</p>
          </div>
        )}
      </div>
    </div>
  );
}
