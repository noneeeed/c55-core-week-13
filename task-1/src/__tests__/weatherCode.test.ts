import { describe, it, expect } from "vitest";
import { getWeatherDescription, getWeatherEmoji } from "../utils/weatherCode";

describe("getWeatherDescription", () => {
  it('returns "Clear sky" for code 0', () => {
    expect(getWeatherDescription(0)).toBe("Clear sky");
  });

  it('returns "Moderate rain" for code 63', () => {
    expect(getWeatherDescription(63)).toBe("Moderate rain");
  });

  it('returns "Thunderstorm" for code 95', () => {
    expect(getWeatherDescription(95)).toBe("Thunderstorm");
  });

  it('returns "Unknown" for an unrecognised code', () => {
    expect(getWeatherDescription(999)).toBe("Unknown");
  });
});

describe("getWeatherEmoji", () => {
  it("returns ☀️ for code 0 (clear sky)", () => {
    expect(getWeatherEmoji(0)).toBe("☀️");
  });

  it("returns ⛈️ for code 95 (thunderstorm)", () => {
    expect(getWeatherEmoji(95)).toBe("⛈️");
  });

  it("returns fallback 🌡️ for unknown code", () => {
    expect(getWeatherEmoji(999)).toBe("🌡️");
  });
});
