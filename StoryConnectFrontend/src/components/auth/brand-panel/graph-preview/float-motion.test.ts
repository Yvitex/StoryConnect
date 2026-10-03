import { describe, expect, it } from "vitest";
import { EASE_IN_SECONDS, floatX, floatY } from "./float-motion";

const config = { duration: 8, delay: -3, x: 3, y: 6 };

describe("float motion", () => {
  it("floatXY_atStart_isAtRest", () => {
    expect(floatX(config, 0)).toBeCloseTo(0);
    expect(floatY(config, 0)).toBeCloseTo(0);
  });

  it("floatXY_overTime_staysWithinAmplitude", () => {
    for (let seconds = 0; seconds < 60; seconds += 0.25) {
      expect(Math.abs(floatX(config, seconds))).toBeLessThanOrEqual(config.x);
      expect(Math.abs(floatY(config, seconds))).toBeLessThanOrEqual(config.y);
    }
  });

  it("floatY_afterEaseIn_actuallyMoves", () => {
    const samples = [0, 1, 2, 3, 4].map((offset) =>
      floatY(config, EASE_IN_SECONDS + offset),
    );

    expect(Math.max(...samples) - Math.min(...samples)).toBeGreaterThan(1);
  });

  it("floatY_differentDelay_differsFromOtherItem", () => {
    const other = { ...config, delay: -1 };

    expect(floatY(config, 5)).not.toBe(floatY(other, 5));
  });
});
