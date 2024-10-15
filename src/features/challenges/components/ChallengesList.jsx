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
      <div className="row y-gap-30 side-content__wrap">
        {isBusy || !challenges ? (
          <div style={loadingStyle}>Loading...</div>
        ) : challenges.items.length === 0 ? (
          <div style={loadingStyle}>No challenges found</div>
        ) : (
          challenges.items.map((challenge, i) => (
            <div
              key={i}
              className="side-content col-xl-4 col-lg-6 col-md-4 col-sm-6"
            >
              <div className="charCard h-100 pt-15">
                <div className="d-flex items-center">
                  <div className="text-17 lh-15 fw-500 text-dark-1">
                    <Link
                      className="badge px-4 py-5 text-15 bg-purple-1 text-white fw-400"
                      to={`/play/${challenge.id}`}
                    >
                      {challenge.name}
                    </Link>
                  </div>
                </div>
                <div className="d-flex x-gap-10 items-center cpt-10">
                  <div className="text-14 lh-1">
                    {/* Category: {challenge.categoryName} <br /> */}
                    Points: {challenge.points} <br />
                    Solve Count: {challenge.solveCount} <br />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
