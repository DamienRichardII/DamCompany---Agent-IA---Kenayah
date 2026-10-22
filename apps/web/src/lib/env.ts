/** Mode d'exécution. Les données fictives n'existent QU'EN mode "demo". */
export const APP_ENV = (process.env.NEXT_PUBLIC_KENAYAH_ENV ?? "production") as "demo" | "production";
export const isDemo = APP_ENV === "demo";
