import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const mockGeoResponse = {
  results: [
    {
      name: "London",
      country: "United Kingdom",
      latitude: 51.51,
      longitude: -0.13,
    },
  ],
};

const mockWeatherResponse = {
  current: { temperature_2m: 14, weather_code: 2 },
};

function createFetchMock(geoData: unknown, weatherData: unknown) {
  let callCount = 0;
  return vi.fn(() => {
    callCount++;
    const data = callCount === 1 ? geoData : weatherData;
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(data),
    });
  });
}

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("App – weather search integration", () => {
  it("shows weather card after a successful search", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      createFetchMock(mockGeoResponse, mockWeatherResponse),
    );

    render(<App />);

    await user.type(screen.getByRole("textbox"), "London");
    await user.click(screen.getByRole("button", { name: /search weather/i }));

    await waitFor(() => {
      expect(screen.getByText("London")).toBeInTheDocument();
    });
    expect(screen.getByText("14°C")).toBeInTheDocument();
    expect(screen.getByText("Partly cloudy")).toBeInTheDocument();
  });

  it("shows an error message when city is not found", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ results: [] }),
        }),
      ),
    );

    render(<App />);

    await user.type(screen.getByRole("textbox"), "ZZZunknown");
    await user.click(screen.getByRole("button", { name: /search weather/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
    expect(screen.getByRole("alert")).toHaveTextContent(/not found/i);
  });
});
