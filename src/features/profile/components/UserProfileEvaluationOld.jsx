import { Row, Col, Card } from "react-bootstrap"; 
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto"; // Required for automatic Chart.js version management
import { api } from "@/api";
import { useEffect, useState } from "react";

export default function UserProfileEvaluationOld() {
  const [userEvaluations, setUserEvaluations] = useState();

  const getMyEvaluations = async () => {
    try {
      const response = await api.get("/play/me/evaluate");
      // console.log(response.data);
      setUserEvaluations(response.data);
    } catch {
      setUserEvaluations(null);
    }
  };

  useEffect(() => {
    getMyEvaluations();
  }, []); // Add empty dependency array to prevent continuous API calls

  if (userEvaluations === undefined) {
    return <p>Loading...</p>;
  }

  if (!userEvaluations || !userEvaluations.categoryEvaluations) {
    return <p>No user evaluations available.</p>;
  }

  return (
    <>
      <h2 className="text-center">Category Evaluations</h2>
      <Row className="d-flex justify-content-center align-items-center vh-100">
        {userEvaluations.categoryEvaluations.map((category) => {
          // Prepare creative data for Donut chart (solved vs unsolved)
          const donutData = {
            labels: ["Solved", "Unsolved"],
            datasets: [
              {
                label: "Challenges",
                data: [
                  category.totalSolves,
                  category.totalChallenges - category.totalSolves,
                ],
                backgroundColor: [
                  "rgba(58, 4, 94, 0.8)", // #3a045e with 80% opacity
                  "rgba(255, 206, 86, 1)", // Hover yellow
                ],
                hoverOffset: 10, // Increases hover size
                hoverBackgroundColor: [
                  "rgba(75, 192, 192, 1)", // Hover green
                  "rgba(207, 247, 23)", // #cff721 with 80% opacity
                ],
                borderWidth: 2,
                borderColor: [
                  "rgba(207, 247, 23)", // #cff721 with 80% opacity
                  "rgba(255, 255, 255, 79)", // White border for clear separation
                ],
                shadowOffsetX: 7,
                shadowOffsetY: 9,
                shadowColor: "rgba(0, 0, 0, 0.9)",
                shadowBlur: 4,
              },
            ],
          };

          // Prepare creative data for Bar chart (solves, incorrect attempts, hints used)
          const barData = {
            labels: ["Solves", "Incorrect Attempts", "Hints Used"],
            datasets: [
              {
                label: `${category.name} Overview`,
                data: [
                  category.totalSolves,
                  category.incorrectAttempts,
                  category.hintsUsed,
                ],
                backgroundColor: [
                  "rgba(58, 4, 94, 1)", // #3a045e for Solves
                  "rgba(75, 192, 192, 1)", // Hover green  Incorrect Attempts
                  "rgba(207, 247, 33, 0.8)", // #cff721 for Hint Used
                ],
                hoverBackgroundColor: [
                  "rgba(58, 4, 94, 1)", // Hover for #3a045e (Solves)
                  "rgba(207, 247, 33, 1)", // Hover for #cff721 (Hint Used)
                  "rgba(207, 247, 33, 1)", // Hover for #cff721
                ],
                borderColor: "rgba(0, 0, 0, 2)", // Subtle border for contrast
                borderWidth: 1,
                borderRadius: 30, // Rounded bars for a softer look
                barThickness: 9, // Thicker bars
              },
            ],
          };

          return (
            <Col key={category.categoryId} md={12} lg={5} className="mb-4">
              <Card className="shadow-lg">
                <Card.Body>
                  <Card.Title className="text-center">
                    {category.name} Category
                  </Card.Title>

                  <Row>
                    <Col
                      xs={12}
                      md={4}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <div style={{ height: "170px", position: "relative" }}>
                        <Pie
                          data={donutData}
                          options={{
                            cutout: "75%", // Creative cutout for donut chart
                            responsive: true,
                            animation: {
                              animateScale: true, // Smooth animation on hover
                            },
                            plugins: {
                              legend: {
                                display: true,
                                position: "top",
                              },
                              tooltip: {
                                callbacks: {
                                  label: function (tooltipItem) {
                                    const label = tooltipItem.label;
                                    const value = tooltipItem.raw;
                                    const percentage = (
                                      (value / category.totalChallenges) *
                                      100
                                    ).toFixed(2);
                                    return `${label}: ${value} (${percentage}%)`;
                                  },
                                },
                              },
                            },
                          }}
                        />
                      </div>
                    </Col>
                    <Col xs={10} md={7}>
                      <div
                        style={{
                          height: "150px",
                          marginTop: "20px",
                        }}
                      >
                        <Bar
                          data={barData}
                          options={{
                            indexAxis: "y", // Horizontal bar chart for creativity
                            responsive: true,
                            maintainAspectRatio: false,
                            animation: {
                              duration: 3000, // Slower, creative animation
                              easing: "easeInOutBounce", // Bouncy effect
                            },
                            plugins: {
                              legend: {
                                display: false, // Disable the legend to remove the label
                                position: "top",
                              },
                            },
                            scales: {
                              x: {
                                beginAtZero: true,
                                title: {
                                  display: true,
                                  text: "Count",
                                },
                                ticks: {
                                  callback: function (value) {
                                    return value % 1 === 0 ? value : ""; // Display only whole numbers
                                  },
                                },
                              },
                            },
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
