import { Button, Spinner, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function RecalculateLeaderboardsButton({
  isAdmin,
}) {
  const navigate = useNavigate();

  const [isDoubleConfirmed, setIsDoubleConfirmed] = useState(false);
  const [showConfirmRecalculateModal, setShowConfirmRecalculateModal] =
    useState(false);
  const handleRecalculate = () => {
    setShowConfirmRecalculateModal(true);
  };
  const [isRecalculating, setIsRecalculating] = useState(false);

  const confirmRecalculate = async () => {
    if (!isDoubleConfirmed) {
      setIsDoubleConfirmed(true);
    } else {
      setIsRecalculating(true);
      try {
        await api.delete("/play/leaderboards/recalculate");
        toast.success(
          "Successfully initialized recalculation of leaderboards."
        );
      } catch (error) {
        const status = error?.response?.status;

        if (status === 401) {
          navigate("/login");
        } else if (status === 403) {
          toast.error("You are not allowed to recalculate leaderboards");
        } else if (status === 400) {
          toast.error(
            error.response.data.message || "Error initializing recalculation"
          );
        }
      } finally {
        setShowConfirmRecalculateModal(false);
        setIsDoubleConfirmed(false);
        setIsRecalculating(false);
      }
    }
  };

  const cancelRecalculate = () => {
    setIsDoubleConfirmed(false);
    setShowConfirmRecalculateModal(false);
  };

  return (
    <>
      <Button
        onClick={handleRecalculate}
        className="mb-3 me-2"
        variant="danger"
        disabled={!isAdmin || isRecalculating}
      >
        <FontAwesomeIcon icon={faSyncAlt} className="me-2" />
        {isRecalculating ? "Initializing..." : "Recalculte Leaderboards"}
      </Button>

      <Modal show={showConfirmRecalculateModal} onHide={cancelRecalculate}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Recalculation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isDoubleConfirmed ? (
            <>
              <p>Are you really sure?</p>
              <p>
                {
                  "This action is irreversible and will change all the user's points."
                }
              </p>
            </>
          ) : (
            <p>Do you want to recalculate the leaderboards?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          {isDoubleConfirmed ? (
            <>
              <Button variant="danger" onClick={confirmRecalculate}>
                {isRecalculating ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Recalculate"
                )}
              </Button>
              <Button variant="secondary" onClick={cancelRecalculate}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" onClick={cancelRecalculate}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmRecalculate}>
                {isRecalculating ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Recalculate"
                )}
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
