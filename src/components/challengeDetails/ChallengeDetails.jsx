import { challengesData } from "../challengesList/challenges";
import React, { useState, useEffect } from "react";

export default function ChallengeDetails({ id }) {
  const [pageItem, setPageItem] = useState(challengesData[0]);
  const [flag, setFlag] = useState("");
  const [message, setMessage] = useState("");
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setPageItem(
      challengesData.filter((elm) => elm.id === id)[0] || challengesData[0]
    );
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (flag === "PWNEU {FLAG}") {
      setMessage("Correct flag! Challenge solved.");
    } else {
      setMessage("Incorrect flag. Try again.");
    }
  };

  const handleHintRequest = () => {
    setShowModal(true);
  };

  const confirmHint = () => {
    setShowModal(false);
    if (pageItem.points > 0) {
      setHintsUsed(hintsUsed + 1);
      setMessage("Here is your hint!");
      // setPageItem(prev => ({ ...prev, points: prev.points - 1 }));
    } else {
      setMessage("No points left to use a hint.");
    }
  };

  const cancelHint = () => {
    setShowModal(false);
  };

  // Function to handle file downloads
  const handleFileDownload = (fileUrl) => {
    // Open the URL in a new tab (since they are links, not downloadable files)
    window.open(fileUrl, "_blank");
  };

  return (
    <div id="js-pin-container" className="js-pin-container relative">
      <section className="page-header -type-5 bg-light-6">
        <div className="container d-flex justify-content-center align-items-center">
          <div className="page-header__content pt-90 pb-90 text-center">
            <div className="row y-gap-30">
              <div className="">
                <h1 className="text-40 lh-14 mt-20 ">{pageItem.name}</h1>
                <div className="mt-20 d-flex justify-content-center x-gap-20 y-gap-2 pb-50">
                  <div>
                    <div className="badge px-15 py-8 text-14 bg-black text-white fw-400">
                      {pageItem.categoryName}
                    </div>
                  </div>
                  <div>
                    <div className="badge px-15 py-8 text-14 bg-orange-1 text-white fw-400">
                      {pageItem.tags.join(", ")}
                    </div>
                  </div>
                  <div>
                    <div className="badge px-15 py-8 text-14 bg-purple-1 text-white fw-400">
                      {pageItem.points} Points
                    </div>
                  </div>
                  <div>
                    <div className="mt-23 badge px-15 py-8 text-14 bg-green-1 text-dark-1 fw-400">
                      Solve: {pageItem.solveCount}
                    </div>
                  </div>
                  <button
                    className=" artifact-button badge  px-15 py-8 text-14 fw-400 "
                    onClick={() => {
                      // Open all URLs in new tabs
                      pageItem.artifacts.forEach((artifact) => {
                        window.open(artifact.fileName, "_blank");
                      });
                    }}
                  >
                    Download Challenge Files
                  </button>
                </div>

                <p>{pageItem.description}</p>

                {/* Form for submitting the flag */}
                <form
                  onSubmit={handleSubmit}
                  className="d-flex justify-content-center mt-20"
                >
                  <input
                    type="text"
                    value={flag}
                    onChange={(e) => setFlag(e.target.value)}
                    placeholder="PWNEU {FLAG}"
                    className="form-control mx-2"
                    required
                  />
                  <button type="submit" className="submit-button">
                    Submit Flag
                  </button>
                </form>

                {/* Hints Button */}
                <button onClick={handleHintRequest} className="hint-button">
                  Get a Hint
                </button>
                {message && <p className="mt-20">{message}</p>}

                {/* Confirmation Modal */}
                {showModal && (
                  <div className="modal-overlay">
                    <div className="modal-content">
                      <h3>Confirmation</h3>
                      <p>This will deduct 1 point. Do you want to proceed?</p>
                      <div className="modal-buttons">
                        <button
                          onClick={confirmHint}
                          className="confirm-button"
                        >
                          Yes
                        </button>
                        <button onClick={cancelHint} className="cancel-button">
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
