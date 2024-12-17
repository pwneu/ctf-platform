// import { coursesData } from "@/data/courses";
import { useState, useEffect } from "react";
import ChallengeInfoCard from "./ChallengeInfoCard";
import RecentSolvers from "./RecentSolvers";
import { api } from "@/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import ChallengeDetailsArtifacts from "./ChallengeDetailsArtifacts";
import ChallengeDetailsHints from "./ChallengeDetailsHints";

// TODO -- design challenge loading and challenge not found

const menuItems = [
  { id: 1, href: "#recent-solvers", text: "Recent Solvers", isActive: true },
  { id: 2, href: "#artifacts", text: "Artifacts", isActive: false },
  { id: 3, href: "#hints", text: "Hints", isActive: false },
];

const badgeClasses = [
  "bg-green-1 text-dark-1",
  "bg-orange-1 text-white",
  "bg-purple-1 text-white",
];

export default function ChallengeDetails({ id }) {
  // const [pageItem, setPageItem] = useState(coursesData[0]);
  const [activeTab, setActiveTab] = useState(1);

  // useEffect(() => {
  //   setPageItem(coursesData.filter((elm) => elm.id == id)[0] || coursesData[0]);
  // }, [id]);

  const [challengeDetails, setChallengeDetails] = useState();
  const [flag, setFlag] = useState("");

  const [alreadySolved, setAlreadySolved] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmissionDisabled, setIsSubmissionDisabled] = useState(false);

  const [isSubmittingTooOften, setIsSubmittingTooOften] = useState(false);

  const { auth } = useAuth();
  const isManager = auth?.roles?.includes("Manager");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const trimmedFlag = flag.trim();
      const response = await api.post(`/play/challenges/${id}/submit`, null, {
        params: { flag: trimmedFlag },
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
      } else if (response.data === "MaxAttemptReached") {
        toast.error(
          "Max attempts has been reached. You cannot solve the challenge anymore"
        );
        setIsSubmissionDisabled(true);
      } else if (response.data === "SubmittingTooOften") {
        toast.warn("Submitting too often. Please wait for 30 seconds!");
        setIsSubmittingTooOften(true); // Disable button
        setTimeout(() => setIsSubmittingTooOften(false), 30_000);
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
        toast.warn("Slow down on solving challenges!");
      } else {
        toast.error("Error submitting flag. Please try again later");
      }
    } finally {
      setIsSubmitting(false);
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

    const checkChallengeStatus = async () => {
      try {
        const response = await api.get(`/play/challenges/${id}/check`);
        if (response.data === "AlreadySolved") {
          setAlreadySolved(true);
        } else if (response.data === "Disabled") {
          setIsSubmissionDisabled(true);
        }
      } catch (error) {
        setIsSubmissionDisabled(false);
        setAlreadySolved(false);
      }
    };

    fetchChallengeDetails();
    checkChallengeStatus();
  }, [id]);

  return (
    <>
      {challengeDetails === undefined ? (
        <div
          style={{
            minHeight: "80vh",
            marginTop: "200px",
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          Loading...
        </div>
      ) : challengeDetails === null ? (
        <div
          style={{
            minHeight: "80vh",
            marginTop: "200px",
          }}
        >
          Challenge Not Found
        </div>
      ) : (
        <div id="js-pin-container" className="js-pin-container relative">
          <section className="page-header -type-5 bg-dark-1">
            <div className="page-header__bg">
              <div
                className="bg-image js-lazy"
                data-bg="img/event-single/bg.png"
              ></div>
            </div>

            <div className="container">
              <div className="page-header__content pt-90 pb-90">
                <div className="row y-gap-30 relative">
                  <div className="col-xl-7 col-lg-8">
                    <div>
                      <h1 className="text-30 lh-14 text-white pr-60 lg:pr-0">
                        {challengeDetails?.name}
                      </h1>
                    </div>

                    <p
                      className="col-xl-9 mt-20 "
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {challengeDetails?.description}
                    </p>

                    {/* Changed to tags */}
                    <div className="mt-30 d-flex x-gap-15 y-gap-10 pb-20">
                      {challengeDetails?.tags.map((tag, index) => (
                        <div key={index}>
                          <div
                            className={`badge px-15 py-8 text-11 fw-400 ${
                              badgeClasses[index % badgeClasses.length]
                            }`}
                          >
                            {tag}
                          </div>
                        </div>
                      ))}

                      {/* <div>
                    <div className="badge px-15 py-8 text-11 bg-green-1 text-dark-1 fw-400">
                      Web Exploitation
                    </div>
                  </div>
                  <div>
                    <div className="badge px-15 py-8 text-11 bg-orange-1 text-white fw-400">
                      Solvers: 20
                    </div>
                  </div>
                  <div>
                    <div className="badge px-15 py-8 text-11 bg-purple-1 text-white fw-400">
                      Points: 20
                    </div>
                  </div> */}
                    </div>
                    <form
                      className="contact-form respondForm__form text-white row y-gap-20 pt-30"
                      onSubmit={handleSubmit}
                    >
                      <div className="col-lg-9  text-white">
                        <input
                          required
                          type="text"
                          value={flag}
                          onChange={(e) => setFlag(e.target.value)}
                          name="PWNEU{FLAG}"
                          placeholder="PWNEU{FLAG}"
                          autoComplete="given-name"
                          hidden={isManager}
                          style={{ color: "white" }}
                        />
                      </div>
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
                          ? "Disabled!"
                          : alreadySolved
                          ? "Solved!"
                          : "Submit"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {challengeDetails && (
            <ChallengeInfoCard challengeDetails={challengeDetails} />
          )}

          <section
            className="pt-30 layout-pb-md"
            style={{
              minHeight: "80vh",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="pt-25 pb-30 px-30 ">
                    <div className="tabs -active-purple-2 js-tabs pt-0">
                      <div className="tabs__controls d-flex js-tabs-controls">
                        {menuItems.map((elm, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveTab(elm.id)}
                            className={`tabs__button js-tabs-button js-update-pin-scene ${
                              i != 0 ? "ml-30" : ""
                            } ${activeTab == elm.id ? "is-active" : ""} `}
                            type="button"
                          >
                            {elm.text}
                          </button>
                        ))}
                      </div>

                      <div className="tabs__content   js-tabs-content">
                        <div
                          className={`tabs__pane -tab-item-1 ${
                            activeTab == 1 ? "is-active" : ""
                          } `}
                        >
                          <RecentSolvers challengeId={challengeDetails.id} />
                        </div>

                        <div
                          className={`tabs__pane -tab-item-2 ${
                            activeTab == 2 ? "is-active" : ""
                          } `}
                        >
                          <ChallengeDetailsArtifacts
                            artifacts={challengeDetails.artifacts}
                          />
                        </div>

                        <div
                          className={`tabs__pane -tab-item-3 ${
                            activeTab == 3 ? "is-active" : ""
                          } `}
                        >
                          <ChallengeDetailsHints
                            hints={challengeDetails.hints}
                            alreadySolved={alreadySolved}
                            setAlreadySolved={setAlreadySolved}
                          />
                        </div>

                        {/* <div
                        className={`tabs__pane -tab-item-2 ${
                          activeTab == 2 ? "is-active" : ""
                        } `}
                      >
                        <Leaderboard />
                      </div>

                      */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
