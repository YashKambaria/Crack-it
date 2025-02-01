import { useState, useEffect } from "react";

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

  return <h1>{message}</h1>; // Display the backend status message
}

export default HealthCheck;