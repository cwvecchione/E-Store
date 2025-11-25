import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0ProviderWithNavigate } from "./components/Other/auth0-provider-with-navigate";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FilterProvider, CartProvider } from "./context";
import { ScrollToTop } from "./components";
import './index.css';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router future={{v7_relativeSplatPath: true,  v7_startTransition: true,}}>
            <Auth0ProviderWithNavigate>
                <CartProvider>
                    <FilterProvider>
                        <ScrollToTop />
                        <ToastContainer closeButton={false} autoClose={3000} position={"bottom-right"} />
                        <App />
                    </FilterProvider>
                </CartProvider>
            </Auth0ProviderWithNavigate>
        </Router>
    </StrictMode>,
)
