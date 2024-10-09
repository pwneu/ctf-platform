import { Table, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faClipboard,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AccessKeysList({
  accessKeys,
  isBusy,
  onDeleteKey,
  isAdmin,
}) {
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);

  const handleDeleteClick = (key) => {
    setSelectedKey(key);
    setShowConfirmDeleteModal(true);
  };

  const confirmDelete = () => {
    onDeleteKey(selectedKey);
    setShowConfirmDeleteModal(false);
  };

  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id).then(
      () => {
        toast.info("Access Key ID copied to clipboard");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <>
      <Table bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Reusable</th>
            <th>Expiration</th>
            <th>For Manager</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accessKeys.map((key) => (
            <tr key={key.id}>
              <td>{key.id}</td>
              <td>{key.canBeReused ? "Yes" : "No"}</td>
              <td>{new Date(key.expiration).toLocaleString()}</td>
              <td>{key.forManager ? "Yes" : "No"}</td>
              <td>
                <Button
                  variant="outline-secondary"
                  onClick={() => copyToClipboard(key.id)}
                  disabled={isBusy}
                  className="me-2"
                >
                  <FontAwesomeIcon icon={faClipboard} /> {"Copy ID"}
                </Button>
                {isAdmin && (
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(key)}
                    disabled={isBusy}
                  >
                    <FontAwesomeIcon icon={faTrash} />{" "}
                    {isBusy ? "Deleting..." : "Delete"}
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        show={showConfirmDeleteModal}
        onHide={() => setShowConfirmDeleteModal(false)}
        aria-labelledby="confirmModalLabel"
      >
        <Modal.Header closeButton>
          <Modal.Title id="confirmModalLabel">Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this access key?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmDeleteModal(false)}
            disabled={isBusy}
          >
            <FontAwesomeIcon icon={faTimes} /> Cancel
          </Button>
          {isAdmin && (
            <Button variant="danger" onClick={confirmDelete} disabled={isBusy}>
              <FontAwesomeIcon icon={faTrash} />{" "}
              {isBusy ? "Deleting..." : "Delete"}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
