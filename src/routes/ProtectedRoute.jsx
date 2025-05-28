import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export const ProtectedRoute = ({children}) => {
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
    const token = JSON.parse(sessionStorage.getItem("token"));

  return token ? children : <Navigate to="/login" />
}
