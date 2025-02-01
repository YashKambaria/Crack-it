import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import SettingsPage from "./components/SettingsPage";
import Task from "./components/Task";

function HealthCheck() {
  const [message, setMessage] = useState("Checking backend...");

  useEffect(() => {
    fetch("http://localhost:8080/health-check")
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.text();
      })
      .then((data) => setMessage(data))
      .catch((error) => {
        console.error("Fetch error:", error);
        setMessage("Error connecting to backend!");
      });
  }, []);

  return <h1>{message}</h1>; // Display backend message
}

function App() {
  return (
    <Router>
      <div className="page_container_parent my-5">
        <Routes>
          <Route path="/" element={<HealthCheck />} />
          {/* Protect the dashboard route */}
          <Route
            path="/dashboard"
            element={
              // <ProtectedRoute>
                <Dashboard />
              // </ProtectedRoute>
            }
          />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/task" element={<Task />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;