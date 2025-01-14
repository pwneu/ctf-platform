import { useState } from "react";
import { Card, Table, Button, Modal, Form } from "react-bootstrap";
import { api } from "@/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ChallengeArtifacts({
  artifacts,
  refreshArtifacts,
  challengeId,
}) {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [artifactToDelete, setArtifactToDelete] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // For disabling buttons

  const handleDeleteArtifact = async () => {
    setIsLoading(true);
    try {
      await api.delete(`/play/artifacts/${artifactToDelete}`);
      toast.success(`Artifact deleted: ${artifactToDelete}`);
      refreshArtifacts();
      setShowDeleteModal(false);
      setArtifactToDelete(null);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Error deleting artifact");
      }
    } finally {
      setIsLoading(false); // Re-enable buttons
    }
  };

  const handleCreateArtifact = async () => {
    if (isLoading || !file) return;
    const formData = new FormData();
    formData.append("file", file);
    setIsLoading(true);

    try {
      const response = await api.post(
        `/play/challenges/${challengeId}/artifacts`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(`Artifact created: ${response.data}`);
      refreshArtifacts();
      setShowCreateModal(false);
      setFile(null);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 400) {
        toast.error(error.response?.data?.message);
      } else if (status === 413) {
        // Nginx file error
        toast.error(
          "The file is too large. Please choose a file smaller than 30 MB."
        );
      } else {
        toast.error("Error creating artifact. Please try again later");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadArtifact = async (artifact) => {
    try {
      const response = await api.get(`/play/artifacts/${artifact.id}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", artifact.fileName || "download");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 404) {
        toast.error(error.response?.data?.message);
      } else if (status === 429) {
        toast.error("Slow down on downloading artifacts!");
      } else {
        toast.error("Error downloading artifact. Please try again later");
      }
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Artifacts</Card.Title>
        <Button
          variant="primary"
          onClick={() => setShowCreateModal(true)}
          className="mb-3"
          disabled={isLoading} // Disable button while loading
        >
          Add Artifact
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: "80%" }}>File Name</th>
              <th style={{ width: "20%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {artifacts.length > 0 ? (
              artifacts.map((artifact) => (
                <tr key={artifact.id}>
                  <td>{artifact.fileName}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => handleDownloadArtifact(artifact)}
                      className="me-2"
                    >
                      Download
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setArtifactToDelete(artifact.id);
                        setShowDeleteModal(true);
                      }}
                      disabled={isLoading} // Disable button while loading
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">
                  No artifacts available.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this artifact?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
              disabled={isLoading} // Disable button while loading
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteArtifact}
              disabled={isLoading} // Disable button while loading
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Create Artifact Modal */}
        <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Artifact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formFile">
                <Form.Label>Upload Artifact (Max 30MB)</Form.Label>
                <Form.Control
                  type="file"
                  accept="*/*" // Allow any file type
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowCreateModal(false)}
              disabled={isLoading} // Disable button while loading
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateArtifact}
              disabled={!file || isLoading} // Disable if no file or loading
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
}
