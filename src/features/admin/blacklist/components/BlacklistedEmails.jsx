import { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faClipboard, faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function BlacklistedEmails({
  blacklistedEmails,
  isBusy,
  onDeleteBlacklistedEmail,
  isAdmin,
}) {
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleDeleteClick = (email) => {
    setSelectedEmail(email);
    setShowConfirmDeleteModal(true);
  };
  
  const confirmDelete = () => {
    onDeleteBlacklistedEmail(selectedEmail);
    setShowConfirmDeleteModal(false);
  };
  
  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id).then(
      () => {
        toast.info("Email copied to clipboard");
      },
      (err) => {
        console.error("Could not copy email: ", err);
      }
    );
  };

  return (
    <>
      <Table bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blacklistedEmails.map((blacklistedEmail) => (
            <tr key={blacklistedEmail.id}>
              <td>{blacklistedEmail.id}</td>
              <td>{blacklistedEmail.email}</td>
              <td>
                <Button
                  variant="outline-secondary"
                  onClick={() => copyToClipboard(blacklistedEmail.email)}
                  disabled={isBusy}
                  className="me-2"
                >
                  <FontAwesomeIcon icon={faClipboard} /> {"Copy Email"}
                </Button>
                {isAdmin && (
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(blacklistedEmail)}
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
          Are you sure you want to remove this email on the blacklist?
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
