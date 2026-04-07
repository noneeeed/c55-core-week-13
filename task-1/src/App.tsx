import { SearchBar } from "./components/SearchBar";
import { WeatherCard } from "./components/WeatherCard";
import { Loader } from "./components/Loader";
import { useWeather } from "./hooks/useWeather";
import "./App.css";

function App() {
  const { weather, loading, error, fetchWeather } = useWeather();

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🌤 Weather Hero</h1>
        <p className="app-subtitle">Search for current weather in any city</p>
      </header>
      <main className="app-main">
        <SearchBar onSearch={fetchWeather} loading={loading} />
        {loading && <Loader />}
        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}
        {weather && !loading && <WeatherCard data={weather} />}
      </main>
    </div>
  );
}

export default App;
