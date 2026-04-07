import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Loader } from "../components/Loader";

describe("Loader", () => {
  it("renders with an accessible status role", () => {
    render(<Loader />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("displays the loading text", () => {
    render(<Loader />);
    expect(screen.getByText(/fetching weather/i)).toBeInTheDocument();
  });
});
