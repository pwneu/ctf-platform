import { useState, useEffect } from "react";

export default function PinContent({ pageItem }) {
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
          className="bg-white  rounded-8 border-light py-10 px-10"
        >
          <div className="relative">
            <img className="w-1/1" src={pageItem.imageSrc} alt="image" />
          </div>

          <div className="courses-single-t scroll-bar-1 pt-30 pb-20 px-20">
            <div className="mt-25">
              <div className="d-flex justify-between py-8 ">
                <div className="d-flex items-center text-dark-1">
                  <div className="fa fa-folder"></div>
                  <div className="ml-10">Category</div>
                </div>
                <div>Web Explotation</div>
              </div>

              <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center text-dark-1">
                  <div className="fa fa-trophy"></div>
                  <div className="ml-10">Points</div>
                </div>
                <div>100</div>
              </div>

              <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center text-dark-1">
                  <div className="fa fa-users"></div>
                  <div className="ml-10">Solvers</div>
                </div>
                <div>20</div>
              </div>

              <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center text-dark-1">
                  <div className="fa fa-infinity"></div>
                  <div className="ml-10">Max Attempts</div>
                </div>
                <div>Unlimited</div>
              </div>

              <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center text-dark-1">
                  <div className="far fa-clock"></div>
                  <div className="ml-10">Deadline</div>
                </div>
                <div>Disabled</div>
              </div>

              <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center text-dark-1">
                  <div className="fa fa-download"></div>
                  <div className="ml-10">Files</div>
                </div>
                <div>Download</div>
              </div>

              <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center text-dark-1">
                  <div className="fa fa-lightbulb-o"></div>
                  <div className="ml-10">Hints</div>
                </div>
                <div>No hints available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
