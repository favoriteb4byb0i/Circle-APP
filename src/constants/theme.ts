export const C = {
  bg: "#FAFAF8",
  card: "#FFFFFF",
  soft: "#F4F3F0",
  border: "rgba(0,0,0,0.04)",
  text: "#1A1A2E",
  sub: "#6B6B7B",
  muted: "#A8A8B8",
  light: "#D0D0DA",
  purple: "#452861",
  coral: "#E87C6C",
  gold: "#D4A840",
  sh: "0 1px 3px rgba(0,0,0,0.04)",
};

export const P = 18;

export const globalCss = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}body{background:${C.bg}}::-webkit-scrollbar{width:0;height:0}@keyframes fi{from{opacity:0}to{opacity:1}}@keyframes pop{from{transform:scale(.7);opacity:0}to{transform:scale(1);opacity:1}}input::placeholder,textarea::placeholder{color:${C.muted}}`;
