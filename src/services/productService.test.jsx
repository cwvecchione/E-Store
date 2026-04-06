import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getProductList } from "./productService";

const MOCK_SERVER_URL = "http://localhost:3000";

describe("getProductList", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_SERVER_URL", MOCK_SERVER_URL);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it("fetches from /products with no query string", async () => {
    const mockData = [{ id: 1, name: "Product A" }];
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    });

    await getProductList();

    expect(global.fetch).toHaveBeenCalledWith(`${MOCK_SERVER_URL}/products`);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("returns parsed JSON data on success", async () => {
    const mockData = [
      { id: 1, name: "Book One", price: 9.99 },
      { id: 2, name: "Book Two", price: 14.99 },
    ];
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    });

    const result = await getProductList();

    expect(result).toEqual(mockData);
  });

  it("returns an empty array when API returns empty array", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([]),
    });

    const result = await getProductList();

    expect(result).toEqual([]);
  });

  it("throws an object with message and status when response is not ok", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: "Not Found",
      status: 404,
    });

    await expect(getProductList()).rejects.toMatchObject({
      message: "Not Found",
      status: 404,
    });
  });

  it("throws with correct status for 500 Internal Server Error", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: "Internal Server Error",
      status: 500,
    });

    await expect(getProductList()).rejects.toMatchObject({
      message: "Internal Server Error",
      status: 500,
    });
  });

  it("propagates network errors when fetch itself rejects", async () => {
    const networkError = new Error("Network request failed");
    global.fetch = vi.fn().mockRejectedValue(networkError);

    await expect(getProductList()).rejects.toThrow("Network request failed");
  });

  it("does not append any query parameters to the URL", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([]),
    });

    await getProductList();

    const calledUrl = global.fetch.mock.calls[0][0];
    expect(calledUrl).not.toContain("?");
    expect(calledUrl).not.toContain("name_like");
  });
});