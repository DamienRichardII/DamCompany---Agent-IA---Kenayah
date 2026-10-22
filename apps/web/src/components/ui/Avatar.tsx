/* Avatar officiel de KENAYAH (image fournie par DamCompany). */
export function KenayahAvatar({ size = 48, ring = true, className = "" }: { size?: number; ring?: boolean; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/kenayah-avatar.jpg" alt="Kenayah" width={size} height={size}
      className={`rounded-full object-cover ${ring ? "ring-2 ring-volt" : ""} ${className}`} style={{ width: size, height: size }} />
  );
}
