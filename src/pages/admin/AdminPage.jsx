/* eslint-disable no-useless-escape */
import { useNavigate } from "react-router-dom";
import { api } from "@/api";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { /*useEffect,*/ useEffect, useState } from "react";
import HeaderAdmin from "@/layout/headers/HeaderAdmin";
import {
  Container,
  Form,
  Button,
  Modal,
  Card,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faSync } from "@fortawesome/free-solid-svg-icons";

export default function AdminPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);

  const { auth } = useAuth();
  const navigate = useNavigate();

  const isValidPassword = (password) => {
    const minLengthRegex = /^.{12,}$/; // At least 12 characters
    const maxLengthRegex = /^.{1,128}$/; // Maximum 128 characters
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

    return (
      minLengthRegex.test(password) &&
      maxLengthRegex.test(password) &&
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password) &&
      digitRegex.test(password) &&
      specialCharRegex.test(password)
    );
  };

  const canSubmit =
    currentPassword &&
    newPassword === repeatPassword &&
    isValidPassword(newPassword) &&
    !isBusy;

  const handleChangePassword = async () => {
    try {
      setIsBusy(true);
      const params = new URLSearchParams({
        currentPassword,
        newPassword,
        repeatPassword,
      });

      await api.put(`/identity/me/password?${params.toString()}`);
      toast.success("Password changed successfully!");
      setShowModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setRepeatPassword("");
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowRepeatPassword(false);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 400) {
        toast.error(`Error changing password: ${error.response.data.message}`);
      } else {
        toast.error("Something went wrong. Please try again later");
      }
    } finally {
      setShowModal(false);
      setIsBusy(false);
    }
  };

  const refreshOnlineUsers = async () => {
    try {
      const response = await api.get("/announcements/count");
      setOnlineUsersCount(response.data.connectedUsers);
    } catch (error) {
      toast.error(
        "Something went wrong getting the count of online users. Please try again later"
      );
    }
  };

  useEffect(() => {
    refreshOnlineUsers();
  }, []);

  return (
    <>
      <HeaderAdmin />
      <Container className="text-center mt-3">
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>
              <h3>{`Welcome, ${auth.userName}`}</h3>
              <h4>
                {`Online users count: ${onlineUsersCount}`}
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={refreshOnlineUsers}
                  className="ms-2"
                >
                  <FontAwesomeIcon icon={faSync} />
                </Button>
              </h4>
            </Card.Title>
            <Form className="mt-4">
              <Row className="justify-content-center">
                <Col md={6}>
                  <Form.Group controlId="currentPassword" className="mb-3">
                    <Form.Label>Current Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Enter current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                      />
                      <InputGroup.Text
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        <FontAwesomeIcon
                          icon={showCurrentPassword ? faEye : faEyeSlash}
                        />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group controlId="newPassword" className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        isInvalid={newPassword && !isValidPassword(newPassword)}
                      />
                      <InputGroup.Text
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        <FontAwesomeIcon
                          icon={showNewPassword ? faEye : faEyeSlash}
                        />
                      </InputGroup.Text>
                      <Form.Control.Feedback type="invalid">
                        Password must be at least 12 characters long, include
                        upper and lower case letters, digits, and special
                        characters.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group controlId="repeatPassword" className="mb-3">
                    <Form.Label>Repeat New Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showRepeatPassword ? "text" : "password"}
                        placeholder="Repeat new password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        required
                        isInvalid={
                          repeatPassword && repeatPassword !== newPassword
                        }
                      />
                      <InputGroup.Text
                        onClick={() =>
                          setShowRepeatPassword(!showRepeatPassword)
                        }
                      >
                        <FontAwesomeIcon
                          icon={showRepeatPassword ? faEye : faEyeSlash}
                        />
                      </InputGroup.Text>
                      <Form.Control.Feedback type="invalid">
                        Passwords do not match.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Button
                    variant="primary"
                    onClick={() => setShowModal(true)}
                    disabled={!canSubmit}
                    className="w-100"
                  >
                    Reset Password
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Password Change</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to change your password?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleChangePassword}>
            {isBusy ? "Processing..." : "Confirm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
