export const colorScheme = {
  green: "#16c426",
  softGreen: "#48c558",
  gray: "#3C3C3B",
  offWhite: "#EBF4F8",
};

export const light = {
  dark: false,
  background: "#F3F7F4",
  surface: "#FFFFFF",
  surfaceAlt: "#E7F0EA",
  titles: "#1E2B24",
  text: "#FFFFFF",
  textMuted: "#5C6D64",
  textAccent: "#1E2B24",
  inverse: "#1E2B24",
  accent: "#129E28",
  softAccent: "#1DB954",
  border: "rgba(30, 43, 36, 0.12)",
  overlay: "rgba(243, 247, 244, 0.78)",
  navBg: "rgba(243, 247, 244, 0.92)",
  bookmark: "#1DB954",
  bookmarkActive: "#0F8A2A",
  bookmarkText: "#FFFFFF",
  heroOverlay: "rgba(15, 28, 20, 0.62)",
  shadow: "0 10px 30px rgba(30, 43, 36, 0.08)",
};

export const dark = {
  dark: true,
  background: "#2B2B2A",
  surface: "#353534",
  surfaceAlt: "#3C3C3B",
  titles: "#EBF4F8",
  text: "#2B2B2A",
  textMuted: "#A9B6AE",
  textAccent: "#EBF4F8",
  inverse: "#EBF4F8",
  accent: "#16c426",
  softAccent: "#48c558",
  border: "rgba(235, 244, 248, 0.14)",
  overlay: "rgba(0, 0, 0, 0.72)",
  navBg: "rgba(43, 43, 42, 0.92)",
  bookmark: "#48c558",
  bookmarkActive: "#16c426",
  bookmarkText: "#152018",
  heroOverlay: "rgba(0, 0, 0, 0.78)",
  shadow: "0 12px 32px rgba(0, 0, 0, 0.28)",
};

const themes = {
  light,
  dark,
};

export default function getTheme(theme) {
  return themes[theme];
}
