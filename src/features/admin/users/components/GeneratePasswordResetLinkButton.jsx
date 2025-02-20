import { Button, Spinner, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function GeneratePasswordResetLinkButton({ userDetailsId }) {
  const navigate = useNavigate();
  const [
    showConfirmGeneratePasswordResetLink,
    setShowConfirmGeneratePasswordResetLink,
  ] = useState(false);
  const [isGeneratingPasswordResetToken, setIsGeneratingPasswordResetToken] =
    useState(false);

  const handleGenerateClick = () => {
    setShowConfirmGeneratePasswordResetLink(true);
  };

  const confirmGenerate = async () => {
    setIsGeneratingPasswordResetToken(true);
    try {
      const response = await api.post(
        `/identity/users/${userDetailsId}/resetPassword`
      );
      await navigator.clipboard.writeText(response.data);
      toast.success("Password reset link copied to clipboard!");
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error generating. Please try again later");
      }
    } finally {
      setShowConfirmGeneratePasswordResetLink(false);
      setIsGeneratingPasswordResetToken(false);
    }
  };

  return (
    <>
      <Button
        className="ml-3 mb-1"
        variant="secondary"
        onClick={handleGenerateClick}
        disabled={isGeneratingPasswordResetToken}
      >
        {isGeneratingPasswordResetToken ? (
          <Spinner animation="border" size="sm" />
        ) : (
          <FontAwesomeIcon icon={faClipboard} />
        )}{" "}
        {isGeneratingPasswordResetToken
          ? "Generating..."
          : "Generate Password Reset Link"}
      </Button>
      <Modal
        show={showConfirmGeneratePasswordResetLink}
        onHide={() => setShowConfirmGeneratePasswordResetLink(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Password Reset Link Generation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Do you want to generate a password reset link? It will be copied to
            your clipboard
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmGeneratePasswordResetLink(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmGenerate}>
            {isGeneratingPasswordResetToken ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Generate"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
