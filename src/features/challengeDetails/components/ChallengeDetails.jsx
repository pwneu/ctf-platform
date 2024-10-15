import { useState, useEffect } from "react";
import { api } from "@/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// TODO -- Implement hint
// TODO -- Submit flag

export default function ChallengeDetails({ id }) {
  const [challengeDetails, setChallengeDetails] = useState();
  const [flag, setFlag] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (flag === "PWNEU {FLAG}") {
      setMessage("Correct flag! Challenge solved.");
    } else {
      setMessage("Incorrect flag. Try again.");
    }
  };

  const handleHintRequest = (id) => {
    console.log(id);
    setShowModal(true);
  };

  const confirmHint = () => {
    setShowModal(false);
  };

  const cancelHint = () => {
    setShowModal(false);
  };

  const handleDownloadArtifact = async (artifact) => {
    try {
      setIsDownloading(true);
      const response = await api.get(`/play/artifacts/${artifact.id}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", artifact.fileName || "download");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 400) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Error downloading artifact. Please try again later");
      }
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    const fetchChallengeDetails = async () => {
      try {
        const response = await api.get(`/play/challenges/${id}`);
        console.log(response.data);
        setChallengeDetails(response.data);
      } catch (error) {
        const status = error?.response?.status;

        if (status === 404) {
          toast.error(error.response.data.message || "Challenge not found");
        } else {
          toast.error(
            "Something went wrong getting challenge details. Please try again later"
          );
        }
        setChallengeDetails(null);
      }
    };

    fetchChallengeDetails();
  }, [id]);

  return (
    <div id="js-pin-container" className="js-pin-container relative">
      <section className="page-header -type-5 bg-light-6">
        <div className="container d-flex justify-content-center align-items-center">
          <div className="page-header__content pt-90 pb-90 text-center">
            <div className="row y-gap-30">
              {challengeDetails === undefined ? (
                <div>Loading...</div>
              ) : (
                <div className="">
                  <h1 className="text-40 lh-14 mt-20 ">
                    {challengeDetails.name}
                  </h1>
                  <div className="badge px-15 py-8 text-14 bg-black text-white fw-400">
                    Category: {challengeDetails.categoryName}
                  </div>
                  <div className="mt-20 d-flex justify-content-center x-gap-20 y-gap-2 pb-50">
                    <div className="badge px-15 py-8 text-14 bg-orange-1 text-white fw-400">
                      {challengeDetails.tags.join(", ")}
                    </div>
                    <div>
                      <div className="badge px-15 py-8 text-14 bg-purple-1 text-white fw-400">
                        Points: {challengeDetails.points}
                      </div>
                    </div>
                    <div>
                      <div className="mt-23 badge px-15 py-8 text-14 bg-green-1 text-dark-1 fw-400">
                        Solve: {challengeDetails.solveCount}
                      </div>
                    </div>
                    <div>
                      <div className="mt-23 badge px-15 py-8 text-14 bg-green-1 text-dark-1 fw-400">
                        Max Attempts:{" "}
                        {challengeDetails.maxAttempts === 0
                          ? "Unlimited"
                          : challengeDetails.maxAttempts}
                      </div>
                    </div>
                    <div>
                      <div className="mt-23 badge px-15 py-8 text-14 bg-green-1 text-dark-1 fw-400">
                        Deadline:{" "}
                        {challengeDetails.deadLineEnabled
                          ? new Date(challengeDetails.deadline).toLocaleString()
                          : "Disabled"}
                      </div>
                    </div>
                  </div>

                  <p>{challengeDetails.description}</p>

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

                  {message && <p className="mt-20">{message}</p>}

                  <h4 className="mt-20">Hints</h4>
                  {challengeDetails.hints.length > 0 ? (
                    challengeDetails.hints.map((hint, index) => (
                      <div key={index} className="hint-container">
                        <button
                          onClick={() => handleHintRequest(hint.id)}
                          className="hint-button"
                        >
                          Use hint (-{hint.deduction} Points)
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="no-hints-message">No hints available</div>
                  )}

                  <h4 className="mt-20">Artifacts</h4>
                  {challengeDetails.artifacts.length > 0 ? (
                    challengeDetails.artifacts.map((artifact, index) => (
                      <div key={index} className="hint-container">
                        <button
                          onClick={() => handleDownloadArtifact(artifact)}
                          className="hint-button"
                          disabled={isDownloading}
                        >
                          {isDownloading ? "Downloading" : artifact.fileName}
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="no-artifacts-message">
                      No artifacts available
                    </div>
                  )}

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
                          <button
                            onClick={cancelHint}
                            className="cancel-button"
                          >
                            No
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
