import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Routes, Route, Link } from "react-router-dom";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import './HomePage.css';
import DashboardSidebar from "./DashboardSidebar";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const generateRandomData = (length) => {
  const data = [];
  for (let i = 0; i < length; i++) {
    // Random stress value between 0 and 100
    data.push(Math.floor(Math.random() * 101));
  }
  return data;
};

export default function HomePage() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    // Generate random data for stress levels
    const stressLevels = generateRandomData(12); // Assume 12 months or weeks of data

    // Set up the chart data
    setChartData({
      labels: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ], // Time periods for x-axis (e.g., months)
      datasets: [
        {
          label: "Stress Level (%)", // Label for the chart
          data: stressLevels, // Data from the random function
          fill: false, // Do not fill the area under the line
          borderColor: "rgba(255, 99, 132, 1)", // Line color
          tension: 0.4, // Smoothness of the line
        },
      ],
    });
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="d-flex home_page_container dff" style={{flexDirection: 'column'}}>
        <DashboardSidebar />
      {/* Main Content Area */}
      <h1 style={{width: '100%', paddingLeft: '20px'}} className="text-primary">Home</h1>
      <h2>Stress Level Over Time</h2>
      {/* Render chart only when chartData is populated */}
      {chartData.labels.length > 0 && chartData.datasets.length > 0 && (
        <Line data={chartData} options={{ responsive: true }} width={300} height={100} />
      )}
    </div>
  );
}
