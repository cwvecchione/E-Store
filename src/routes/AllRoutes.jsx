import { Routes, Route } from "react-router-dom";
import { HomePage, ProductsList, ProductDetail, Login, Register, CartPage, OrderPage, DashboardPage, PageNotFound } from "../pages";
import { AuthenticationGuard } from "./components/authentication-guard";


export const AllRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="products" element={<ProductsList />} />
        <Route path="products/:id" element={<ProductDetail />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="cart" element={<AuthenticationGuard><CartPage /></AuthenticationGuard>} />
        <Route path="order-summary" element={<AuthenticationGuard><OrderPage /></AuthenticationGuard>} />
        <Route path="dashboard" element={<AuthenticationGuard><DashboardPage /></AuthenticationGuard>} />

        <Route path="*" element={<PageNotFound />} />
    </Routes>
    </>
  )
}
