import { useState } from "react";
import { Card, Row, Col, Button, Spinner, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEye,
  faEyeSlash,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { api } from "@/api";

export default function UserDetails({
  userDetails,
  userEmail,
  isAdmin,
  navigate,
  getUserDetails,
}) {
  const [showEmail, setShowEmail] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showConfirmVerifyModal, setShowConfirmVerifyModal] = useState(false);
  const [isDoubleConfirmed, setIsDoubleConfirmed] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!isDoubleConfirmed) {
      setIsDoubleConfirmed(true);
    } else {
      setIsDeleting(true);
      try {
        await api.delete(`/identity/users/${userDetails.id}`);
        toast.success(`User deleted successfully: ${userDetails.id}`);
        navigate("/admin/users");
      } catch (error) {
        const status = error?.response?.status;

        if (status === 401) {
          navigate("/login");
        } else if (status === 403) {
          toast.error("You are not allowed to delete a user");
        } else if (status === 400) {
          toast.error(error.response.data.message || "Error deleting user");
        }
      } finally {
        setShowConfirmDeleteModal(false);
        setIsDoubleConfirmed(false);
        setIsDeleting(false);
      }
    }
  };

  const handleVerifyClick = () => {
    setShowConfirmVerifyModal(true);
  };

  const confirmVerify = async () => {
    setIsVerifying(true);
    try {
      await api.put(`/identity/users/${userDetails.id}/verify`);
      toast.success(`User verified successfully: ${userDetails.id}`);
      getUserDetails(userDetails.id);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 403) {
        toast.error("You are not allowed to verify a user");
      } else if (status === 400) {
        toast.error(error.response.data.message || "Error verifying user");
      }
    } finally {
      setShowConfirmVerifyModal(false);
      setIsVerifying(false);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <h2>User Details</h2>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6} className="mb-3">
            <h5>ID</h5>
            <p>{userDetails.id}</p>
          </Col>
          <Col md={6} className="mb-3">
            <h5>Username</h5>
            <p>{userDetails.userName}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <h5>Full Name</h5>
            <p>{userDetails.fullName}</p>
          </Col>
          <Col md={6} className="mb-3">
            <h5>Created At</h5>
            <p>{new Date(userDetails.createdAt).toLocaleString()}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <h5>Email</h5>
            <p>{showEmail ? userEmail : "••••••••••"}</p>
            <Button
              variant="link"
              onClick={() => setShowEmail((prev) => !prev)}
            >
              <FontAwesomeIcon icon={showEmail ? faEyeSlash : faEye} />{" "}
              {showEmail ? "Hide Email" : "Show Email"}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <h5>Verification Status</h5>
            <p>{userDetails.emailConfirmed ? "Verified" : "Not Verified"}</p>
          </Col>
        </Row>
        {isAdmin && (
          <>
            <Button variant="danger" onClick={handleDeleteClick}>
              <FontAwesomeIcon icon={faTrash} /> Delete User
            </Button>
            <Button
              className="ml-3"
              variant="primary"
              onClick={handleVerifyClick}
              disabled={userDetails.emailConfirmed || isVerifying}
            >
              {isVerifying ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <FontAwesomeIcon icon={faCheck} />
              )}{" "}
              {isVerifying ? "Verifying..." : "Verify User"}
            </Button>
          </>
        )}

        {/* Modals */}
        <Modal
          show={showConfirmDeleteModal}
          onHide={() => setShowConfirmDeleteModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm User Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {isDoubleConfirmed ? (
              <>
                <p>Are you really sure?</p>
                <p>
                  This action is irreversible and will delete the user
                  permanently.
                </p>
              </>
            ) : (
              <p>Do you really want to delete this user?</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowConfirmDeleteModal(false)}
            >
              Close
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              {isDeleting ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Delete User"
              )}
            </Button>
          </Modal.Footer>
        </Modal>

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
              Close
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
      </Card.Body>
    </Card>
  );
}
