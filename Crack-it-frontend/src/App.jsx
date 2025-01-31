import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";



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
      <div className="container my-5">
        <Routes>
          {/* Use the HealthCheck component for the "/" route */}
          <Route path="/" element={<HealthCheck />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>404 Not Found</h1>} /> {/* Catch all invalid routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;