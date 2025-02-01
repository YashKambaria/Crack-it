import React from "react";
import DashboardSidebar from "./DashboardSidebar";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import SettingsPage from "./SettingsPage";

export default function Dashboard() {
  return (
    <div className="d-flex">
      {/* Sidebar (Sticks to the left, takes full height) */}
        <DashboardSidebar />

      {/* Main Content Area */}
        <HomePage/>
    </div>
  );
}
