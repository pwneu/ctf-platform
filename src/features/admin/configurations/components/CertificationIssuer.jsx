import { Form, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { api } from "@/api";
import { toast } from "react-toastify";

export default function CertificationIssuer({
  certificationIssuer,
  setCertificationIssuer,
  initialCertificationIssuer,
  setInitialCertificationIssuer,
  setIdentityConfigurations,
  isAdmin,
  isBusy,
  setIsBusy,
  handleApiError,
}) {
  const [isCertificationSaveModalVisible, setIsCertificationSaveModalVisible] =
    useState(false);

  const handleCertifcationSaveClick = () => {
    setIsCertificationSaveModalVisible(true);
  };

  const handleConfirmCertificationIssuerSave = async () => {
    try {
      setIsBusy(true);
      await api.put(
        `/identity/configurations/certificationIssuer?issuerName=${encodeURIComponent(
          certificationIssuer
        )}`
      );
      toast.success("Certification issuer updated successfully!");

      const response = await api.get("/identity/configurations");
      setIdentityConfigurations(response.data);
      setInitialCertificationIssuer(certificationIssuer);
      setIsCertificationSaveModalVisible(false);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <>
      <Form.Group controlId="certificationIssuer" className="mt-3">
        <Form.Label>Certification Issuer</Form.Label>
        <div className="d-flex">
          <Form.Control
            type="text"
            value={certificationIssuer ?? ""}
            onChange={(e) => setCertificationIssuer(e.target.value)}
            placeholder="Enter certification issuer"
            className="me-2"
            disabled={!isAdmin}
          />
          <Button
            variant="primary"
            onClick={handleCertifcationSaveClick}
            disabled={
              !certificationIssuer?.trim() ||
              certificationIssuer === initialCertificationIssuer ||
              !isAdmin
            }
          >
            Save
          </Button>
        </div>
      </Form.Group>

      {/* Modal for confirming certification issuer save */}
      <Modal
        show={isCertificationSaveModalVisible}
        onHide={() => setIsCertificationSaveModalVisible(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Save</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to save the changes to the certification issuer?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsCertificationSaveModalVisible(false)}
            disabled={isBusy}
          >
            {isBusy ? "Loading..." : "Cancel"}
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmCertificationIssuerSave}
            disabled={isBusy}
          >
            {isBusy ? "Loading..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
