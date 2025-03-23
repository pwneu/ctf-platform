import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Decimation,
} from "chart.js";
import "chart.js/auto";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Decimation
);

export default function LeaderboardGraph({ topUsersGraph }) {
  // Extract and sort all activity timestamps
  const allActivities = topUsersGraph
    .flatMap((user) => user.activities)
    .map((activity) => activity.occurredAt)
    .sort((a, b) => new Date(a) - new Date(b));

  // Downsample for performance
  const maxLabels = 250;
  const step = Math.ceil(allActivities.length / maxLabels);
  // Start with the downsampled timestamps
  let unifiedTimestamps = allActivities.filter(
    (_, index) => index % step === 0
  );

  // For each user, ensure their highest and lowest activity timestamps are included
  topUsersGraph.forEach((user) => {
    if (user.activities.length) {
      const maxActivity = user.activities.reduce((prev, curr) =>
        curr.score > prev.score ? curr : prev
      );
      const minActivity = user.activities.reduce((prev, curr) =>
        curr.score < prev.score ? curr : prev
      );

      if (!unifiedTimestamps.includes(maxActivity.occurredAt)) {
        unifiedTimestamps.push(maxActivity.occurredAt);
      }
      if (!unifiedTimestamps.includes(minActivity.occurredAt)) {
        unifiedTimestamps.push(minActivity.occurredAt);
      }
    }
  });

  // Sort the unified timestamps chronologically
  unifiedTimestamps.sort((a, b) => new Date(a) - new Date(b));

  // Build the x-axis labels from unified timestamps
  const labels = unifiedTimestamps.map((timestamp) =>
    new Date(timestamp).toLocaleString()
  );

  // Define the color palette
  const colors = [
    "#FF6B6B", // Soft Red
    "#FFA94D", // Warm Orange
    "#FFD43B", // Mellow Yellow
    "#A2D729", // Fresh Lime
    "#4CAF50", // Balanced Green
    "#29B6F6", // Bright Cyan
    "#5C6BC0", // Soft Blue
    "#AB47BC", // Muted Purple
    "#F06292", // Gentle Magenta
    "#8D6E63", // Warm Brown
  ];

  // Build datasets with data aligned to the unified timestamps
  const datasets = topUsersGraph.map((user, index) => {
    const data = unifiedTimestamps.map((timestamp) => {
      // Find an activity that matches the timestamp
      const activity = user.activities.find((a) => a.occurredAt === timestamp);
      // If found, ensure negative scores become 0; if not, mark as null (gap)
      return activity ? (activity.score < 0 ? 0 : activity.score) : null;
    });

    return {
      label: user.userName,
      data,
      fill: false,
      borderColor: colors[index % colors.length],
      tension: 0.1,
      cubicInterpolationMode: "monotone",
      spanGaps: true,
    };
  });

  const data = { labels, datasets };

  return (
    <div style={{ width: "100%", height: "400px" }}>
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
