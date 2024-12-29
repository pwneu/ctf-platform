import { Form, Button, Card, Badge, Table, Modal } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";

export default function EditChallenge({
  challengeDetails,
  formData,
  handleInputChange,
  handleSave,
  handleReset,
  setFormData,
}) {
  const navigate = useNavigate();
  const [tagInput, setTagInput] = useState("");
  const [flagInput, setFlagInput] = useState("");
  const [visibleFlags, setVisibleFlags] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleTagAdd = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleTagRemove = (tag) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((t) => t !== tag),
    }));
  };

  const handleFlagAdd = () => {
    if (flagInput.trim() && !formData.flags.includes(flagInput.trim())) {
      setFormData((prevData) => ({
        ...prevData,
        flags: [...prevData.flags, flagInput.trim()],
      }));
      setFlagInput("");
    }
  };

  const handleFlagRemove = (flag) => {
    if (formData.flags.length > 1) {
      setFormData((prevData) => ({
        ...prevData,
        flags: prevData.flags.filter((f) => f !== flag),
      }));
    }
  };

  const toggleFlagVisibility = (index) => {
    setVisibleFlags((prevVisibleFlags) => ({
      ...prevVisibleFlags,
      [index]: !prevVisibleFlags[index],
    }));
  };

  const handleDeadlineToggle = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      deadlineEnabled: e.target.checked,
    }));
  };

  const handleDeleteChallenge = async () => {
    setIsDeleting(true);
    try {
      await api.delete(`/play/challenges/${challengeDetails.id}`);
      toast.success(`Challenge deleted successfully: ${challengeDetails.id}`);
      navigate("/admin/challenges");
    } catch (error) {
      if (error.response) {
        const status = error.response.status;

        if (status === 401) {
          navigate("/login");
        } else if (status === 403) {
          toast.error("You are not allowed to do that");
        } else if (status === 429) {
          toast.warn("Slow down!");
        } else {
          toast.error(`${error.response?.data?.message || error.message}`);
        }
      } else if (error.request) {
        toast.error("No response received.");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setShowDeleteModal(false);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Card>
        <Card.Header>
          <h4>Edit Challenge</h4>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="formPoints">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={challengeDetails.categoryName}
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="formPoints">
              <Form.Label>Challenge Id</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={challengeDetails.id}
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="formChallengeName">
              <Form.Label>Challenge Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formPoints">
              <Form.Label>Points</Form.Label>
              <Form.Control
                type="number"
                name="points"
                value={formData.points}
                readOnly
              />
            </Form.Group>

            {/* Switch for Deadline Enabled */}
            <Form.Group controlId="formDeadlineEnabled">
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Enable Deadline"
                checked={formData.deadlineEnabled}
                onChange={handleDeadlineToggle}
              />
            </Form.Group>

            {/* Date Input for Deadline */}
            {formData.deadlineEnabled && (
              <Form.Group controlId="formDeadline">
                <Form.Label>Deadline</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="deadline"
                  value={new Date(formData.deadline).toISOString().slice(0, 16)}
                  onChange={handleInputChange}
                />
              </Form.Group>
            )}

            <Form.Group controlId="formMaxAttempts">
              <Form.Label>Max Attempts</Form.Label>
              <Form.Control
                type="number"
                name="maxAttempts"
                value={formData.maxAttempts || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Tag Input with Add Button */}
            <Form.Group controlId="formTags">
              <Form.Label>Tags</Form.Label>
              <div className="d-flex mb-2">
                <Form.Control
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                />
                <Button
                  variant="success"
                  onClick={handleTagAdd}
                  className="ms-2"
                >
                  +
                </Button>
              </div>

              {/* Render Tags */}
              <div>
                {formData.tags.map((tag, index) => (
                  <Badge key={index} pill bg="secondary" className="me-2">
                    {tag}{" "}
                    <span
                      onClick={() => handleTagRemove(tag)}
                      style={{ cursor: "pointer", marginLeft: "5px" }}
                    >
                      &times;
                    </span>
                  </Badge>
                ))}
              </div>
            </Form.Group>

            {/* Flag Input with Add Button */}
            <Form.Group controlId="formFlags">
              <Form.Label>Flags</Form.Label>
              <div className="d-flex mb-2">
                <Form.Control
                  type="text"
                  value={flagInput}
                  onChange={(e) => setFlagInput(e.target.value)}
                  placeholder="Add a flag"
                />
                <Button
                  variant="success"
                  onClick={handleFlagAdd}
                  className="ms-2"
                >
                  +
                </Button>
              </div>

              {/* Render Flags Section */}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ width: "80%" }}>Flag</th>
                    <th style={{ width: "20%" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.flags.length > 0 ? (
                    formData.flags.map((flag, index) => (
                      <tr key={index}>
                        <td>
                          <Button
                            variant="link"
                            onClick={() => toggleFlagVisibility(index)}
                            className="p-0 me-2"
                          >
                            <FontAwesomeIcon
                              icon={visibleFlags[index] ? faEye : faEyeSlash}
                            />
                          </Button>
                          {visibleFlags[index] ? flag : "Content hidden"}
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleFlagRemove(flag)}
                            disabled={formData.flags.length === 1} // Disable if only one flag left
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center">
                        No flags available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Form.Group>

            <Button variant="primary" onClick={handleSave} className="me-2">
              Save
            </Button>
            <Button variant="secondary" onClick={handleReset}>
              Reset
            </Button>
            <Button
              variant="danger"
              onClick={() => setShowDeleteModal(true)}
              className="ms-2"
            >
              Delete
            </Button>
          </Form>
        </Card.Body>

        {/* Delete Confirmation Modal */}
        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          aria-labelledby="confirmDeleteModalLabel"
        >
          <Modal.Header closeButton>
            <Modal.Title id="confirmDeleteModalLabel">
              Confirm Deletion
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this challenge? This action is
            irreversible.
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteChallenge}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </>
  );
}
