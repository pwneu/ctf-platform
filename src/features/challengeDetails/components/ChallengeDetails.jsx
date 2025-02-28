import { useState, useEffect } from "react";
import ChallengeInfoCard from "./ChallengeInfoCard";
import RecentSolvers from "./RecentSolvers";
import { api } from "@/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import useAuth from "@/hooks/useAuth";
import ChallengeDetailsArtifacts from "./ChallengeDetailsArtifacts";
import ChallengeDetailsHints from "./ChallengeDetailsHints";
import useAuth from "@/hooks/useAuth";
import LinkifyText from "@/components/LinkifyText";

const menuItems = [
  { id: 1, href: "#recent-solvers", text: "Recent Solvers", isActive: true },
  { id: 2, href: "#artifacts", text: "Artifacts", isActive: false },
  { id: 3, href: "#hints", text: "Hints", isActive: false },
];

const badgeClasses = [
  "bg-green-1 text-dark-1",
  "bg-dark-4 text-white",
  "bg-dark-5 text-white",
  "bg-purple-1 text-white",
  "bg-orange-1 text-white",
  "bg-light-9 text-dark-1",
  "bg-yellow-3 text-black",
  "bg-purple-4 text-black",
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
          navigate("not-found", { replace: true });
        } else {
          toast.error(
            "Something went wrong getting challenge details. Please try again later"
          );
        }
        setChallengeDetails(null);
      }
    };

    const checkChallengeStatus = async () => {
      if (isManager) {
        setIsSubmissionDisabled(true);
        return;
      }

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
  }, [id, isManager, navigate]);

  return (
    <>
      {challengeDetails === undefined ? (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3 style={{ fontSize: "30px", textAlign: "center" }}>
            Challenge Loading...
          </h3>
          <img src="/assets/img/general/loading.gif" alt="Loading..." />
        </div>
      ) : challengeDetails === null ? (
        <div
          style={{
            minHeight: "90vh",
            marginTop: "100px",
          }}
        >
          <section
            className="no-page layout-pt-lg layout-pb-lg "
            style={{ marginTop: "0px", paddingTop: "0px" }}
          >
            <div className="container">
              <div className="row y-gap-50 justify-center items-center">
                <h3 className="text-30 lh-15" style={{ textAlign: "center" }}>
                  Challenge Not Found...
                </h3>
                <div className="col-lg-6 text-center">
                  <div className="no-page__img">
                    <img
                      src="/assets/img/about/contact/searching.gif"
                      alt="image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
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
                      style={{
                        whiteSpace: "pre-line",
                        fontFamily: "monospace",
                      }}
                    >
                      <LinkifyText text={challengeDetails?.description} />
                    </p>

                    <div
                      className="tag-container"
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px", // Slightly larger gap for better spacing
                        marginTop: "30px",
                        justifyContent: "flex-start", // Left-aligned by default
                        width: "100%",
                        padding: "0",
                        boxSizing: "border-box",
                      }}
                    >
                      {challengeDetails?.tags.map((tag, index) => (
                        <div
                          key={index}
                          className="tag-wrapper"
                          style={{
                            flex: "1 1 calc(25% - 16px)", // Adjust for responsive layout
                            maxWidth: "120px", // Ensure the maximum width for larger screens
                            minWidth: "70px", // Maintain readability for smaller tags
                            height: "auto",
                            margin: "4px", // Consistent spacing
                            boxSizing: "border-box",
                          }}
                        >
                          <div
                            className={`badge text-11 fw-100 ${
                              badgeClasses[index % badgeClasses.length]
                            }`}
                            style={{
                              display: "flex", // Full flexibility for content alignment
                              justifyContent: "center",
                              alignItems: "center",
                              width: "100%", // Utilize the full width of the parent
                              height: "30px", // Slightly taller for better readability
                              padding: "0 12px", // Add horizontal padding for longer text
                              borderRadius: "20px",
                              textAlign: "center",
                              boxSizing: "border-box",
                              overflow: "hidden", // Prevent text overflow
                              whiteSpace: "nowrap", // Prevent wrapping
                              textOverflow: "ellipsis", // Add ellipsis for overflowing text
                            }}
                          >
                            {tag}
                          </div>
                        </div>
                      ))}
                      <style>{`
                        @media screen and (max-width: 1024px) {
                          .tag-wrapper {
                            flex: 1 1 calc(33% - 16px); /* Adjust for medium screens */
                            maxWidth: 120px; /* Reduce max width for smaller screens */
                          }

                          .badge {
                            font-size: 0.875rem; /* Slightly smaller font */
                          }
                        }

                        @media screen and (max-width: 768px) {
                          .tag-wrapper {
                            flex: 1 1 calc(50% - 16px); /* Adjust for smaller screens */
                            maxWidth: 100px;
                          }

                          .badge {
                            font-size: 0.75rem; /* Smaller font for narrow screens */
                          }
                        }

                        @media screen and (max-width: 480px) {
                          .tag-wrapper {
                            flex: 1 1 calc(100% - 16px); /* Full width for very small screens */
                            maxWidth: 100%; /* Remove fixed width constraints */
                          }

                          .badge {
                            font-size: 0.75rem; /* Keep text readable on small devices */
                            height: 28px; /* Reduce badge height */
                          }
                        }
                      `}</style>
                    </div>

                    <form
                      className="ctf-flag-form mt-50"
                      onSubmit={handleSubmit}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "12px",
                        color: "white",
                        flexWrap: "wrap", // Make sure it wraps if needed
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                          flex: "1",
                          minWidth: "200px", // Ensure it stays responsive
                        }}
                      >
                        <input
                          required
                          type="text"
                          value={flag}
                          onChange={(e) => setFlag(e.target.value)}
                          name="PWNEU{FLAG}"
                          placeholder="PWNEU{FLAG}"
                          maxLength="100"
                          autoComplete="off"
                          style={{
                            color: "white",
                            backgroundColor: "transparent",
                            border: "1px solid white",
                            padding: "7px",
                            borderRadius: "5px",
                            fontSize: "14px",
                            width: "100%", // Ensure input takes up full width
                            fontFamily: "monospace",
                          }}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={
                          isManager ||
                          isSubmittingTooOften ||
                          isSubmitting ||
                          isSubmissionDisabled ||
                          alreadySolved ||
                          !flag
                        }
                        style={{
                          backgroundColor:
                            isSubmittingTooOften ||
                            isSubmitting ||
                            isSubmissionDisabled ||
                            alreadySolved ||
                            !flag
                              ? "#EBEAFE"
                              : "#cff721",
                          color: "black",
                          border: "none",
                          padding: "8px 19px",
                          borderRadius: "2px",
                          cursor:
                            isSubmittingTooOften ||
                            isSubmitting ||
                            isSubmissionDisabled ||
                            alreadySolved ||
                            !flag
                              ? "not-allowed"
                              : "pointer",
                          fontSize: "14px",
                        }}
                      >
                        {isManager
                          ? "Not A Player!"
                          : isSubmittingTooOften
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
