import { useState } from "react";
import { Heart, Search, X, BookOpen, Clock, Star, ChevronRight, Check, ArrowLeft, Award } from "lucide-react";
import { C, P } from "../constants";
import { Pill, Btn, Cd, Ring, Anim, Bg } from "../components";
import { EDUCATIONAL_CONTENT, LEARNING_PATHS } from "../data";
import { topicColor, contentTypeColor } from "../utils/helpers";

function ContentDetail({ article, onBack, onComplete }: any) {
  const [read, setRead] = useState(false);
  const paragraphs = [
    article.desc,
    "In diesem Artikel erfährst du alles Wichtige zum Thema. Unsere Expertinnen haben die besten Tipps zusammengestellt, damit du dich sicher und informiert fühlst.",
    "Nimm dir Zeit und lies in deinem eigenen Tempo. Es gibt kein Richtig oder Falsch — jeder Weg ist individuell.",
    "Tipp: Speichere diesen Artikel, um später nochmal nachzulesen. Und vergiss nicht, deine Punkte zu sammeln!",
  ];

  return (
    <div style={{ paddingBottom: 80, position: "relative" }}><Bg v="educational" />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ padding: `16px ${P}px 0` }}>
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: C.muted, padding: 0, fontFamily: "inherit" }}><ArrowLeft size={15} /> Zurück</button>
        </div>

        <div style={{ height: 200, margin: `16px ${P}px 0`, borderRadius: 16, background: C.soft, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <BookOpen size={40} color={C.muted} strokeWidth={1} />
        </div>

        <div style={{ padding: `16px ${P}px 0` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", background: topicColor(article.category), padding: "3px 8px", borderRadius: 6 }}>{article.category}</span>
            <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", background: contentTypeColor(article.type), padding: "3px 8px", borderRadius: 6 }}>{article.type}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10, color: C.muted }}><Clock size={10} /> {article.readTime}</span>
          </div>

          <h1 style={{ fontSize: 22, fontWeight: 900, color: C.text, margin: "0 0 6px", lineHeight: 1.3 }}>{article.title}</h1>
          <p style={{ fontSize: 12, color: C.muted, margin: "0 0 20px" }}>Von <span style={{ fontWeight: 700, color: C.sub }}>{article.author}</span></p>

          {paragraphs.map((p, i) => (
            <p key={i} style={{ fontSize: 14, color: C.sub, lineHeight: 1.8, margin: "0 0 16px" }}>{p}</p>
          ))}

          <div style={{ padding: "20px 0", borderTop: `1px solid ${C.border}`, marginTop: 12 }}>
            {!read ? (
              <Btn full icon={Check} onClick={() => { setRead(true); onComplete(article.points); }}>
                Gelesen · +{article.points} pts
              </Btn>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 0" }}>
                <Check size={18} color={C.purple} strokeWidth={2.5} />
                <span style={{ fontSize: 14, fontWeight: 700, color: C.purple }}>+{article.points} Punkte erhalten</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Educational({ points, addPoints }: any) {
  const [category, setCategory] = useState("All");
  const [searchQ, setSearchQ] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [liked, setLiked] = useState<any>({});
  const [readArticles, setReadArticles] = useState<any>({});
  const [detail, setDetail] = useState<any>(null);
  const [anim, setAnim] = useState({ show: false, amt: 0 });

  const categories = ["All", "Beginners", "Couples", "Self-Care", "Wellness", "Product Deep-Dives"];
  const filtered = category === "All" ? EDUCATIONAL_CONTENT : EDUCATIONAL_CONTENT.filter(a => a.category === category);
  const hot = EDUCATIONAL_CONTENT.filter(a => a.hot).sort((a, b) => b.likes - a.likes).slice(0, 3);
  const searched = searchQ.trim() ? EDUCATIONAL_CONTENT.filter(a => a.title.toLowerCase().includes(searchQ.toLowerCase()) || a.desc.toLowerCase().includes(searchQ.toLowerCase())) : [];
  const readCount = Object.keys(readArticles).length;

  const onComplete = (pts: number) => {
    if (detail && !readArticles[detail.id]) {
      setReadArticles((p: any) => ({ ...p, [detail.id]: true }));
      setAnim({ show: true, amt: pts });
      addPoints(pts);
    }
  };

  if (detail) return (
    <>
      <Anim show={anim.show} amount={anim.amt} onDone={() => setAnim({ show: false, amt: 0 })} />
      <ContentDetail article={detail} onBack={() => setDetail(null)} onComplete={onComplete} />
    </>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}><Bg v="educational" />
      <Anim show={anim.show} amount={anim.amt} onDone={() => setAnim({ show: false, amt: 0 })} />
      <div style={{ position: "relative", zIndex: 1, padding: `24px ${P}px 0` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: C.text, margin: 0 }}>Educational Hub</h1>
          <button onClick={() => setSearchOpen(true)} style={{ width: 34, height: 34, borderRadius: 10, background: C.soft, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Search size={15} color={C.sub} /></button>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          {[{ l: "Artikel", v: EDUCATIONAL_CONTENT.length.toString() }, { l: "Gelesen", v: readCount.toString() }, { l: "Lernpfade", v: LEARNING_PATHS.length.toString() }].map((s, i) => (
            <div key={i} style={{ flex: 1, padding: "10px 6px", borderRadius: 12, background: C.card, boxShadow: C.sh, textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 900, color: C.text }}>{s.v}</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: C.muted }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Paths */}
      <div style={{ position: "relative", zIndex: 1, padding: `0 0 10px` }}>
        <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".03em", color: C.muted, padding: `0 ${P}px`, marginBottom: 8 }}>Lernpfade</div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: `0 ${P}px 4px` }}>
          {LEARNING_PATHS.map(lp => (
            <Cd key={lp.id} style={{ minWidth: 200, padding: 14, flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 11, background: `${lp.color}0a`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Award size={16} color={lp.color} strokeWidth={1.8} />
                </div>
                <Ring size={38} sw={3} pct={lp.articles > 0 ? lp.completed / lp.articles : 0} color={lp.color}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: C.text }}>{lp.completed}/{lp.articles}</span>
                </Ring>
              </div>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: "0 0 2px" }}>{lp.title}</h3>
              <p style={{ fontSize: 11, color: C.muted, margin: "0 0 4px" }}>{lp.desc}</p>
              <span style={{ fontSize: 11, fontWeight: 700, color: lp.color }}>+{lp.points} pts</span>
            </Cd>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ display: "flex", gap: 6, padding: `4px ${P}px 10px`, overflowX: "auto", position: "relative", zIndex: 1 }}>
        {categories.map(c => (
          <Pill key={c} active={category === c} onClick={() => setCategory(c)}>{c}</Pill>
        ))}
      </div>

      {/* Content List */}
      <div style={{ flex: 1, overflowY: "auto", padding: `0 ${P}px 96px`, position: "relative", zIndex: 1 }}>
        {/* Popular this week */}
        {category === "All" && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".03em", color: C.muted, marginBottom: 8 }}>Beliebt diese Woche</div>
            <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
              {hot.map(a => (
                <Cd key={a.id} onClick={() => setDetail(a)} style={{ minWidth: 200, padding: 14, flexShrink: 0, borderLeft: `3px solid ${topicColor(a.category)}`, cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
                    <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", background: topicColor(a.category), padding: "2px 7px", borderRadius: 5 }}>{a.category}</span>
                    <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", background: contentTypeColor(a.type), padding: "2px 7px", borderRadius: 5 }}>{a.type}</span>
                  </div>
                  <h3 style={{ fontSize: 12, fontWeight: 700, color: C.text, margin: "0 0 6px", lineHeight: 1.4 }}>{a.title}</h3>
                  <div style={{ display: "flex", gap: 8, fontSize: 10, color: C.muted }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Heart size={10} /> {a.likes}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Clock size={10} /> {a.readTime}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Star size={10} /> +{a.points}</span>
                  </div>
                </Cd>
              ))}
            </div>
          </div>
        )}

        {/* Article Cards */}
        {filtered.map((a, i) => {
          const isRead = readArticles[a.id];
          const il = liked[a.id];
          return (
            <Cd key={a.id} onClick={() => setDetail(a)} style={{ marginBottom: 10, padding: 0, overflow: "hidden", cursor: "pointer", opacity: isRead ? .6 : 1 }}>
              <div style={{ display: "flex", gap: 12, padding: 14 }}>
                {/* Thumbnail */}
                <div style={{ width: 72, height: 72, borderRadius: 12, background: `${topicColor(a.category)}08`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <BookOpen size={22} color={topicColor(a.category)} strokeWidth={1.4} />
                </div>
                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
                    <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", background: topicColor(a.category), padding: "2px 6px", borderRadius: 4 }}>{a.category}</span>
                    <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", background: contentTypeColor(a.type), padding: "2px 6px", borderRadius: 4 }}>{a.type}</span>
                    {isRead && <Check size={12} color={C.purple} strokeWidth={2.5} />}
                  </div>
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: "0 0 4px", lineHeight: 1.3 }}>{a.title}</h3>
                  <p style={{ fontSize: 11, color: C.sub, margin: "0 0 6px", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{a.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10, color: C.muted }}><Clock size={10} /> {a.readTime}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10, fontWeight: 700, color: isRead ? C.muted : C.purple }}><Star size={10} /> +{a.points}</span>
                    <button onClick={(e) => { e.stopPropagation(); setLiked((p: any) => ({ ...p, [a.id]: !p[a.id] })) }} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 3, fontSize: 10, fontWeight: 600, color: il ? C.coral : C.muted, padding: 0 }}>
                      <Heart size={12} fill={il ? C.coral : "none"} color={il ? C.coral : C.muted} strokeWidth={1.8} /> {a.likes + (il ? 1 : 0)}
                    </button>
                  </div>
                </div>
                <ChevronRight size={14} color={C.light} style={{ flexShrink: 0, alignSelf: "center" }} />
              </div>
            </Cd>
          );
        })}
      </div>

      {/* Search Modal */}
      {searchOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: C.bg, display: "flex", flexDirection: "column", animation: "fi .15s" }}>
          <div style={{ padding: `18px ${P}px 0`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: 18, fontWeight: 900, color: C.text, margin: 0 }}>Suchen</h2>
            <button onClick={() => { setSearchOpen(false); setSearchQ("") }} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={18} color={C.sub} /></button>
          </div>
          <div style={{ padding: P, flex: 1, overflowY: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 12, background: C.soft, marginBottom: 16 }}>
              <Search size={15} color={C.muted} />
              <input autoFocus value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Artikel suchen..." style={{ flex: 1, border: "none", background: "none", outline: "none", fontSize: 13, color: C.text, fontFamily: "inherit" }} />
            </div>
            {searchQ.trim() ? (
              searched.length > 0 ? searched.map(a => (
                <Cd key={a.id} onClick={() => { setDetail(a); setSearchOpen(false); setSearchQ("") }} style={{ marginBottom: 8, padding: 12, cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", background: topicColor(a.category), padding: "2px 6px", borderRadius: 4 }}>{a.category}</span>
                    <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", background: contentTypeColor(a.type), padding: "2px 6px", borderRadius: 4 }}>{a.type}</span>
                  </div>
                  <h3 style={{ fontSize: 12, fontWeight: 700, color: C.text, margin: "4px 0 2px" }}>{a.title}</h3>
                  <p style={{ fontSize: 11, color: C.muted, margin: 0 }}>{a.readTime} · +{a.points} pts</p>
                </Cd>
              )) : <p style={{ textAlign: "center", color: C.muted, padding: 28 }}>Keine Ergebnisse</p>
            ) : <p style={{ textAlign: "center", color: C.light, padding: 36 }}>Suche nach Artikeln, Guides & Tutorials</p>}
          </div>
        </div>
      )}
    </div>
  );
}
