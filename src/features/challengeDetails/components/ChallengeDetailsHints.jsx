import { api } from "@/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

  return (
    <>
      {hints.length > 0 ? (
        hints.map((hint, index) => (
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
        <div className="no-hints-message">No hints available.</div>
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
                onClick={() => handleUseHint(selectedHint)}
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
    </>
  );
}
