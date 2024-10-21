import { Form, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { api } from "@/api";
import { toast } from "react-toastify";

export default function SubmissionsAllowed({
  playConfigurations,
  setPlayConfigurations,
  isAdmin,
  isBusy,
  setIsBusy,
  handleApiError,
}) {
  const [isSubmissionModalVisible, setIsSubmissionModalVisible] =
    useState(false);

  const [isEnablingSubmissions, setIsEnablingSubmissions] = useState(false);

  const submissionsAllowedConfig = playConfigurations.find(
    (config) => config.key === "SubmissionsAllowed"
  );

  const handleSubmissionsSwitchChange = (isTurningOn) => {
    setIsEnablingSubmissions(isTurningOn);
    setIsSubmissionModalVisible(true);
  };

  const handleConfirmSubmissionsChange = async () => {
    try {
      setIsBusy(true);
      const url = isEnablingSubmissions
        ? "/play/configurations/submissionsAllowed/allow"
        : "/play/configurations/submissionsAllowed/deny";

      await api.put(url);
      setIsSubmissionModalVisible(false);

      if (isEnablingSubmissions) {
        toast.success("Submissions have been enabled successfully!");
      } else {
        toast.success("Submissions have been disabled successfully!");
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
      {submissionsAllowedConfig && (
        <Form.Group controlId="submissionsAllowed">
          <Form.Label>Submissions Allowed</Form.Label>
          <Form.Check
            type="switch"
            label={
              submissionsAllowedConfig.value === "true" ? "Enabled" : "Disabled"
            }
            checked={submissionsAllowedConfig.value === "true"}
            onChange={(e) => handleSubmissionsSwitchChange(e.target.checked)}
            disabled={!isAdmin}
          />
        </Form.Group>
      )}

      <Modal
        show={isSubmissionModalVisible}
        onHide={() => setIsSubmissionModalVisible(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEnablingSubmissions
            ? "Are you sure you want to enable submissions?"
            : "Are you sure you want to disable submissions?"}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsSubmissionModalVisible(false)}
            disabled={isBusy}
          >
            {isBusy ? "Loading..." : "Cancel"}
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmSubmissionsChange}
            disabled={isBusy}
          >
            {isBusy ? "Loading..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
