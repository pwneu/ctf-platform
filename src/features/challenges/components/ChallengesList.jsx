import { Link } from "react-router-dom";

export default function ChallengesList({ challenges, isBusy }) {
  const loadingStyle = {
    minHeight: "600px", // Adjust the height as needed
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.5rem",
  };

  return (
    <>
      <section className="layout-pt layout-pb-lg">
        <div className="container">
          <div className="row y-gap-20 justify-center">
            {isBusy || challenges === undefined ? (
              <div style={loadingStyle}>Loading...</div>
            ) : challenges.items.length === 0 ? (
              <div style={loadingStyle}>No challenges found</div>
            ) : (
              challenges.items.map((challenge, i) => (
                <div key={i} className="col-lg-12 ">
                  <Link
                    to={`/play/${challenge.id}`}
                    className="coursesCard -type-4 d-flex sm:d-block items-center border-light rounded-8 px-10 py-10"
                    style={{
                      textDecoration: "none", // Remove the default underline from the link
                    }}
                  >
                    <div className="coursesCard__content pl-20 sm:pl-10 pr-10">
                      <div className="text-1 lh-12 text-white mt-10">
                        <div
                          className="linkCustom"
                          style={{
                            backgroundColor: "#3a045e",
                            color: "white",
                            padding: "2px 13px",
                            borderRadius: "18px",
                            minWidth: "120px",
                            height: "23px",
                            overflow: "visible",
                            whiteSpace: "nowrap",
                            fontSize: "calc(3 + 0.1vw)",
                            transition: "background-color 0.3s, color 0.3s",
                            textAlign: "center",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#cff721";
                            e.target.style.color = "#fffffe";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#3a045e";
                            e.target.style.color = "#fffffe";
                          }}
                        >
                          {challenge.name}
                        </div>
                      </div>

                      <div className=" items-center">
                        <div className="mt-20 text-14 lh-1 text-light-1">
                          <div className="fa fa-trophy"></div> Points:{" "}
                          {challenge.points}
                        </div>
                      </div>

                      <div className=" text-14 lh-2 text-light-1">
                        <div className="fa fa-users"> </div> Solve Count:{" "}
                        {challenge.solveCount}
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
