import { Button, Spinner, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function HideUserOnLeaderboardsButton({
  userDetailsId,
  getUserDetails,
  getUserRank,
}) {
  const navigate = useNavigate();
  const [isHidingUserOnLeaderboards, setIsHidingUserOnLeaderboards] =
    useState(false);
  const [
    showConfirmHideUserOnLeaderboards,
    setShowConfirmHideUserOnLeaderboards,
  ] = useState(false);

  const handleHideUserOnLeaderboardsClick = () => {
    setShowConfirmHideUserOnLeaderboards(true);
  };

  const confirmHideUserOnLeaderboards = async () => {
    if (isHidingUserOnLeaderboards) return;
    setIsHidingUserOnLeaderboards(true);
    try {
      await api.put(`/play/users/${userDetailsId}/hide`);
      toast.success("Successfully hid user from leaderboards");
      getUserDetails(userDetailsId);
      getUserRank(userDetailsId);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          "Something went wrong hiding user on leaderboards. Please try again later"
        );
      }
    } finally {
      setShowConfirmHideUserOnLeaderboards(false);
      setIsHidingUserOnLeaderboards(false);
    }
  };

  return (
    <>
      <Button
        className="ml-3 mb-1"
        variant="secondary"
        onClick={handleHideUserOnLeaderboardsClick}
        disabled={isHidingUserOnLeaderboards}
      >
        {isHidingUserOnLeaderboards ? (
          <Spinner animation="border" size="sm" />
        ) : (
          <FontAwesomeIcon icon={faEyeSlash} />
        )}{" "}
        {isHidingUserOnLeaderboards ? "Hiding..." : "Hide on leaderboards"}
      </Button>

      <Modal
        show={showConfirmHideUserOnLeaderboards}
        onHide={() => setShowConfirmHideUserOnLeaderboards(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Hide User on Leaderboards</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to hide this user on leaderboards?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmHideUserOnLeaderboards(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmHideUserOnLeaderboards}>
            {isHidingUserOnLeaderboards ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Hide"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
