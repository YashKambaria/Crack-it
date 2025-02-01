import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Task() {
  const [stressFactors, setStressFactors] = useState({
    work: 0,
    family: 0,
    health: 0,
    social: 0,
    personal: 0,
    appetite: 0,
    relaxing: 0,
    friends: 0,
    support: 0,
  });

  const handleChange = (e) => {
    setStressFactors({
      ...stressFactors,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert data to an array for easy backend processing
    const stressDataArray = Object.values(stressFactors);

    console.log("Stress Data Array Submitted:", stressDataArray);

    try {
      const response = await fetch("http://localhost:5000/api/generate-timetable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stressData: stressDataArray }),
      });

      const data = await response.json();
      console.log("Response from server:", data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="d-flex home_page_container" style={{ flexDirection: "column" }}>
      <DashboardSidebar />
      <h1 style={{ width: "100%", paddingLeft: "20px" }} className="text-primary">
        Task Manager - Stress Level Inputs
      </h1>

      <div className="container mt-4">
        <form onSubmit={handleSubmit} className="mx-auto w-75">
          <div className="row">
            {[
              { id: "work", label: "Anxiety Level (1-10)" },
              { id: "family", label: "Overburdened Feeling (1-10)" },
              { id: "health", label: "Irritated/Frustrated Level (1-10)" },
              { id: "social", label: "Motivation Level (1-10)" },
              { id: "personal", label: "Sleep Time (Hrs)" },
              { id: "appetite", label: "Appetite Quality (1-10)" },
              { id: "relaxing", label: "Relaxing Activities / Day (0-10)" },
              { id: "friends", label: "No. of Close Friends" },
              { id: "support", label: "No. of Supportive Friends/Family" },
            ].map((input) => (
              <div key={input.id} className="mb-3 col-md-6 col-lg-4">
                <label htmlFor={input.id} className="form-label">
                  {input.label}
                </label>
                <input
                  type="number"
                  id={input.id}
                  name={input.id}
                  className="form-control w-75"
                  value={stressFactors[input.id]}
                  onChange={handleChange}
                  min="0"
                  max="10"
                />
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Submit Stress Data
          </button>
        </form>

        <p className="mt-3 text-center">
          <Link to="/dashboard">Go to Dashboard</Link> to view your stress chart.
        </p>
      </div>
    </div>
  );
}
