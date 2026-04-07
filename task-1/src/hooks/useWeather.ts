import { useState } from "react";
import { getWeatherDescription, getWeatherEmoji } from "../utils/weatherCode";

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  description: string;
  emoji: string;
}

interface GeoResult {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface GeoResponse {
  results?: GeoResult[];
}

interface WeatherResponse {
  current: {
    temperature_2m: number;
    weather_code: number;
  };
}

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    const trimmed = city.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=1&language=en&format=json`;
      const geoRes = await fetch(geoUrl);
      if (!geoRes.ok) throw new Error("Failed to reach geocoding service");
      const geoData: GeoResponse = await geoRes.json();

      if (!geoData.results?.length) {
        setError(`City "${trimmed}" not found. Try a different name.`);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`;
      const weatherRes = await fetch(weatherUrl);
      if (!weatherRes.ok) throw new Error("Failed to reach weather service");
      const weatherData: WeatherResponse = await weatherRes.json();

      const code = weatherData.current.weather_code;
      setWeather({
        city: name,
        country,
        temperature: Math.round(weatherData.current.temperature_2m),
        description: getWeatherDescription(code),
        emoji: getWeatherEmoji(code),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { weather, loading, error, fetchWeather };
}
