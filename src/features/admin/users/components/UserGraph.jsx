import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Required for automatic Chart.js version management

export default function UserGraph({ userGraph }) {
  // Check if userGraph is undefined (loading state)
  if (userGraph === undefined) {
    return <p>Loading user graph data...</p>; // Display loading message if userGraph is undefined
  }

  // Check if userGraph is null or empty
  if (!userGraph || userGraph.length === 0) {
    return <p>No data available.</p>; // Display message if no data is available
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
        label: "User Activity Score",
        data: scores,
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Show legend if you want
      },
      title: {
        display: false, // Hide the title
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };

  return (
    <>
      <h2>User Graph</h2>
      <Line data={data} options={options} />
    </>
  );
}
