import { useState } from "react";
import { C, globalCss } from "./constants";
import { Nav } from "./components";
import { Onboarding, NotifPanel } from "./screens";
import { Home, Earn, Couple, Educational, CreatorsScreen, Profile, Referral, Shop } from "./pages";
import { NOTIFS } from "./data";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [points, setPoints] = useState(320);
  const [notifOpen, setNotifOpen] = useState(false);
  const [onboarded, setOnboarded] = useState(false);
  const unreadCount = NOTIFS.filter(n => !n.read).length;

  if (!onboarded) return (
    <div style={{ maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: C.bg, fontFamily: "'Plus Jakarta Sans',-apple-system,sans-serif" }}>
      <style>{globalCss}</style>
      <Onboarding onDone={() => setOnboarded(true)} />
    </div>
  );

  return (
    <div style={{ maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: C.bg, fontFamily: "'Plus Jakarta Sans',-apple-system,sans-serif" }}>
      <style>{globalCss}</style>
      {screen === "home" && <Home points={points} go={setScreen} onNotif={() => setNotifOpen(true)} unreadCount={unreadCount} />}
      {screen === "earn" && <Earn points={points} addPoints={(n: number) => setPoints(p => p + n)} />}
      {screen === "couple" && <Couple />}
      {screen === "educational" && <Educational points={points} addPoints={(n: number) => setPoints(p => p + n)} />}
      {screen === "creators" && <CreatorsScreen />}
      {screen === "events" && <Home points={points} go={setScreen} onNotif={() => setNotifOpen(true)} unreadCount={unreadCount} />}
      {screen === "profile" && <Profile points={points} onReferral={() => setScreen("referral")} />}
      {screen === "referral" && <Referral onBack={() => setScreen("profile")} />}
      {screen === "shop" && <Shop points={points} onBack={() => setScreen("home")} />}
      <Nav active={screen} go={setScreen} />
      <NotifPanel open={notifOpen} onClose={() => setNotifOpen(false)} onNav={setScreen} />
    </div>
  );
}
