import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";  // Import PropTypes for validation
import { getToken, isTokenExpired } from "../utils/jwtUtil"; // Import JWT utility
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      navigate("/login"); // Redirect to login if token is expired or not present
    }
  }, [token, navigate]);  // Dependencies: re-run this effect when token or navigate changes

  // If token is expired or not present, return null to prevent rendering protected content
  if (!token || isTokenExpired(token)) {
    return null;
  }

  return children; // Render the children if the token is valid
}

// PropTypes validation for the 'children' prop
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,  // Validate children as a required prop
};

export default ProtectedRoute;