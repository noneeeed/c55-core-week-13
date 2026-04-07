import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WeatherCard } from "../components/WeatherCard";
import type { WeatherData } from "../hooks/useWeather";

const mockData: WeatherData = {
  city: "Berlin",
  country: "Germany",
  temperature: 18,
  description: "Partly cloudy",
  emoji: "⛅",
};

describe("WeatherCard", () => {
  it("renders the city and country", () => {
    render(<WeatherCard data={mockData} />);
    expect(screen.getByText("Berlin")).toBeInTheDocument();
    expect(screen.getByText(", Germany")).toBeInTheDocument();
  });

  it("renders the temperature in Celsius", () => {
    render(<WeatherCard data={mockData} />);
    expect(screen.getByText("18°C")).toBeInTheDocument();
  });

  it("renders the weather description", () => {
    render(<WeatherCard data={mockData} />);
    expect(screen.getByText("Partly cloudy")).toBeInTheDocument();
  });

  it("renders the weather emoji", () => {
    render(<WeatherCard data={mockData} />);
    expect(screen.getByText("⛅")).toBeInTheDocument();
  });

  it("has an accessible region label", () => {
    render(<WeatherCard data={mockData} />);
    expect(
      screen.getByRole("region", { name: /weather result/i }),
    ).toBeInTheDocument();
  });
});
