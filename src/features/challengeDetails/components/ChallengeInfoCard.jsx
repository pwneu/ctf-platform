import { useState, useEffect } from "react";

export default function ChallengeInfoCard({ challengeDetails }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  // useEffect hook to update the screen width when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        id="js-pin-content"
        style={
          screenWidth < 990
            ? { height: "fit-content", right: "0%" }
            : { height: "90%", right: "7%", paddingTop: "80px" }
        }
        className="courses-single-info js-pin-content"
      >
        <div
          style={{ position: "sticky", top: "100px" }}
          className="bg-black py-10 px-10"
        >
          <div className="relative">
            <img
              className="w-1/1"
              src="/assets/img/challengesCards/cards2.png"
              alt="image"
            />
          </div>

          <div className="text-white courses-single-t scroll-bar-1 pt-30 pb-20 px-20">
            <div className="mt-25">
              <div className="d-flex justify-between py-8 ">
                <div className="d-flex items-center">
                  <div className="fa fa-folder"></div>
                  <div className="ml-10">Category</div>
                </div>
                <div>{challengeDetails.categoryName}</div>
              </div>

              <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center">
                  <div className="fa fa-trophy"></div>
                  <div className="ml-10">Points</div>
                </div>
                <div>{challengeDetails.points}</div>
              </div>

              <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center ">
                  <div className="fa fa-users"></div>
                  <div className="ml-10">Solvers</div>
                </div>
                <div>
                  {challengeDetails.solveCount === 0
                    ? "None"
                    : challengeDetails.solveCount}
                </div>
              </div>

              <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center">
                  <div className="fa fa-infinity"></div>
                  <div className="ml-10">Max Attempts</div>
                </div>
                <div>
                  {challengeDetails.maxAttempts === 0
                    ? "Unlimited"
                    : challengeDetails.maxAttempts}
                </div>
              </div>

              <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center ">
                  <div className="far fa-clock"></div>
                  <div className="ml-10">Deadline</div>
                </div>
                <div>
                  {challengeDetails.deadlineEnabled
                    ? new Date(challengeDetails.deadline).toLocaleString()
                    : "Disabled"}
                </div>
              </div>

              <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center ">
                  <div className="fa fa-download"></div>
                  <div className="ml-10">Artifacts</div>
                </div>
                <div>
                  {challengeDetails.artifacts.length > 0
                    ? challengeDetails.artifacts.length
                    : "None"}
                </div>
              </div>

              <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center ">
                  <div className="fa fa-lightbulb-o"></div>
                  <div className="ml-10">Hints</div>
                </div>
                <div>
                  {" "}
                  {challengeDetails.hints.length > 0
                    ? challengeDetails.hints.length
                    : "None"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
