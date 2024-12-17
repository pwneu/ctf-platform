
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import "chart.js/auto";
import "./leaderboards.css";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

export default function LeaderboardGraph({ topUsersGraph }) {
  const data = {
    labels: [
      ...topUsersGraph.graphLabels.map((entry) =>
        new Date(entry).toLocaleString()
      ),
    ],
    datasets: topUsersGraph.usersGraph.map((userGraph, index) => ({
      label: userGraph[0].userName,
      data: userGraph.map((entry) => entry.score),
      fill: false,
      borderColor: `hsl(${(index * 50) % 360}, 100%, 50%)`,
      tension: 0.1,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => tooltipItems[0].label,
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Activity Date",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        title: {
          display: true,
          text: "Score",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="leaderboard-graph-container"
    data-aos="fadeInRight"
    data-aos-offset="80"
    data-aos-duration={900}>
      <Line data={data} options={options} />
    </div>
  );
}
