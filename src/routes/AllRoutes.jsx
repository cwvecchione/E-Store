import { Routes, Route } from "react-router-dom";
import { HomePage, ProductsList, ProductDetail, CartPage, OrderPage, DashboardPage, PageNotFound, PageIsLoading } from "../pages";
import { ProtectedRoute } from "./ProtectedRoute";

export const AllRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="products" element={<ProductsList />} />
        <Route path="products/:id" element={<ProductDetail />} />

        <Route path="login" element={<PageIsLoading/>} />
        <Route path="register" element={<PageIsLoading />} />

        <Route path="cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="order-summary" element={<ProtectedRoute><OrderPage /></ProtectedRoute>} />
        <Route path="dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

        <Route path="*" element={<PageNotFound />} />
    </Routes>
    </>
  )
}
