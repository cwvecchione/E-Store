import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { FilterProvider } from "../../context/FilterContext";
import { ProductsList } from "./ProductsList";

// Mock the service
vi.mock("../../services", () => ({
  getProductList: vi.fn(),
}));

// Mock useTitle to be a no-op
vi.mock("../../hooks/useTitle", () => ({
  useTitle: vi.fn(),
}));

// Mock toast to capture error calls
vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
  },
}));

// Mock child components to keep tests focused on ProductsList logic
vi.mock("../../components", () => ({
  ProductCard: ({ product }) => <div data-testid="product-card">{product.name}</div>,
}));

vi.mock("./components/FilterBar", () => ({
  FilterBar: () => <div data-testid="filter-bar" />,
}));

import { getProductList } from "../../services";
import { toast } from "react-toastify";

function renderProductsList(searchQuery = "") {
  const initialPath = searchQuery ? `/products?q=${searchQuery}` : "/products";
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route
          path="/products"
          element={
            <FilterProvider>
              <ProductsList />
            </FilterProvider>
          }
        />
      </Routes>
    </MemoryRouter>
  );
}

describe("ProductsList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("data normalization", () => {
    it("renders products when API returns a plain array", async () => {
      const products = [
        { id: 1, name: "Book A", price: 9.99, in_stock: true, best_seller: false, rating: 4 },
        { id: 2, name: "Book B", price: 14.99, in_stock: true, best_seller: false, rating: 3 },
      ];
      getProductList.mockResolvedValue(products);

      renderProductsList();

      await waitFor(() => {
        expect(screen.getAllByTestId("product-card")).toHaveLength(2);
      });
      expect(screen.getByText("Book A")).toBeInTheDocument();
      expect(screen.getByText("Book B")).toBeInTheDocument();
    });

    it("renders products when API returns { products: [...] } object shape", async () => {
      const products = [
        { id: 1, name: "Book X", price: 5.0, in_stock: true, best_seller: false, rating: 5 },
      ];
      getProductList.mockResolvedValue({ products });

      renderProductsList();

      await waitFor(() => {
        expect(screen.getByText("Book X")).toBeInTheDocument();
      });
    });

    it("renders zero products when API returns unexpected shape (no array)", async () => {
      getProductList.mockResolvedValue({ data: "unexpected" });

      renderProductsList();

      await waitFor(() => {
        expect(screen.getByText("All eBooks (0)")).toBeInTheDocument();
      });
      expect(screen.queryByTestId("product-card")).not.toBeInTheDocument();
    });

    it("renders zero products when API returns null", async () => {
      getProductList.mockResolvedValue(null);

      renderProductsList();

      await waitFor(() => {
        expect(screen.getByText("All eBooks (0)")).toBeInTheDocument();
      });
    });

    it("renders zero products when API returns empty array", async () => {
      getProductList.mockResolvedValue([]);

      renderProductsList();

      await waitFor(() => {
        expect(screen.getByText("All eBooks (0)")).toBeInTheDocument();
      });
    });
  });

  describe("getProductList is called without arguments", () => {
    it("calls getProductList with no arguments", async () => {
      getProductList.mockResolvedValue([]);

      renderProductsList();

      await waitFor(() => {
        expect(getProductList).toHaveBeenCalledWith();
      });
      expect(getProductList).toHaveBeenCalledTimes(1);
    });
  });

  describe("client-side filtering by searchTerm", () => {
    it("shows all products when no searchTerm is present", async () => {
      const products = [
        { id: 1, name: "React Guide", price: 9.99, in_stock: true, best_seller: false, rating: 4 },
        { id: 2, name: "Node.js Handbook", price: 12.99, in_stock: true, best_seller: false, rating: 3 },
      ];
      getProductList.mockResolvedValue(products);

      renderProductsList();

      await waitFor(() => {
        expect(screen.getAllByTestId("product-card")).toHaveLength(2);
      });
    });

    it("filters products by searchTerm (case-insensitive)", async () => {
      const products = [
        { id: 1, name: "React Guide", price: 9.99, in_stock: true, best_seller: false, rating: 4 },
        { id: 2, name: "Node.js Handbook", price: 12.99, in_stock: true, best_seller: false, rating: 3 },
        { id: 3, name: "Advanced React Patterns", price: 19.99, in_stock: true, best_seller: false, rating: 5 },
      ];
      getProductList.mockResolvedValue(products);

      renderProductsList("react");

      await waitFor(() => {
        expect(screen.getAllByTestId("product-card")).toHaveLength(2);
      });
      expect(screen.getByText("React Guide")).toBeInTheDocument();
      expect(screen.getByText("Advanced React Patterns")).toBeInTheDocument();
      expect(screen.queryByText("Node.js Handbook")).not.toBeInTheDocument();
    });

    it("filtering is case-insensitive (uppercase searchTerm matches lowercase name)", async () => {
      const products = [
        { id: 1, name: "javascript basics", price: 9.99, in_stock: true, best_seller: false, rating: 3 },
        { id: 2, name: "Python cookbook", price: 11.99, in_stock: true, best_seller: false, rating: 4 },
      ];
      getProductList.mockResolvedValue(products);

      renderProductsList("JAVASCRIPT");

      await waitFor(() => {
        expect(screen.getAllByTestId("product-card")).toHaveLength(1);
      });
      expect(screen.getByText("javascript basics")).toBeInTheDocument();
    });

    it("returns no products when searchTerm matches nothing", async () => {
      const products = [
        { id: 1, name: "React Guide", price: 9.99, in_stock: true, best_seller: false, rating: 4 },
        { id: 2, name: "Node.js Handbook", price: 12.99, in_stock: true, best_seller: false, rating: 3 },
      ];
      getProductList.mockResolvedValue(products);

      renderProductsList("nonexistentterm12345");

      await waitFor(() => {
        expect(screen.getByText("All eBooks (0)")).toBeInTheDocument();
      });
      expect(screen.queryByTestId("product-card")).not.toBeInTheDocument();
    });

    it("shows a single matching product when searchTerm is a partial match", async () => {
      const products = [
        { id: 1, name: "TypeScript Deep Dive", price: 15.0, in_stock: true, best_seller: false, rating: 5 },
        { id: 2, name: "JavaScript Allongé", price: 10.0, in_stock: true, best_seller: false, rating: 4 },
      ];
      getProductList.mockResolvedValue(products);

      renderProductsList("typescript");

      await waitFor(() => {
        expect(screen.getAllByTestId("product-card")).toHaveLength(1);
      });
      expect(screen.getByText("TypeScript Deep Dive")).toBeInTheDocument();
    });
  });

  describe("error handling", () => {
    it("calls toast.error with the error message when getProductList throws", async () => {
      const errorMessage = "Service Unavailable";
      getProductList.mockRejectedValue({ message: errorMessage, status: 503 });

      renderProductsList();

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
          errorMessage,
          expect.objectContaining({ closeButton: true, position: "bottom-center" })
        );
      });
    });

    it("does not render any product cards when fetch fails", async () => {
      getProductList.mockRejectedValue({ message: "Not Found", status: 404 });

      renderProductsList();

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalled();
      });
      expect(screen.queryByTestId("product-card")).not.toBeInTheDocument();
    });
  });

  describe("product count display", () => {
    it("shows the correct count of displayed products", async () => {
      const products = [
        { id: 1, name: "Book One", price: 5.0, in_stock: true, best_seller: false, rating: 4 },
        { id: 2, name: "Book Two", price: 7.0, in_stock: true, best_seller: false, rating: 3 },
        { id: 3, name: "Book Three", price: 9.0, in_stock: true, best_seller: false, rating: 5 },
      ];
      getProductList.mockResolvedValue(products);

      renderProductsList();

      await waitFor(() => {
        expect(screen.getByText("All eBooks (3)")).toBeInTheDocument();
      });
    });

    it("shows filtered count when searchTerm is applied", async () => {
      const products = [
        { id: 1, name: "React Intro", price: 5.0, in_stock: true, best_seller: false, rating: 4 },
        { id: 2, name: "Vue Guide", price: 7.0, in_stock: true, best_seller: false, rating: 3 },
      ];
      getProductList.mockResolvedValue(products);

      renderProductsList("vue");

      await waitFor(() => {
        expect(screen.getByText("All eBooks (1)")).toBeInTheDocument();
      });
    });
  });
});