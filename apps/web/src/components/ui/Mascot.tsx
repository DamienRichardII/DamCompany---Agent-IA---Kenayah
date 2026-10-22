/** Mascotte KENAYAH — création originale DamCompany (robot noir, yeux jaunes). */
export function Mascot({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="Kenayah">
      <rect x="30" y="3" width="4" height="9" rx="2" fill="#0A0A0A" /><circle cx="32" cy="4" r="3.5" fill="#EFFF00" stroke="#0A0A0A" strokeWidth="1.5" />
      <rect x="6" y="12" width="52" height="44" rx="20" fill="#0A0A0A" />
      <rect x="13" y="22" width="38" height="24" rx="12" fill="#1c1c1c" />
      <ellipse cx="24" cy="34" rx="4.2" ry="5.5" fill="#EFFF00" /><ellipse cx="40" cy="34" rx="4.2" ry="5.5" fill="#EFFF00" />
      <rect x="1" y="26" width="6" height="14" rx="3" fill="#EFFF00" stroke="#0A0A0A" strokeWidth="1.5" /><rect x="57" y="26" width="6" height="14" rx="3" fill="#EFFF00" stroke="#0A0A0A" strokeWidth="1.5" />
    </svg>
  );
}
