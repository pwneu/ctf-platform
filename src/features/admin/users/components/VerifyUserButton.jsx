import { Button, Spinner, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function VerifyUserButton({
  userDetailsEmailConfirmed,
  getUserDetails,
  userDetailsId,
}) {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);
  const [showConfirmVerifyModal, setShowConfirmVerifyModal] = useState(false);

  const handleVerifyClick = () => {
    setShowConfirmVerifyModal(true);
  };

  const confirmVerify = async () => {
    setIsVerifying(true);
    try {
      await api.put(`/identity/users/${userDetailsId}/verify`);
      toast.success(`User verified successfully: ${userDetailsId}`);
      getUserDetails(userDetailsId);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 403) {
        toast.error("You are not allowed to verify a user");
      } else if (status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error verifying user. Please try again later");
      }
    } finally {
      setShowConfirmVerifyModal(false);
      setIsVerifying(false);
    }
  };

  return (
    <>
      <Button
        className="ml-3 mb-1"
        variant="success"
        onClick={handleVerifyClick}
        disabled={userDetailsEmailConfirmed || isVerifying}
      >
        {isVerifying ? (
          <Spinner animation="border" size="sm" />
        ) : (
          <FontAwesomeIcon icon={faCheck} />
        )}{" "}
        {isVerifying ? "Verifying..." : "Verify User"}
      </Button>

      <Modal
        show={showConfirmVerifyModal}
        onHide={() => setShowConfirmVerifyModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm User Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to verify this user?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmVerifyModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmVerify}>
            {isVerifying ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Verify User"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
