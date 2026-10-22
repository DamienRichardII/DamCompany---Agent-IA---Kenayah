/* Logo DamCompany. "light" = lettres claires, pour fonds noirs. */
export function DamLogo({ variant = "dark", height = 24, className = "" }: { variant?: "dark" | "light"; height?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={variant === "light" ? "/logo-damcompany-light.png" : "/logo-damcompany.png"} alt="DamCompany" height={height} className={className} style={{ height, width: "auto" }} />
  );
}
