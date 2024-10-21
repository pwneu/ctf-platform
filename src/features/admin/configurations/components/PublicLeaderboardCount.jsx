import { Form, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { api } from "@/api";
import { toast } from "react-toastify";

export default function PublicLeaderboardCount({
  leaderboardCount,
  setLeaderboardCount,
  initialLeaderboardCount,
  setInitialLeaderboardCount,
  setPlayConfigurations,
  isAdmin,
  isBusy,
  setIsBusy,
  handleApiError,
}) {
  const [isLeaderboardSaveModalVisible, setIsLeaderboardSaveModalVisible] =
    useState(false);

  const handleLeaderboardCountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setLeaderboardCount(value);
    }
  };

  const handleLeaderboardSaveClick = () => {
    setIsLeaderboardSaveModalVisible(true);
  };

  const handleConfirmLeaderboardSave = async () => {
    try {
      setIsBusy(true);
      await api.put(
        `/play/configurations/publicLeaderboardCount?count=${leaderboardCount}`
      );
      toast.success("Leaderboard count updated successfully!");

      const response = await api.get("/play/configurations");
      setPlayConfigurations(response.data);
      setInitialLeaderboardCount(leaderboardCount);
      setIsLeaderboardSaveModalVisible(false);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsBusy(false);
    }
  };
  return (
    <>
      {initialLeaderboardCount && (
        <Form.Group controlId="publicLeaderboardCount" className="mt-3">
          <Form.Label>Public Leaderboard Count</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="text"
              value={leaderboardCount}
              onChange={handleLeaderboardCountChange}
              placeholder="Enter leaderboard count"
              className="me-2"
              disabled={!isAdmin} // Disable input if not admin
            />
            <Button
              variant="primary"
              onClick={handleLeaderboardSaveClick}
              disabled={
                leaderboardCount === initialLeaderboardCount || !isAdmin
              } // Disable if unchanged or not admin
            >
              Save
            </Button>
          </div>
        </Form.Group>
      )}

      {/* Modal for confirming leaderboard count save */}
      <Modal
        show={isLeaderboardSaveModalVisible}
        onHide={() => setIsLeaderboardSaveModalVisible(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Save</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to save the changes to the leaderboard count?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsLeaderboardSaveModalVisible(false)}
            disabled={isBusy}
          >
            {isBusy ? "Loading..." : "Cancel"}
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmLeaderboardSave}
            disabled={isBusy}
          >
            {isBusy ? "Loading..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
