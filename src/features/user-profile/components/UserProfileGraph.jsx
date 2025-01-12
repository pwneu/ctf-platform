import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Required for automatic Chart.js version management
import { api } from "@/api";
import { useState, useEffect } from "react";

export default function UserProfileGraph() {
  const [userGraph, setUserGraph] = useState();

  const getMyGraph = async () => {
    try {
      const response = await api.get(`/play/me/graph`);
      setUserGraph(response.data);
    } catch {
      setUserGraph(null);
    }
  };

  useEffect(() => {
    getMyGraph();
  }, []);

  // Display loading message if userGraph is undefined
  if (userGraph === undefined) {
    return <p className="text-center text-gray-500"></p>;
  }

  // Check if userGraph is null, undefined, or empty
  if (!userGraph || userGraph.length === 0) {
    return <p className="text-center text-gray-500"></p>;
  }

  // Prepare data for the chart
  const labels = userGraph.map((entry) =>
    new Date(entry.activityDate).toLocaleString()
  );
  const scores = userGraph.map((entry) => entry.score);

  // Chart data
  const data = {
    labels,
    datasets: [
      {
        label: "Activity Score",
        data: scores,
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  // Chart options with X-axis labels hidden
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Show legend if you want
      },
      title: {
        display: false, // Hide the title
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        display: false, // Hide the X-axis labels
      },
    },
  };

  return (
    <>
      <div
        // className="dashboard__content"
        style={{
          margin: "0 auto",
          alignItems: "center",
          maxWidth: "1000px",
        }}
      >
        <div className="max-w-sm mx-auto p-2 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-center mb-2">
            Points Graph
          </h2>
          <div className="h-12 md:h-24 lg:h-36 mb-2 text-dark-1">
            {/* Adjusted height values */}
            <Line
              data={data}
              options={options}
              aria-label="User Activity Graph"
            />
          </div>
        </div>
      </div>
    </>
  );
}
