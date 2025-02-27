import { Form, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { api } from "@/api";
import { toast } from "react-toastify";

export default function ChallengesLocked({
  playConfigurations,
  setPlayConfigurations,
  isAdmin,
  isBusy,
  setIsBusy,
  handleApiError,
}) {
  const [isChallengesLockedModalVisible, setIsChallengesLockedModalVisible] =
    useState(false);

  const [isLockingChallenges, setIsLockingChallenges] = useState(false);

  const challengesLockedConfig = playConfigurations.find(
    (config) => config.key === "ChallengesLocked"
  );

  const handleSubmissionsSwitchChange = (isTurningOn) => {
    setIsLockingChallenges(isTurningOn);
    setIsChallengesLockedModalVisible(true);
  };

  const handleConfirmSubmissionsChange = async () => {
    try {
      setIsBusy(true);
      const url = isLockingChallenges
        ? "/play/configurations/challengesLocked/lock"
        : "/play/configurations/challengesLocked/unlock";

      await api.put(url);
      setIsChallengesLockedModalVisible(false);

      if (isLockingChallenges) {
        toast.success("Challenges has been locked!");
      } else {
        toast.success("Challenges has been unlocked!");
      }

      const response = await api.get("/play/configurations");
      setPlayConfigurations(response.data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <>
      {challengesLockedConfig && (
        <Form.Group controlId="challengesLocked" style={{ marginTop: "10px" }}>
          <Form.Label>Challenges Locked</Form.Label>
          <Form.Check
            type="switch"
            label={
              challengesLockedConfig.value === "true" ? "Locked" : "Unlocked"
            }
            checked={challengesLockedConfig.value === "true"}
            onChange={(e) => handleSubmissionsSwitchChange(e.target.checked)}
            disabled={!isAdmin}
          />
        </Form.Group>
      )}

      <Modal
        show={isChallengesLockedModalVisible}
        onHide={() => setIsChallengesLockedModalVisible(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLockingChallenges
            ? "Are you sure you want to lock challenges? The admin can still bypass the lock!"
            : "Are you sure you want to unlock challenges?"}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsChallengesLockedModalVisible(false)}
            disabled={isBusy}
          >
            {isBusy ? "Loading..." : "Cancel"}
          </Button>
          <Button
            variant="success"
            onClick={handleConfirmSubmissionsChange}
            disabled={isBusy}
          >
            {isBusy ? "Loading..." : "Confirm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
