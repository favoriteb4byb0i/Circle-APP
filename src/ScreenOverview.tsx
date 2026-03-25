import { useState } from "react";
import { C, globalCss } from "./constants";
import { Nav } from "./components";
import { Onboarding, NotifPanel } from "./screens";
import { Home, Earn, Couple, Educational, CreatorsScreen, Profile, Referral } from "./pages";

function ScreenFrame({ label, children, highlight }: { label: string; children: React.ReactNode; highlight?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div style={{
        fontSize: 13, fontWeight: 800, color: highlight || "#452861",
        textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "'Plus Jakarta Sans', sans-serif"
      }}>{label}</div>
      <div style={{
        width: 430, height: 932, overflow: "hidden", borderRadius: 40,
        border: `3px solid ${highlight || "#E0DDD8"}`, background: C.bg,
        position: "relative", boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
        fontFamily: "'Plus Jakarta Sans',-apple-system,sans-serif"
      }}>
        <style>{globalCss}</style>
        {children}
      </div>
    </div>
  );
}

export default function ScreenOverview() {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#1A1A2E",
      padding: "60px 40px",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <h1 style={{ fontSize: 42, fontWeight: 900, color: "#fff", margin: "0 0 8px", letterSpacing: -1 }}>
          Circle App — Screen Overview
        </h1>
        <p style={{ fontSize: 16, color: "#A8A8B8", margin: 0 }}>
          10 Screens · 430×932 · Mobile-First · Plus Jakarta Sans
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 20 }}>
          {[
            { label: "Purple #452861", color: "#452861" },
            { label: "Coral #E87C6C", color: "#E87C6C" },
            { label: "Gold #D4A840", color: "#D4A840" },
            { label: "BG #FAFAF8", color: "#FAFAF8" },
            { label: "Text #1A1A2E", color: "#1A1A2E" },
          ].map(c => (
            <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 16, height: 16, borderRadius: 4, background: c.color, border: "1px solid rgba(255,255,255,0.2)" }} />
              <span style={{ fontSize: 11, color: "#888", fontWeight: 600 }}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 1: Onboarding + Main Screens */}
      <div style={{ marginBottom: 30, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <h2 style={{ color: "#D4A840", fontSize: 14, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, marginBottom: 24, textAlign: "center" }}>
          Onboarding & Core Screens
        </h2>
        <div style={{ display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap" }}>
          <ScreenFrame label="1. Onboarding" highlight="#D4A840">
            <Onboarding onDone={() => {}} />
          </ScreenFrame>

          <ScreenFrame label="2. Home" highlight="#452861">
            <div style={{ maxWidth: 430, background: C.bg, minHeight: "100%", position: "relative" }}>
              <Home points={320} go={() => {}} onNotif={() => {}} unreadCount={3} />
              <Nav active="home" go={() => {}} />
            </div>
          </ScreenFrame>

          <ScreenFrame label="3. Earn" highlight="#D4A840">
            <div style={{ maxWidth: 430, background: C.bg, minHeight: "100%", position: "relative" }}>
              <Earn points={320} addPoints={() => {}} />
              <Nav active="earn" go={() => {}} />
            </div>
          </ScreenFrame>

          <ScreenFrame label="4. Couple" highlight="#E87C6C">
            <div style={{ maxWidth: 430, background: C.bg, minHeight: "100%", position: "relative" }}>
              <Couple />
              <Nav active="couple" go={() => {}} />
            </div>
          </ScreenFrame>
        </div>
      </div>

      {/* Row 2: Content & Social */}
      <div style={{ marginBottom: 30, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <h2 style={{ color: "#D4A840", fontSize: 14, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, marginBottom: 24, textAlign: "center" }}>
          Content & Social
        </h2>
        <div style={{ display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap" }}>
          <ScreenFrame label="5. Educational Hub" highlight="#452861">
            <div style={{ maxWidth: 430, background: C.bg, minHeight: "100%", position: "relative" }}>
              <Educational points={320} addPoints={() => {}} />
              <Nav active="educational" go={() => {}} />
            </div>
          </ScreenFrame>

          <ScreenFrame label="6. Creators" highlight="#452861">
            <div style={{ maxWidth: 430, background: C.bg, minHeight: "100%", position: "relative" }}>
              <CreatorsScreen />
              <Nav active="creators" go={() => {}} />
            </div>
          </ScreenFrame>

          <ScreenFrame label="7. Notifications" highlight="#E87C6C">
            <div style={{ maxWidth: 430, background: C.bg, minHeight: "100%", position: "relative" }}>
              <NotifPanel open={true} onClose={() => {}} onNav={() => {}} />
            </div>
          </ScreenFrame>
        </div>
      </div>

      {/* Row 3: Profile & Utility */}
      <div style={{ marginBottom: 60 }}>
        <h2 style={{ color: "#D4A840", fontSize: 14, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, marginBottom: 24, textAlign: "center" }}>
          Profile & Utility
        </h2>
        <div style={{ display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap" }}>
          <ScreenFrame label="8. Profile" highlight="#452861">
            <div style={{ maxWidth: 430, background: C.bg, minHeight: "100%", position: "relative" }}>
              <Profile points={320} onReferral={() => {}} />
              <Nav active="profile" go={() => {}} />
            </div>
          </ScreenFrame>

          <ScreenFrame label="9. Referral" highlight="#D4A840">
            <div style={{ maxWidth: 430, background: C.bg, minHeight: "100%", position: "relative" }}>
              <Referral onBack={() => {}} />
            </div>
          </ScreenFrame>

          <ScreenFrame label="10. Product Detail">
            <div style={{ maxWidth: 430, background: C.bg, minHeight: "100%", position: "relative" }}>
              <Earn points={320} addPoints={() => {}} />
              <Nav active="earn" go={() => {}} />
            </div>
          </ScreenFrame>
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "20px 0 40px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <p style={{ color: "#6B6B7B", fontSize: 12 }}>
          Circle App · Figma Screen Overview · Generated by Claude Code
        </p>
      </div>
    </div>
  );
}
