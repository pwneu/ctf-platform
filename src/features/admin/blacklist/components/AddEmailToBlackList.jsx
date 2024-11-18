import { Modal, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "@/api";

export default function AddEmailToBlackList({ show, onHide, onSuccess }) {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const navigate = useNavigate();
  const [isBusy, setIsBusy] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsValidEmail(validateEmail(emailValue));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBusy) return;

    setIsBusy(true);

    try {
      await api.post("/identity/blacklist", { email });

      toast.success("Email successfully added to blacklist");
      onSuccess();

      setEmail("");
      setIsValidEmail(false);

      onHide();
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 403) {
        toast.error("You are not allowed to add email to blacklist");
      } else if (status === 400) {
        toast.error(
          error.response.data.message || "Error adding email to blacklist"
        );
      } else {
        toast.error(
          "Something went wrong adding email to blacklist. Please try again later"
        );
      }
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} aria-labelledby="createModalLabel">
        <Modal.Header closeButton>
          <Modal.Title id="createModalLabel">
            Add email to blacklist
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="name"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={isBusy || !isValidEmail}
              >
                {isBusy ? "Adding..." : "Add"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
