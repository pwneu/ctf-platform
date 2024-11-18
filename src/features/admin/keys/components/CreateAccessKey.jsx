import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";

export default function CreateAccessKey({ show, onHide, onSuccess }) {
  const navigate = useNavigate();
  const [isBusy, setIsBusy] = useState(false);
  const [canBeReused, setCanBeReused] = useState(false);
  const [forManager, setForManager] = useState(false);
  const [expiration, setExpiration] = useState("");
  const [minDateTime, setMinDateTime] = useState("");

  useEffect(() => {
    const now = new Date();
    setMinDateTime(now.toISOString().slice(0, 16));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBusy) return;

    setIsBusy(true);

    const localDate = new Date(expiration);
    const utcDate = new Date(localDate.toISOString());

    try {
      const response = await api.post("/identity/keys", {
        forManager,
        canBeReused,
        expiration: utcDate.toISOString(),
      });

      toast.success(`Access Key created successfully: ${response.data}`);
      onSuccess();

      setCanBeReused(false);
      setForManager(false);
      setExpiration("");

      onHide();
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 403) {
        toast.error("You are not allowed to create an access key");
      } else if (status === 400) {
        toast.error(error.response.data.message || "Error creating access key");
      } else {
        toast.error(
          "Something went wrong creating access key. Please try again later"
        );
      }
    } finally {
      setIsBusy(false);
    }
  };

  const isValidExpirationDate = () => {
    const currentDate = new Date();
    const expirationDate = new Date(expiration);
    return expiration && expirationDate > currentDate;
  };

  return (
    <Modal show={show} onHide={onHide} aria-labelledby="createModalLabel">
      <Modal.Header closeButton>
        <Modal.Title id="createModalLabel">Create Access Key</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCanBeReused">
            <Form.Check
              type="checkbox"
              label="Can be reused"
              checked={canBeReused}
              onChange={(e) => setCanBeReused(e.target.checked)}
            />
          </Form.Group>
          <Form.Group controlId="formForManager">
            <Form.Check
              type="checkbox"
              label="For Manager"
              checked={forManager}
              onChange={(e) => setForManager(e.target.checked)}
            />
          </Form.Group>
          <Form.Group controlId="formExpirationDate">
            <Form.Label>Expiration Date</Form.Label>
            <Form.Control
              type="datetime-local"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
              min={minDateTime}
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
              disabled={isBusy || !isValidExpirationDate()}
            >
              {isBusy ? "Creating..." : "Create"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
