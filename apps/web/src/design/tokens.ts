/** Design tokens KENAYAH AI × DamCompany — source unique des couleurs. */
export const tokens = {
  color: {
    paper: "#F5F4F0",   // blanc cassé du logo DamCompany — fond principal
    ink: "#0A0A0A",     // noir profond — sidebar, titres (~25%)
    volt: "#FEDD58",    // jaune du logo DamCompany (éclair) — actions/actifs
    surface: "#FFFFFF", // cartes
    line: "#E6E4DB",    // séparateurs
    mute: "#777777",    // texte secondaire
  },
} as const;
export type Tokens = typeof tokens;
