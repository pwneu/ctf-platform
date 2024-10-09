import { Row, Col, Card } from "react-bootstrap";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto"; // Required for automatic Chart.js version management

export default function UserEvaluations({ userEvaluations }) {
  // Check if userEvaluations is null or undefined
  if (!userEvaluations || !userEvaluations.categoryEvaluations) {
    return <p>No user evaluations available.</p>; // Display a message if no evaluations are present
  }

  // Render each category evaluation
  return (
    <>
      <h2>User Evaluations</h2>
      <Row>
        {userEvaluations.categoryEvaluations.map((category) => {
          // Prepare data for Pie chart (solved vs unsolved)
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

          // Prepare data for Bar chart (solves, incorrect attempts, hints used)
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
            <Col key={category.categoryId} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{category.name} Category</Card.Title>
                  <Pie data={pieData} />
                  <Bar
                    data={barData}
                    options={{
                      indexAxis: "y",
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false, // Hide the legend
                        },
                        title: {
                          display: false, // Hide the title
                        },
                      },
                    }}
                  />
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
