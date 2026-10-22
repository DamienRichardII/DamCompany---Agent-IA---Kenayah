import { describe, expect, it } from "vitest";
import { DEFAULT_WEIGHTS, globalScore, sumWeights, tier } from "./scoring";
import { grossToNet, netToGross } from "./salary";
describe("scoring", () => {
  it("poids = 100", () => expect(sumWeights({ ...DEFAULT_WEIGHTS })).toBe(100));
  it("score pondéré", () => expect(globalScore({ competences: 100, missions: 100, localisation: 100, experience: 100, salaire: 100, secteur_avantages: 100 }, { ...DEFAULT_WEIGHTS })).toBe(100));
  it("paliers", () => { expect(tier(90)).toBe("prioritaire"); expect(tier(75)).toBe("intéressante"); expect(tier(50)).toBe("à examiner"); });
});
describe("salaire", () => { it("net ≠ brut", () => { expect(grossToNet(50000)).toBeLessThan(50000); expect(netToGross(40000)).toBeGreaterThan(40000); }); });
