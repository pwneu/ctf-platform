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
    return <p>Loading...</p>;
  }

  if (!userEvaluations || !userEvaluations.categoryEvaluations) {
    return <p>No user evaluations available.</p>;
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
               
              "rgba(0, 15, 102, 0.87)",
                "rgba(114, 3, 3, 0.84)",
              
              ],
              borderColor: ["rgb(253, 253, 253)", "rgb(255, 255, 255)"],
              borderWidth: 10,
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
               "rgba(243, 200, 10, 0.81)",
                "rgba(4, 2, 114, 0.94)",
                "rgba(78, 5, 92, 0.71)",
              ],
              borderColor: [
                "rgb(0, 0, 0)",
                "rgb(0, 0, 0)",
                "rgb(0, 0, 0)",
              ],
              borderWidth: 1,
              borderRadius: 30,
            },
          ],
        };

        return (
          <div
            key={category.categoryId}
            style={{
              borderRadius: "25px",
              backgroundColor: "white",
              boxShadow: "0px 2px 6px rgba(128, 46, 161, 0.09)",
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
