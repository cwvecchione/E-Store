import { Navigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
+import { PageIsLoading } from "../pages";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  
+  if (isLoading) return <PageIsLoading />;
  
  return isAuthenticated ? children : <Navigate to="/" />;
}