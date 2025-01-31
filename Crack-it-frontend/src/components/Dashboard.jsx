import React from "react";
import DashboardSidebar from "./DashboardSidebar";

export default function Dashboard() {
  return (
    <div className="d-flex">
      {/* Sidebar (Sticks to the left, takes full height) */}
        <DashboardSidebar />

      {/* Main Content Area */}
      <div
        className="container-fluid"
        style={{
          marginLeft: "250px", // Offset the main content from the sidebar
          paddingTop: "20px", // Add some space from the top
        }}
      >
        <h1>Dashboard Content</h1>
        <p>Welcome to your dashboard! Here you can manage everything.</p>
      </div>
    </div>
  );
}
