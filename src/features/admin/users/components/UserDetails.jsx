import { useState } from "react";
import { Card, Row, Col, Button, Spinner, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEye,
  faEyeSlash,
  faCheck,
  faClipboard,
  faDownload,
  faCertificate,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { api } from "@/api";

export default function UserDetails({
  userDetails,
  userEmail,
  userRank,
  isAdmin,
  cannotBeDeleted,
  navigate,
  getUserDetails,
}) {
  const [showEmail, setShowEmail] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showConfirmVerifyModal, setShowConfirmVerifyModal] = useState(false);
  const [
    showConfirmGeneratePasswordResetLink,
    setShowConfirmGeneratePasswordResetLink,
  ] = useState(false);
  const [isDoubleConfirmed, setIsDoubleConfirmed] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isGeneratingPasswordResetToken, setIsGeneratingPasswordResetToken] =
    useState(false);
  const [isGeneratingStatsReport, setIsGeneratingStatsReport] = useState(false);
  const [isDownloadingCertificate, setIsDownloadingCertificate] =
    useState(false);

  const [certFile, setCertFile] = useState(null);
  const [isAddingCertificate, setIsAddingCertificate] = useState(false);
  const [showAddCertificate, setShowAddCertificate] = useState(false);

  const [isResetingCertificate, setIsResettingCertificate] = useState(false);
  const [showConfirmResetCertificate, setShowConfirmResetCertificate] =
    useState(false);

  const userIsMember = userDetails?.roles?.includes("Member");
  const userIsAdmin = userDetails?.roles?.includes("Admin");

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

  const cancelDelete = () => {
    setIsDoubleConfirmed(false);
    setShowConfirmDeleteModal(false);
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
        toast.error(error.response.data.message);
      } else {
        toast.error("Error verifying user. Please try again later");
      }
    } finally {
      setShowConfirmVerifyModal(false);
      setIsVerifying(false);
    }
  };

  const handleGenerateClick = () => {
    setShowConfirmGeneratePasswordResetLink(true);
  };

  const handleAddCertificate = () => {
    setShowAddCertificate(true);
  };

  const handleCertFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setCertFile(selectedFile);
    } else {
      toast.error("Please select a valid PDF file");
    }
  };

  const confirmAddCertificate = async () => {
    if (isAddingCertificate || !certFile) return;
    try {
      setIsAddingCertificate(true);

      const formData = new FormData();
      formData.append("file", certFile);

      const response = await api.post(
        `/identity/users/${userDetails.id}/certificate`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(`Certificate added: ${response.data}`);
      setShowAddCertificate(false);
    } catch (error) {
      const status = error?.response?.status;

      console.log(error.response.data)
      if (status === 401) {
        navigate("/login");
      } else if (status === 400) {
        toast.error(error.response?.data?.message);
      } else if (status === 413) {
        toast.error(
          "The file is too large. Please choose a file smaller than 30 MB."
        );
      } else {
        toast.error("Error adding certificate. Please try again later");
      }
    } finally {
      setIsAddingCertificate(false);
    }
  };

  const downloadCertificate = async () => {
    if (isDownloadingCertificate) return;

    try {
      setIsDownloadingCertificate(true);

      const checkResponse = await api.get(`/identity/users/${userDetails.id}/certificate`);

      if (checkResponse.data === false) {
        toast.error("The user doesn't have a certificate yet");
        return;
      }

      const response = await api.get(
        `/identity/users/${userDetails.id}/certificate`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "pwneu-certificate.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          "Something went wrong getting user certificate. Please try again later"
        );
      }
    } finally {
      setIsDownloadingCertificate(false);
    }
  };

  const handleResetCertificateClick = () => {
    setShowConfirmResetCertificate(true);
  };

  const confirmResetCertificate = async () => {
    if (isResetingCertificate) return;
    setIsResettingCertificate(true);
    try {
      await api.delete(`/identity/users/${userDetails.id}/certificate`);
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

  const confirmGenerate = async () => {
    setIsGeneratingPasswordResetToken(true);
    try {
      const response = await api.post(
        `/identity/users/${userDetails.id}/resetPassword`
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

  const generateStatsReport = async () => {
    if (isGeneratingStatsReport) return;
    try {
      setIsGeneratingStatsReport(true);
      const response = await api.get(`/play/users/${userDetails.id}/stats`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${userDetails.id}_stats-report.html`;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          "Something went wrong generating user stats. Please try again later"
        );
      }
    } finally {
      setIsGeneratingStatsReport(false);
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
        {userIsMember && (
          <Row>
            <Col md={6} className="mb-3">
              <h5>Position</h5>
              <p>
                {userRank === undefined
                  ? "Loading..."
                  : userRank?.position || "Unranked"}
              </p>
            </Col>
            <Col md={6} className="mb-3">
              <h5>Points</h5>
              <p>
                {userRank === undefined
                  ? "Loading..."
                  : userRank?.points || "0"}
              </p>
            </Col>
          </Row>
        )}
        <Row>
          <Col md={6} className="mb-3">
            <h5>Email</h5>
            <p>{showEmail ? userEmail : "••••••••••"}</p>
            <Button
              variant="secondary"
              onClick={() => setShowEmail((prev) => !prev)}
            >
              <FontAwesomeIcon icon={showEmail ? faEyeSlash : faEye} />{" "}
              {showEmail ? "Hide Email" : "Show Email"}
            </Button>
          </Col>
          <Col md={6} className="mb-3">
            <h5>Roles</h5>
            <p>
              {userDetails?.roles && userDetails.roles.length > 0
                ? userDetails.roles.join(", ")
                : "No roles assigned"}
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <h5>Verification Status</h5>
            <p>{userDetails.emailConfirmed ? "Verified" : "Not Verified"}</p>
          </Col>
        </Row>
        {!userIsAdmin && (
          <>
            <Button
              className="ml-3 mb-1"
              variant="success"
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
            {userIsMember && (
              <>
                <Button
                  className="ml-3 mb-1"
                  variant="primary"
                  onClick={generateStatsReport}
                  disabled={isGeneratingStatsReport}
                >
                  {isGeneratingStatsReport ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <FontAwesomeIcon icon={faDownload} />
                  )}{" "}
                  {isGeneratingStatsReport
                    ? "Generating..."
                    : "Generate Stats Report"}
                </Button>

                <Button
                  className="ml-3 mb-1"
                  variant="info"
                  onClick={handleAddCertificate}
                  disabled={isAddingCertificate}
                >
                  {isAddingCertificate ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <FontAwesomeIcon icon={faCertificate} />
                  )}{" "}
                  {isAddingCertificate ? "Adding..." : "Add Certificate"}
                </Button>

                <Button
                  className="ml-3 mb-1"
                  variant="success"
                  onClick={downloadCertificate}
                  disabled={isDownloadingCertificate}
                >
                  {isDownloadingCertificate ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <FontAwesomeIcon icon={faDownload} />
                  )}{" "}
                  {isDownloadingCertificate
                    ? "Downloading..."
                    : "Download Certificate"}
                </Button>

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
              </>
            )}
            {isAdmin && (
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
                <Button
                  className="ml-3 mb-1"
                  variant="danger"
                  onClick={handleDeleteClick}
                  disabled={cannotBeDeleted}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete User
                </Button>
              </>
            )}
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
              <p>Do you want to delete this user?</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            {isDoubleConfirmed ? (
              <>
                <Button variant="danger" onClick={confirmDelete}>
                  {isDeleting ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Delete User"
                  )}
                </Button>
                <Button variant="secondary" onClick={cancelDelete}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button variant="secondary" onClick={cancelDelete}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={confirmDelete}>
                  {isDeleting ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Delete User"
                  )}
                </Button>
              </>
            )}
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

        <Modal
          show={showAddCertificate}
          onHide={() => setShowAddCertificate(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Certificate</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="certificateFile">
                <Form.Label>Upload PDF Certificate (Max 30MB)</Form.Label>
                <Form.Control
                  type="file"
                  accept="application/pdf"
                  onChange={handleCertFileChange}
                  disabled={isAddingCertificate}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowAddCertificate(false)}
              disabled={isAddingCertificate}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={confirmAddCertificate}
              disabled={isAddingCertificate}
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>

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

        <Modal
          show={showConfirmGeneratePasswordResetLink}
          onHide={() => setShowConfirmGeneratePasswordResetLink(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Password Reset Link Generation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Do you want to generate a password reset link? It will be copied
              to your clipboard
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
      </Card.Body>
    </Card>
  );
}
