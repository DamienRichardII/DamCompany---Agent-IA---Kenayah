import type { Config } from "tailwindcss";
import { tokens } from "./src/design/tokens";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ...tokens.color },
      fontFamily: { sans: ["Geist", "Inter", "system-ui", "sans-serif"] },
      borderRadius: { card: "16px" },
      boxShadow: { card: "0 1px 0 rgba(10,10,10,.04), 0 8px 24px -12px rgba(10,10,10,.12)" },
    },
  },
  plugins: [],
};
export default config;
