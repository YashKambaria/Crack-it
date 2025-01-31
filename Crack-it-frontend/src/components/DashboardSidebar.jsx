import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const DashboardSidebar = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 bg-dark text-white p-3 vh-100" style={{
              width: "250px",
              position: "fixed",
              top: "0",
              left: "0",
              bottom: "0", // To prevent overflow
              height: "100vh", // Ensures it stays full height
            }}>
      {/* Sidebar Header */}
      <Link to="/" className="text-white text-decoration-none">
        <h4 className="text-center">Dashboard</h4>
      </Link>
      <hr />

      {/* Sidebar Links */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/home" className="nav-link text-white">
            <i className="bi bi-house-door me-2"></i> Home
          </Link>
        </li>
        <li>
          <Link to="/profile" className="nav-link text-white">
            <i className="bi bi-person-circle me-2"></i> Profile
          </Link>
        </li>
        <li>
          <Link to="/settings" className="nav-link text-white">
            <i className="bi bi-gear me-2"></i> Task Manager
          </Link>
        </li>
        <li>
          <Link to="/analytics" className="nav-link text-white">
            <i className="bi bi-bar-chart-line me-2"></i> Analytics
          </Link>
        </li>
        <li>
          <Link to="/logout" className="nav-link text-white">
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </Link>
        </li>
      </ul>
      <hr />

      {/* Footer */}
      <div className="text-center">
        <small>© 2025 Your Company</small>
      </div>
    </div>
  );
};

export default DashboardSidebar;
