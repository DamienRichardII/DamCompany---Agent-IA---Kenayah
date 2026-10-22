/** Design tokens KENAYAH AI × DamCompany — source unique des couleurs. */
export const tokens = {
  color: {
    paper: "#F7F6F2",   // blanc cassé — fond principal (~65%)
    ink: "#0A0A0A",     // noir profond — sidebar, titres (~25%)
    volt: "#EFFF00",    // jaune électrique — actions/actifs (~10%)
    surface: "#FFFFFF", // cartes
    line: "#E8E7E2",    // séparateurs
    mute: "#777777",    // texte secondaire
  },
} as const;
export type Tokens = typeof tokens;
