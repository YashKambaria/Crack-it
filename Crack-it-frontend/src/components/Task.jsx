import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

export default function Task() {
  const [stressFactors, setStressFactors] = useState({
    work: 0,
    family: 0,
    health: 0,
    social: 0,
    personal: 0,
  });

  const handleChange = (e) => {
    setStressFactors({
      ...stressFactors,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you could save the data or pass it to the chart generation
    console.log("Stress Data Submitted: ", stressFactors);
    // Proceed to chart or next step with the data
  };

  return (
    <div className="d-flex home_page_container" style={{ flexDirection: 'column' }}>
      <DashboardSidebar />
      {/* Main Content Area */}
      <h1 style={{ width: '100%', paddingLeft: '20px' }} className="text-primary">
        Task Manager - Stress Level Inputs
      </h1>
      
      <div className="container mt-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="work" className="form-label">
              Anxiety Level (1-10)
            </label>
            <input
              type="number"
              id="work"
              name="work"
              className="form-control"
              value={stressFactors.work}
              onChange={handleChange}
              min="0"
              max="10"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="family" className="form-label">
                Overburdened Feeling (1-10)
            </label>
            <input
              type="number"
              id="family"
              name="family"
              className="form-control"
              value={stressFactors.family}
              onChange={handleChange}
              min="0"
              max="10"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="health" className="form-label">
              Irritated/Frustrated Level (1-10)
            </label>
            <input
              type="number"
              id="health"
              name="health"
              className="form-control"
              value={stressFactors.health}
              onChange={handleChange}
              min="0"
              max="10"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="social" className="form-label">
              Motivation Level (1-10)
            </label>
            <input
              type="number"
              id="social"
              name="social"
              className="form-control"
              value={stressFactors.social}
              onChange={handleChange}
              min="0"
              max="10"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="personal" className="form-label">
              Sleep Time (Hrs)
            </label>
            <input
              type="number"
              id="personal"
              name="personal"
              className="form-control"
              value={stressFactors.personal}
              onChange={handleChange}
              min="0"
              max="10"   
            />
          </div>
          <div className="mb-3">
            <label htmlFor="personal" className="form-label">
              Appetite Quality of food you consume (1-10)
            </label>
            <input
              type="number"
              id="personal"
              name="personal"
              className="form-control"
              value={stressFactors.personal}
              onChange={handleChange}
              min="0"
              max="10"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="personal" className="form-label">
              Relaxing Acitivties / Day (0-10)
            </label>
            <input
              type="number"
              id="personal"
              name="personal"
              className="form-control"
              value={stressFactors.personal}
              onChange={handleChange}
              min="0"
              max="10"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="personal" className="form-label">
              No. of close Friends you have
            </label>
            <input
              type="number"
              id="personal"
              name="personal"
              className="form-control"
              value={stressFactors.personal}
              onChange={handleChange}
              min="0"
              max="10"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="personal" className="form-label">
              No. of supportive friends and family members
            </label>
            <input
              type="number"
              id="personal"
              name="personal"
              className="form-control"
              value={stressFactors.personal}
              onChange={handleChange}
              min="0"
              max="10"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Stress Data
          </button>
        </form>

        <p className="mt-3">
          <Link to="/dashboard">Go to Dashboard</Link> to view your stress chart
        </p>
      </div>
    </div>
  );
}
