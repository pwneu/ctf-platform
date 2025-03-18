import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { api } from "@/api";

export default function ChallengeDetailsHints({
  hints,
  alreadySolved,
  setAlreadySolved,
}) {
  const [selectedHint, setSelectedHint] = useState(null);
  const [showConfirmUseHintModal, setShowConfirmUseHintModal] = useState(false);
  const [isUsingHint, setIsUsingHint] = useState(false);
  const navigate = useNavigate();

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
      toast.info(`Hint: ${response.data}`, { autoClose: 10_000 });
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

  return (
    <>
      <>
        {hints.length > 0 ? (
          hints.map((hint, index) => (
            <div
              key={index}
              className="hint-container"
              style={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <button
                onClick={() => handleCheckHintStatus(hint)}
                className="hint-button"
                disabled={isUsingHint}
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  textAlign: "left", // Left-aligned text
                  fontSize: "0.875rem", // Adjust font size for readability
                  padding: "8px 12px", // Add padding for better clickability
                  border: "1px solid #ddd", // Optional: Add border for better visibility
                  borderRadius: "4px", // Add slight rounding for a modern look
                  backgroundColor: isUsingHint ? "#f0f0f0" : "#fff", // Change background based on state
                  cursor: isUsingHint ? "not-allowed" : "pointer",
                }}
              >
                {isUsingHint ? (
                  "Loading..."
                ) : (
                  <>
                    <i className="fa fa-lightbulb-o"></i>
                    {` Use hint (-${hint.deduction} Points)`}
                  </>
                )}
              </button>
            </div>
          ))
        ) : (
          <div
            className="no-hints-message text-dark-1"
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "8px",
              alignItems: "center",
              textAlign: "left", // Ensure left alignment
            }}
          >
            <i className="fa fa-lightbulb-o"></i> No hints available.
          </div>
        )}

        <style>
          {`
            @media screen and (max-width: 768px) {
              .hint-container {
                width: 100%; /* Ensure container takes full width */
              }

              .hint-button {
                font-size: 0.875rem; /* Adjust font size for smaller screens */
                padding: 8px 10px; /* Reduce padding for smaller devices */
              }

              .no-hints-message {
                font-size: 0.875rem;
              }
            }

            @media screen and (max-width: 480px) {
              .hint-button {
                font-size: 0.75rem; /* Smaller font for very small screens */
                padding: 6px 8px; /* Further reduce padding */
              }

              .no-hints-message {
                font-size: 0.75rem;
              }
            }
          `}
        </style>
      </>

      {/* Confirmation Modal */}
      {showConfirmUseHintModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Use Hint?</h3>
            <p className="mt-20">{`This will deduct ${
              selectedHint?.deduction
            } point${
              selectedHint?.deduction === 1 ? "" : "s"
            }. Do you want to proceed?`}</p>
            <div className="modal-buttons">
              <button
                onClick={() => handleUseHint(selectedHint)}
                className="confirm-button mt-20"
                disabled={isUsingHint}
              >
                {isUsingHint ? "Loading..." : "Confirm"}
              </button>
              <button
                onClick={() => setShowConfirmUseHintModal(false)}
                className="cancel-button mt-20"
                disabled={isUsingHint}
              >
                {isUsingHint ? "Loading..." : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        style={{
          minHeight: "50vh",
          marginTop: "200px",
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
        }}
      ></div>
    </>
  );
}
