import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Search } from "./Search";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderSearch(setSearchSection = vi.fn()) {
  return render(
    <MemoryRouter>
      <Search setSearchSection={setSearchSection} />
    </MemoryRouter>
  );
}

describe("Search component", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it("renders the search input and submit button", () => {
    renderSearch();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { type: "submit" })).toBeInTheDocument();
  });

  it("input is controlled: reflects typed value", async () => {
    renderSearch();
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "react");
    expect(input).toHaveValue("react");
  });

  it("navigates to /products?q= with encoded query on submit", async () => {
    renderSearch();
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "react hooks");
    fireEvent.submit(input.closest("form"));
    expect(mockNavigate).toHaveBeenCalledWith(
      "/products?q=react%20hooks"
    );
  });

  it("calls setSearchSection(false) when a valid query is submitted", async () => {
    const setSearchSection = vi.fn();
    renderSearch(setSearchSection);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "javascript");
    fireEvent.submit(input.closest("form"));
    expect(setSearchSection).toHaveBeenCalledWith(false);
  });

  it("resets the input to empty string after successful submit", async () => {
    renderSearch();
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "testing");
    fireEvent.submit(input.closest("form"));
    expect(input).toHaveValue("");
  });

  it("does not navigate when query is empty string", async () => {
    renderSearch();
    const input = screen.getByRole("textbox");
    fireEvent.submit(input.closest("form"));
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("does not call setSearchSection when query is empty", async () => {
    const setSearchSection = vi.fn();
    renderSearch(setSearchSection);
    const input = screen.getByRole("textbox");
    fireEvent.submit(input.closest("form"));
    expect(setSearchSection).not.toHaveBeenCalled();
  });

  it("trims whitespace-only input and does not navigate", async () => {
    renderSearch();
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "   ");
    fireEvent.submit(input.closest("form"));
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("trims leading and trailing whitespace before encoding the query", async () => {
    renderSearch();
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "  clean query  ");
    fireEvent.submit(input.closest("form"));
    expect(mockNavigate).toHaveBeenCalledWith("/products?q=clean%20query");
  });

  it("encodes special characters in the query", async () => {
    renderSearch();
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "C++ & Java");
    fireEvent.submit(input.closest("form"));
    expect(mockNavigate).toHaveBeenCalledWith(
      `/products?q=${encodeURIComponent("C++ & Java")}`
    );
  });

  it("input starts empty (controlled default state)", () => {
    renderSearch();
    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  it("input has placeholder text 'Search'", () => {
    renderSearch();
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("does not navigate more than once per single submit", async () => {
    renderSearch();
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "single");
    fireEvent.submit(input.closest("form"));
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});