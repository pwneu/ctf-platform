import { Form, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { api } from "@/api";
import { toast } from "react-toastify";

export default function IsTurnstileEnabled({
  identityConfigurations,
  setIdentityConfigurations,
  isAdmin,
  isBusy,
  setIsBusy,
  handleApiError,
}) {
  const [isEnablingTurnstile, setIsEnablingTurnstile] = useState(false);

  const [isTurnstileSetModalVisible, setIsTurnstileSetModalVisbile] =
    useState(false);

  const isTurnstileEnabledConfig = identityConfigurations.find(
    (config) => config.key === "IsTurnstileEnabled"
  );

  const handleTurnstileSwitchChanged = (isTurningOn) => {
    setIsEnablingTurnstile(isTurningOn);
    setIsTurnstileSetModalVisbile(true);
  };

  const handleConfirmTurnstileChange = async () => {
    try {
      setIsBusy(true);
      const url = isEnablingTurnstile
        ? "/identity/configurations/isTurnstileEnabled/enable"
        : "/identity/configurations/isTurnstileEnabled/disable";

      await api.put(url);
      setIsTurnstileSetModalVisbile(false);

      if (isEnablingTurnstile) {
        toast.success("Turnstile has been enabled successfully!");
      } else {
        toast.success("Turnstile has been disabled successfully!");
      }

      const response = await api.get("/identity/configurations");
      setIdentityConfigurations(response.data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsBusy(false);
    }
  };
  return (
    <>
      {isTurnstileEnabledConfig && (
        <Form.Group controlId="isTurnstileEnabled">
          <Form.Label>Is Turnstile Enabled</Form.Label>
          <Form.Check
            type="switch"
            label={
              isTurnstileEnabledConfig.value === "true" ? "Enabled" : "Disabled"
            }
            checked={isTurnstileEnabledConfig.value === "true"}
            onChange={(e) => handleTurnstileSwitchChanged(e.target.checked)}
            disabled={!isAdmin}
          />
        </Form.Group>
      )}

      {/* Modal for enabling or disabling turnstile*/}
      <Modal
        show={isTurnstileSetModalVisible}
        onHide={() => setIsTurnstileSetModalVisbile(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEnablingTurnstile
            ? "Are you sure you want to enable turnstile?"
            : "Are you sure you want to disable turnstile?"}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsTurnstileSetModalVisbile(false)}
            disabled={isBusy}
          >
            {isBusy ? "Loading..." : "Cancel"}
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmTurnstileChange}
            disabled={isBusy}
          >
            {isBusy ? "Loading..." : "Confirm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
