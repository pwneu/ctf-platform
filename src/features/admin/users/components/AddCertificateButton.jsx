import { Button, Spinner, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddCertificateButton({ userDetailsId }) {
  const navigate = useNavigate();
  const [isAddingCertificate, setIsAddingCertificate] = useState(false);
  const [certFile, setCertFile] = useState(null);
  const [showAddCertificate, setShowAddCertificate] = useState(false);

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
        `/identity/users/${userDetailsId}/certificate`,
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

  return (
    <>
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
    </>
  );
}
