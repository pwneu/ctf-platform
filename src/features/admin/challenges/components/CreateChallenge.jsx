import { useState, useEffect, useLayoutEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";

export default function CreateChallenge({ show, onHide, onSuccess }) {
  useLayoutEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/css/CreateChallenge.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryId: "",
    name: "",
    description: "",
    points: 0, // Default to 0
    deadlineEnabled: false,
    deadline: new Date().toISOString(), // Default to current UTC time
    maxAttempts: 0, // Default to 0
    tags: [],
    flags: [],
  });
  const [tagInput, setTagInput] = useState("");
  const [flagInput, setFlagInput] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/play/categories/all");
        setCategories(response.data);
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
            toast.error(
              `Error fetching categories: ${
                error.response?.data?.message || error.message
              }`
            );
          }
        } else if (error.request) {
          toast.error("No response received.");
        } else {
          toast.error(`Error: ${error.message}`);
        }
      }
    };

    fetchCategories();
  }, [navigate]);

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleAddFlag = () => {
    if (flagInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        flags: [...prev.flags, flagInput.trim()],
      }));
      setFlagInput("");
    }
  };

  const handleRemoveTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveFlag = (index) => {
    setFormData((prev) => ({
      ...prev,
      flags: prev.flags.filter((_, i) => i !== index),
    }));
  };

  const handleCreateChallenge = async () => {
    setLoading(true); // Set loading to true
    try {
      const response = await api.post(
        `/play/categories/${formData.categoryId}/challenges`,
        formData
      );
      toast.success(`Challenge created successfully: ${response.data}`);
      onSuccess(response.data); // Call the onCreate callback with the created challenge ID
      onHide(); // Close the modal
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
          toast.error(
            `Error creating challenge: ${
              error.response?.data?.message || error.message
            }`
          );
        }
      } else if (error.request) {
        toast.error("No response received.");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const isFormValid = () => {
    return (
      formData.categoryId &&
      formData.name.trim() &&
      formData.description.trim() &&
      formData.flags.length > 0
    );
  };

  const selectAll = (e) => {
    e.target.select();
  };

  const handleNameChange = (e) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleDescriptionChange = (e) => {
    setFormData((prev) => ({ ...prev, description: e.target.value }));
  };

  const handlePointsChange = (e) => {
    const numericValue = Number(e.target.value);
    setFormData((prev) => ({
      ...prev,
      points: numericValue < 0 ? 0 : numericValue,
    }));
  };

  const handleMaxAttemptsChange = (e) => {
    const numericValue = Number(e.target.value);
    setFormData((prev) => ({
      ...prev,
      maxAttempts: numericValue < 0 ? 0 : numericValue,
    }));
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create Challenge</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formChallengeCategory">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="categoryId"
              value={formData.categoryId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, categoryId: e.target.value }))
              }
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formChallengeName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleNameChange}
              placeholder="Enter challenge name"
              required
              onFocus={selectAll} // Select all on focus
            />
          </Form.Group>

          <Form.Group controlId="formChallengeDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleDescriptionChange}
              placeholder="Enter challenge description"
              required
              onFocus={selectAll} // Select all on focus
            />
          </Form.Group>

          <Form.Group controlId="formChallengePoints">
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              name="points"
              value={formData.points || ""}
              onChange={handlePointsChange}
              placeholder="0"
              required
              onFocus={selectAll} // Select all on focus
            />
          </Form.Group>

          <Form.Group controlId="formDeadlineEnabled">
            <Form.Check
              type="checkbox"
              name="deadlineEnabled"
              label="Enable Deadline"
              checked={formData.deadlineEnabled}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  deadlineEnabled: e.target.checked,
                }))
              }
            />
          </Form.Group>

          {formData.deadlineEnabled && (
            <Form.Group controlId="formChallengeDeadline">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="datetime-local"
                name="deadline"
                value={formData.deadline.split(".")[0]} // Format for input
                onChange={(e) => {
                  const utcDate = new Date(e.target.value).toISOString();
                  setFormData((prev) => ({ ...prev, deadline: utcDate }));
                }}
                onFocus={selectAll} // Select all on focus
              />
            </Form.Group>
          )}

          <Form.Group controlId="formMaxAttempts">
            <Form.Label>Max Attempts</Form.Label>
            <Form.Control
              type="number"
              name="maxAttempts"
              value={formData.maxAttempts || ""}
              onChange={handleMaxAttemptsChange}
              placeholder="0 (Unlimited)"
              onFocus={selectAll} // Select all on focus
            />
          </Form.Group>

          {/* Tags Section */}
          <Form.Group controlId="formTags">
            <Form.Label>Tags</Form.Label>
            <div className="d-flex mb-2">
              <Form.Control
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Enter tag"
              />
              <Button variant="success" onClick={handleAddTag} className="ml-2">
                Add
              </Button>
            </div>
            <div className="tags-container">
              {formData.tags.map((tag, index) => (
                <div key={index} className="tag-item">
                  {tag}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveTag(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </Form.Group>

          {/* Flags Section */}
          <Form.Group controlId="formFlags">
            <Form.Label>Flags</Form.Label>
            <div className="d-flex mb-2">
              <Form.Control
                type="text"
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                placeholder="Enter flag"
              />
              <Button
                variant="success"
                onClick={handleAddFlag}
                className="ml-2"
              >
                Add
              </Button>
            </div>
            <div className="flags-container">
              {formData.flags.map((flag, index) => (
                <div key={index} className="flag-item">
                  {flag}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveFlag(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleCreateChallenge}
          disabled={loading || !isFormValid()} // Disable if loading or form is invalid
        >
          {loading ? "Creating..." : "Create"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
