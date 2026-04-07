import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "../components/SearchBar";

describe("SearchBar", () => {
  it("renders input and search button", () => {
    render(<SearchBar onSearch={() => {}} loading={false} />);
    expect(
      screen.getByRole("textbox", { name: /city name/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /search weather/i }),
    ).toBeInTheDocument();
  });

  it("calls onSearch with the typed city when form is submitted", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} loading={false} />);

    await user.type(screen.getByRole("textbox"), "Amsterdam");
    await user.click(screen.getByRole("button", { name: /search weather/i }));

    expect(onSearch).toHaveBeenCalledWith("Amsterdam");
  });

  it("disables input and button while loading", () => {
    render(<SearchBar onSearch={() => {}} loading={true} />);
    expect(screen.getByRole("textbox")).toBeDisabled();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("search button is disabled when input is empty", () => {
    render(<SearchBar onSearch={() => {}} loading={false} />);
    expect(
      screen.getByRole("button", { name: /search weather/i }),
    ).toBeDisabled();
  });

  it('shows "Searching…" label on the button while loading', () => {
    render(<SearchBar onSearch={() => {}} loading={true} />);
    expect(screen.getByRole("button")).toHaveTextContent("Searching…");
  });
});
