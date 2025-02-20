import { Button, Spinner, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function DeleteUserButton({ userDetailsId, cannotBeDeleted }) {
  const navigate = useNavigate();

  const [isDoubleConfirmed, setIsDoubleConfirmed] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const handleDeleteClick = () => {
    setShowConfirmDeleteModal(true);
  };
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!isDoubleConfirmed) {
      setIsDoubleConfirmed(true);
    } else {
      setIsDeleting(true);
      try {
        await api.delete(`/identity/users/${userDetailsId}`);
        toast.success(`User deleted successfully: ${userDetailsId}`);
        navigate("/admin/users");
      } catch (error) {
        const status = error?.response?.status;

        if (status === 401) {
          navigate("/login");
        } else if (status === 403) {
          toast.error("You are not allowed to delete a user");
        } else if (status === 400) {
          toast.error(error.response.data.message || "Error deleting user");
        }
      } finally {
        setShowConfirmDeleteModal(false);
        setIsDoubleConfirmed(false);
        setIsDeleting(false);
      }
    }
  };

  const cancelDelete = () => {
    setIsDoubleConfirmed(false);
    setShowConfirmDeleteModal(false);
  };

  return (
    <>
      <Button
        className="ml-3 mb-1"
        variant="danger"
        onClick={handleDeleteClick}
        disabled={cannotBeDeleted}
      >
        <FontAwesomeIcon icon={faTrash} /> Delete User
      </Button>
      <Modal
        show={showConfirmDeleteModal}
        onHide={cancelDelete}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm User Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isDoubleConfirmed ? (
            <>
              <p>Are you really sure?</p>
              <p>
                This action is irreversible and will delete the user
                permanently.
              </p>
            </>
          ) : (
            <p>Do you want to delete this user?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          {isDoubleConfirmed ? (
            <>
              <Button variant="danger" onClick={confirmDelete}>
                {isDeleting ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Delete User"
                )}
              </Button>
              <Button variant="secondary" onClick={cancelDelete}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" onClick={cancelDelete}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                {isDeleting ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Delete User"
                )}
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
