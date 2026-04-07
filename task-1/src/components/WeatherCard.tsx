import type { WeatherData } from "../hooks/useWeather";

interface Props {
  data: WeatherData;
}

export function WeatherCard({ data }: Props) {
  return (
    <div className="weather-card" role="region" aria-label="Weather result">
      <div className="weather-emoji" aria-hidden="true">
        {data.emoji}
      </div>
      <h2 className="weather-city">
        {data.city}
        <span className="weather-country">, {data.country}</span>
      </h2>
      <div
        className="weather-temp"
        aria-label={`Temperature: ${data.temperature} degrees Celsius`}
      >
        {data.temperature}°C
      </div>
      <div className="weather-description">{data.description}</div>
    </div>
  );
}
