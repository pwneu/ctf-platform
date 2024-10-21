import { Form, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { api } from "@/api";
import { toast } from "react-toastify";

export default function IsCertificationEnabled({
  identityConfigurations,
  setIdentityConfigurations,
  isAdmin,
  isBusy,
  setIsBusy,
  handleApiError,
}) {
  const [isEnablingCertifications, setIsEnablingCertifications] =
    useState(false);

  const [isCertificationSetModalVisible, setIsCertificationSetModalVisbile] =
    useState(false);

  const isCertificationEnabledConfig = identityConfigurations.find(
    (config) => config.key === "IsCertificationEnabled"
  );

  const handleCertificationSwitchChanged = (isTurningOn) => {
    setIsEnablingCertifications(isTurningOn);
    setIsCertificationSetModalVisbile(true);
  };

  const handleConfirmCertificationChange = async () => {
    try {
      setIsBusy(true);
      const url = isEnablingCertifications
        ? "/identity/configurations/isCertificationEnabled/enable"
        : "/identity/configurations/isCertificationEnabled/disable";

      await api.put(url);
      setIsCertificationSetModalVisbile(false);

      if (isEnablingCertifications) {
        toast.success("Certification has been enabled successfully!");
      } else {
        toast.success("Certification has been disabled successfully!");
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
      {isCertificationEnabledConfig && (
        <Form.Group controlId="isCertificationEnabled">
          <Form.Label>Is Certification Enabled</Form.Label>
          <Form.Check
            type="switch"
            label={
              isCertificationEnabledConfig.value === "true"
                ? "Enabled"
                : "Disabled"
            }
            checked={isCertificationEnabledConfig.value === "true"}
            onChange={(e) => handleCertificationSwitchChanged(e.target.checked)}
            disabled={!isAdmin}
          />
        </Form.Group>
      )}

      {/* Modal for enabling or disabling certification*/}
      <Modal
        show={isCertificationSetModalVisible}
        onHide={() => setIsCertificationSetModalVisbile(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEnablingCertifications
            ? "Are you sure you want to enable certifications?"
            : "Are you sure you want to disable certifications?"}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsCertificationSetModalVisbile(false)}
            disabled={isBusy}
          >
            {isBusy ? "Loading..." : "Cancel"}
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmCertificationChange}
            disabled={isBusy}
          >
            {isBusy ? "Loading..." : "Confirm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
