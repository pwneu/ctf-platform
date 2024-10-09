import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";

export default function CreateCategory({ show, onHide, onSuccess }) {
  const navigate = useNavigate();
  const [isBusy, setIsBusy] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (isBusy) return;

    setIsBusy(true);

    try {
      const response = await api.post("/play/categories", {
        name,
        description,
      });
      toast.success(`Category created successfully: ${response.data}`);
      onSuccess({ id: response.data, name, description });

      setName("");
      setDescription("");
      onHide();
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 403) {
        toast.error("You are not allowed to create categories");
      } else if (status === 400) {
        toast.error(error.response.data.message || "Error creating category");
      } else {
        toast.error("Something went wrong. Please try again later");
      }
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} aria-labelledby="createCategoryModal">
      <Modal.Header closeButton>
        <Modal.Title id="createCategoryModal">Create Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleCreateCategory}>
          <Form.Group controlId="formCategoryName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCategoryDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isBusy}>
              {isBusy ? "Creating..." : "Create"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
