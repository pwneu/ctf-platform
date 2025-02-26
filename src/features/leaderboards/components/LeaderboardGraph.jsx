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

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

export default function LeaderboardGraph({ topUsersGraph }) {
  const allActivities = topUsersGraph
    .flatMap((user) => user.activities) // Flatten all user activities
    .map((activity) => activity.occurredAt) // Extract timestamps
    .sort((a, b) => new Date(a) - new Date(b)); // Ensure chronological order

  // Downsample labels for performance
  const maxLabels = 250;
  const step = Math.ceil(allActivities.length / maxLabels);

  const labels = allActivities
    .filter((_, index) => index % step === 0)
    .map((entry) => new Date(entry).toLocaleString());

  const datasets = topUsersGraph.map((user, index) => {
    const activities = allActivities.map((timestamp) => {
      const activity = user.activities.find((a) => a.occurredAt === timestamp);
      return {
        occurredAt: timestamp,
        score: activity ? (activity.score < 0 ? 0 : activity.score) : null,
      };
    });

    // Find the highest and lowest scoring entries
    const maxEntry = activities.reduce(
      (max, entry) =>
        entry.score !== null && entry.score > max.score ? entry : max,
      { score: -Infinity, occurredAt: null }
    );

    const minEntry = activities.reduce(
      (min, entry) =>
        entry.score !== null && entry.score < min.score ? entry : min,
      { score: Infinity, occurredAt: null }
    );

    // Downsample data while keeping both max and min entries
    const filteredActivities = activities.filter(
      (entry, i) =>
        i % step === 0 ||
        entry.occurredAt === maxEntry.occurredAt ||
        entry.occurredAt === minEntry.occurredAt
    );

    return {
      label: user.userName,
      data: filteredActivities.map((activity) => activity.score),
      fill: false,
      borderColor: `hsl(${(index * 60) % 360}, 100%, 50%)`,
      tension: 0.1,
      cubicInterpolationMode: "monotone",
      spanGaps: true,
    };
  });

  const data = { labels, datasets };

  return (
    <div
      className="leaderboard-graph-container"
      data-aos="fade-up"
      data-aos-offset="80"
      data-aos-duration={900}
    >
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            decimation: {
              enabled: true,
              algorithm: "lttb",
              samples: maxLabels,
            },
            legend: { position: "top" },
            tooltip: {
              callbacks: {
                title: (tooltipItems) => tooltipItems[0].label,
                label: (tooltipItem) =>
                  `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
              },
            },
          },
          scales: {
            x: {
              title: { display: true, text: "Activity Date" },
              ticks: { autoSkip: true, maxTicksLimit: 10 },
            },
            y: {
              title: { display: true, text: "Score" },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}
