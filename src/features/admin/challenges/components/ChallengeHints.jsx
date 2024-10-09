import { useEffect, useState } from "react";
import { Card, Table, Button, Modal, Form } from "react-bootstrap";
import { api } from "@/api";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function ChallengeHints({ challengeId }) {
  const [hints, setHints] = useState([]);
  const [visibleHints, setVisibleHints] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newHint, setNewHint] = useState({ content: "", deduction: 0 });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [hintToDelete, setHintToDelete] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getHints = async (id) => {
    try {
      const response = await api.get(`/play/challenges/${id}/hints`);
      setHints(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong getting challenge hints. Please try again later"
      );
    }
  };

  useEffect(() => {
    if (challengeId) {
      getHints(challengeId);
    }
  }, [challengeId]);

  const toggleHintVisibility = (hintId) => {
    setVisibleHints((prevVisibleHints) => ({
      ...prevVisibleHints,
      [hintId]: !prevVisibleHints[hintId],
    }));
  };

  const handleCreateHint = async () => {
    setIsCreating(true);
    try {
      const response = await api.post(
        `/play/challenges/${challengeId}/hints`,
        newHint
      );
      toast.success(`Hint created: ${response.data}`);

      // Refresh the hints list after creation
      await getHints(challengeId);

      setShowModal(false);
      setNewHint({ content: "", deduction: 0 });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating hint");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteHint = async () => {
    setIsDeleting(true);
    try {
      await api.delete(`/play/hints/${hintToDelete}`);
      toast.success(`Hint deleted: ${hintToDelete}`);

      // Refresh the hints list after deletion
      await getHints(challengeId);

      setShowDeleteModal(false);
      setHintToDelete(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting hint");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Hints</Card.Title>
          <Button
            onClick={() => setShowModal(true)}
            className="mb-3"
            disabled={isCreating}
          >
            Add Hint
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{ width: "60%" }}>Hint Content</th>
                <th style={{ width: "20%" }}>Deduction</th>
                <th style={{ width: "20%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hints.length > 0 ? (
                hints.map((hint) => (
                  <tr key={hint.id}>
                    <td>
                      <Button
                        variant="link"
                        onClick={() => toggleHintVisibility(hint.id)}
                        className="p-0 me-2"
                      >
                        <FontAwesomeIcon
                          icon={visibleHints[hint.id] ? faEye : faEyeSlash}
                        />
                      </Button>
                      {visibleHints[hint.id] ? hint.content : "Content hidden"}
                    </td>
                    <td>{hint.deduction} points</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => {
                          setHintToDelete(hint.id);
                          setShowDeleteModal(true);
                        }}
                        disabled={isDeleting}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No hints available.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Create Hint Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Hint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="hintContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                value={newHint.content}
                onChange={(e) =>
                  setNewHint({ ...newHint, content: e.target.value })
                }
                placeholder="Enter hint content"
                disabled={isCreating}
              />
            </Form.Group>
            <Form.Group controlId="hintDeduction">
              <Form.Label>Deduction</Form.Label>
              <Form.Control
                type="number"
                value={newHint.deduction}
                onChange={(e) =>
                  setNewHint({
                    ...newHint,
                    deduction: Number(e.target.value),
                  })
                }
                placeholder="Enter deduction points"
                disabled={isCreating}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleCreateHint}
            disabled={isCreating}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this hint?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteHint}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
