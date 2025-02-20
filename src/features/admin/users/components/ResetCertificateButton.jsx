import { Button, Spinner, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetCertificateButton({ userDetailsId }) {
  const navigate = useNavigate();
  const [isResetingCertificate, setIsResettingCertificate] = useState(false);
  const [showConfirmResetCertificate, setShowConfirmResetCertificate] =
    useState(false);

  const handleResetCertificateClick = () => {
    setShowConfirmResetCertificate(true);
  };

  const confirmResetCertificate = async () => {
    if (isResetingCertificate) return;
    setIsResettingCertificate(true);
    try {
      await api.delete(`/identity/users/${userDetailsId}/certificate`);
      toast.success("Successfully reset user certificate");
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          "Something went wrong resetting user certificate. Please try again later"
        );
      }
    } finally {
      setShowConfirmResetCertificate(false);
      setIsResettingCertificate(false);
    }
  };

  return (
    <>
      <Button
        className="ml-3 mb-1"
        variant="warning"
        onClick={handleResetCertificateClick}
        disabled={isResetingCertificate}
      >
        {isResetingCertificate ? (
          <Spinner animation="border" size="sm" />
        ) : (
          <FontAwesomeIcon icon={faTrash} />
        )}{" "}
        {isResetingCertificate ? "Resetting..." : "Reset Certificate"}
      </Button>

      <Modal
        show={showConfirmResetCertificate}
        onHide={() => setShowConfirmResetCertificate(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Reset User Certificate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to reset the certificate of this user?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmResetCertificate(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmResetCertificate}>
            {isResetingCertificate ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Reset"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
