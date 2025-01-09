import { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { api } from "@/api";

export default function UserProfileEvaluation() {
  const [userEvaluations, setUserEvaluations] = useState();

  const getMyEvaluations = async () => {
    try {
      const response = await api.get("/play/me/evaluate");
      setUserEvaluations(response.data);
    } catch {
      setUserEvaluations(null);
    }
  };

  useEffect(() => {
    getMyEvaluations();
  }, []);

  if (userEvaluations === undefined) {
    return <p></p>;
  }

  if (!userEvaluations || !userEvaluations.categoryEvaluations) {
    return <p></p>;
  }

  return (
    <div
      className="dashboard__content"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "24px",
      }}
    >
      {userEvaluations.categoryEvaluations.map((category) => {
        const pieData = {
          labels: ["Solved", "Unsolved"],
          datasets: [
            {
              label: "Challenges",
              data: [
                category.totalSolves,
                category.totalChallenges - category.totalSolves,
              ],
              backgroundColor: [
               
                "rgba(75, 192, 192, 0.6)",
                "rgba(255, 99, 132, 0.6)",
              
              ],
              borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
              borderWidth: 1,
            },
          ],
        };

        const barData = {
          labels: ["Solves", "Incorrect Attempts", "Hints Used"],
          datasets: [
            {
              label: category.name,
              data: [
                category.totalSolves,
                category.incorrectAttempts,
                category.hintsUsed,
              ],
              backgroundColor: [
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(153, 102, 255, 0.6)",
              ],
              borderColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
             
            },
          ],
        };

        return (
          <div
            key={category.categoryId}
            style={{
              borderRadius: "16px",
              backgroundColor: "white",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              padding: "16px",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "16px",
              }}
            >
              {category.name} Category
            </h3>
            <Pie data={pieData} />
            <Bar
              data={barData}
              options={{
                indexAxis: "y",
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
