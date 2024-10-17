import { useState, useEffect } from "react";
import { api } from "@/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

export default function ChallengeDetails({ id }) {
  const [challengeDetails, setChallengeDetails] = useState();
  const [flag, setFlag] = useState("");
  // const [message, setMessage] = useState("");
  const [selectedHint, setSelectedHint] = useState(null);
  const [showConfirmUseHintModal, setShowConfirmUseHintModal] = useState(false);

  const [alreadySolved, setAlreadySolved] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isUsingHint, setIsUsingHint] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmissionDisabled, setIsSubmissionDisabled] = useState(false);

  const [isSubmittingTooOften, setIsSubmittingTooOften] = useState(false);

  const [recentSolvers, setRecentSolvers] = useState();

  const { auth } = useAuth();
  const isManager = auth?.roles?.includes("Manager");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await api.post(`/play/challenges/${id}/submit`, null, {
        params: { flag },
      });

      if (response.data === "Correct") {
        setAlreadySolved(true);
        toast.success("Correct");
      } else if (response.data === "AlreadySolved") {
        setAlreadySolved(true);
        toast.info("Already Solved");
      } else if (response.data === "DeadlineReached") {
        toast.error(
          "Deadline has been reached. You cannot solve the challenge anymore"
        );
        setIsSubmissionDisabled(true);
      } else if (response.data === "SubmissionsNotAllowed") {
        toast.error("Flag submission has been disabled by the admin");
        setIsSubmissionDisabled(true);
      } else if (response.data === "MaxAttempReached") {
        toast.error(
          "Max attempts has been reached. You cannot solve the challenge anymore"
        );
        setIsSubmissionDisabled(true);
      } else if (response.data === "SubmittingTooOften") {
        toast.warn("Submitting too often. Slow down!");
        setIsSubmittingTooOften(true); // Disable button
        setTimeout(() => setIsSubmittingTooOften(false), 15000);
      } else {
        toast.info(response.data);
      }
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 400) {
        if (
          error?.response?.data?.code ===
          "CheckIfHintUsed.ChallengeAlreadySolved"
        ) {
          setAlreadySolved(true);
          toast.info(error.response?.data?.message);
        } else if (error?.response?.data?.code === "CheckIfHintUsed.NotFound") {
          toast.error(error.response?.data?.message);
        } else {
          toast.error(error.response?.data?.message);
        }
      } else if (status === 403) {
        toast.info("Managers and admins are not allowed solve challenges");
      } else if (status === 429) {
        toast.warn("Slow down on using hints!");
      } else {
        toast.error("Error checking submitting flag. Please try again later");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckHintStatus = async (hint) => {
    if (alreadySolved) {
      toast.info("Challenge already solved");
      return;
    }
    try {
      setSelectedHint(hint);
      setIsUsingHint(true);
      const response = await api.get(`/play/hints/${hint.id}/check`);
      if (response.data === true) {
        await handleUseHint(hint);
      } else if (response.data === false) {
        setShowConfirmUseHintModal(true);
      }
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 400) {
        if (
          error?.response?.data?.code ===
          "CheckIfHintUsed.ChallengeAlreadySolved"
        ) {
          setAlreadySolved(true);
          toast.info(error.response?.data?.message);
        } else if (error?.response?.data?.code === "CheckIfHintUsed.NotFound") {
          toast.error(error.response?.data?.message);
        } else {
          toast.error(error.response?.data?.message);
        }
      } else if (status === 403) {
        toast.info("Managers and admins are not allowed to use hints");
      } else if (status === 429) {
        toast.warn("Slow down on using hints!");
      } else {
        toast.error("Error checking hint status. Please try again later");
      }
    } finally {
      setIsUsingHint(false);
    }
  };

  const handleUseHint = async (hint) => {
    try {
      setIsUsingHint(true);
      const response = await api.post(`/play/hints/${hint.id}`);
      toast.info(`Hint: ${response.data}`);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 400) {
        if (error?.response?.data?.code === "UseHint.ChallengeAlreadySolved") {
          setAlreadySolved(true);
          toast.info(error.response?.data?.message);
        } else if (error?.response?.data?.code === "UseHint.NotFound") {
          toast.error(error.response?.data?.message);
        } else {
          toast.error(error.response?.data?.message);
        }
      } else if (status === 429) {
        toast.warn("Slow down on using hints!");
      } else if (status === 403) {
        toast.info("Managers and admins are not allowed to use hints");
      } else {
        toast.error("Error using hint. Please try again later");
      }
    } finally {
      setIsUsingHint(false);
      setShowConfirmUseHintModal(false);
    }
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
        // console.log(response.data);
        setChallengeDetails(response.data);
      } catch (error) {
        const status = error?.response?.status;

        if (status === 404) {
          // toast.error(error.response.data.message || "Challenge not found");
        } else {
          toast.error(
            "Something went wrong getting challenge details. Please try again later"
          );
        }
        setChallengeDetails(null);
      }
    };

    const checkIfChallengeSolved = async () => {
      try {
        const response = await api.get(`/play/challenges/${id}/check`);
        setAlreadySolved(response.data);
      } catch (error) {
        setAlreadySolved(false);
      }
    };

    const fetchRecentSolvers = async () => {
      try {
        const response = await api.get(`/play/challenges/${id}/solves`, {
          params: {
            sortOrder: "desc",
            pageSize: 20,
            sortBy: "solvedat",
          },
        });
        // console.log(response.data);
        setRecentSolvers(response.data.items);
      } catch (error) {
        const status = error?.response?.status;

        if (status === 429) {
          toast.warn("Slow down on fetching recent solvers!");
        } 
        // else {
        //   toast.error(
        //     "Something went wrong getting challenge solves. Please try again later"
        //   );
        // }

        setRecentSolvers([]);
      }
    };

    fetchChallengeDetails();
    checkIfChallengeSolved();
    fetchRecentSolvers();
  }, [id]);

  return (
    <div id="js-pin-container" className="js-pin-container relative">
      <section className="page-header -type-5 bg-light-6">
        <div className="container d-flex justify-content-center align-items-center">
          <div className="page-header__content pt-90 pb-90 text-center">
            <div className="row y-gap-30">
              {challengeDetails === undefined ? (
                <div>Loading...</div>
              ) : challengeDetails === null ? (
                <div>Challenge Not Found</div>
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
                        Solvers: {challengeDetails.solveCount}
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
                        {challengeDetails.deadlineEnabled
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
                      hidden={isManager}
                      required
                    />
                    <button
                      type="submit"
                      className="submit-button"
                      hidden={isManager}
                      disabled={
                        isManager ||
                        isSubmitting ||
                        isSubmissionDisabled ||
                        alreadySolved ||
                        !flag ||
                        isSubmittingTooOften
                      }
                    >
                      {isSubmittingTooOften
                        ? "Wait..."
                        : isSubmitting
                        ? "Submitting..."
                        : isSubmissionDisabled
                        ? "Submission Disabled"
                        : alreadySolved
                        ? "Solved!"
                        : "Submit"}
                    </button>
                  </form>

                  {/* {message && <p className="mt-20">{message}</p>} */}

                  <h4 className="mt-20">Hints</h4>
                  {challengeDetails.hints.length > 0 ? (
                    challengeDetails.hints.map((hint, index) => (
                      <div key={index} className="hint-container">
                        <button
                          onClick={() => handleCheckHintStatus(hint)}
                          className="hint-button"
                          disabled={isUsingHint}
                        >
                          {isUsingHint
                            ? "Loading..."
                            : `Use hint (-${hint.deduction} Points)`}
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

                  <h4 className="mt-20">Recent Solvers</h4>
                  {recentSolvers === undefined ? (
                    <p>Loading...</p>
                  ) : recentSolvers === null || recentSolvers.length === 0 ? (
                    <p>No solvers found.</p>
                  ) : (
                    <ul>
                      {recentSolvers.map((solver, index) => (
                        <li key={index}>
                          {solver.userName} -{" "}
                          {new Date(solver.solvedAt).toLocaleString()}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Confirmation Modal */}
                  {showConfirmUseHintModal && (
                    <div className="modal-overlay">
                      <div className="modal-content">
                        <h3>Use Hint?</h3>
                        <p>{`This will deduct ${selectedHint?.deduction} point${
                          selectedHint?.deduction === 1 ? "" : "s"
                        }. Do you want to proceed?`}</p>
                        <div className="modal-buttons">
                          <button
                            onClick={handleUseHint(selectedHint)}
                            className="confirm-button"
                            disabled={isUsingHint}
                          >
                            {isUsingHint ? "Loading..." : "Confirm"}
                          </button>
                          <button
                            onClick={() => setShowConfirmUseHintModal(false)}
                            className="cancel-button"
                            disabled={isUsingHint}
                          >
                            {isUsingHint ? "Loading..." : "Cancel"}
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
