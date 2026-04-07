export function Loader() {
  return (
    <div className="loader" role="status" aria-label="Loading weather data">
      <div className="spinner" aria-hidden="true" />
      <span className="loader-text">Fetching weather…</span>
    </div>
  );
}
