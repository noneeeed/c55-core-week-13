import { useState, type FormEvent, type KeyboardEvent } from "react";

interface Props {
  onSearch: (city: string) => void;
  loading: boolean;
}

export function SearchBar({ onSearch, loading }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSearch(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) onSearch(value);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <input
        type="text"
        className="search-input"
        placeholder="Enter city name..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="City name"
        disabled={loading}
        autoFocus
      />
      <button
        type="submit"
        className="search-button"
        disabled={loading || !value.trim()}
        aria-label="Search weather"
      >
        {loading ? "Searching…" : "Search"}
      </button>
    </form>
  );
}
