import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth0 } from '@auth0/auth0-react';

export const ProtectedRoute = ({children}) => {
  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };
    //const token = JSON.parse(sessionStorage.getItem("token"));

    //return token ? children : <Navigate to="/login" />

    const { isAuthenticated } = useAuth0();
    
    return isAuthenticated ? children : <Navigate to="/dashboard" />;
}
