import { Button, Spinner, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ShowUserOnLeaderboardsButton({
  userDetailsId,
  getUserDetails,
  getUserRank,
}) {
  const navigate = useNavigate();
  const [isShowingUserOnLeaderboards, setIsShowingUserOnLeaderboards] =
    useState(false);
  const [
    showConfirmShowUserOnLeaderboards,
    setShowConfirmShowUserOnLeaderboards,
  ] = useState(false);

  const handleShowUserOnLeaderboards = () => {
    setShowConfirmShowUserOnLeaderboards(true);
  };

  const confirmShowUserOnLeaderboards = async () => {
    if (isShowingUserOnLeaderboards) return;
    setIsShowingUserOnLeaderboards(true);
    try {
      await api.put(`/play/users/${userDetailsId}/show`);
      toast.success("Successfully made user visible on leaderboards");
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
          "Something went wrong showing user on leaderboards. Please try again later"
        );
      }
    } finally {
      setShowConfirmShowUserOnLeaderboards(false);
      setIsShowingUserOnLeaderboards(false);
    }
  };

  return (
    <>
      <Button
        className="ml-3 mb-1"
        variant="primary"
        onClick={handleShowUserOnLeaderboards}
        disabled={isShowingUserOnLeaderboards}
      >
        {isShowingUserOnLeaderboards ? (
          <Spinner animation="border" size="sm" />
        ) : (
          <FontAwesomeIcon icon={faEye} />
        )}{" "}
        {isShowingUserOnLeaderboards ? "Showing..." : "Show on leaderboards"}
      </Button>

      <Modal
        show={showConfirmShowUserOnLeaderboards}
        onHide={() => setShowConfirmShowUserOnLeaderboards(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Show User on Leaderboards</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to show this user on leaderboards?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmShowUserOnLeaderboards(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmShowUserOnLeaderboards}>
            {isShowingUserOnLeaderboards ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Show"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
