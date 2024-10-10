import { Table, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faClipboard,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CategoriesList({
  categories,
  isBusy,
  onDeleteCategory,
  isAdmin,
}) {
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDoubleConfirmed, setIsDoubleConfirmed] = useState(false);

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setShowConfirmDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!isDoubleConfirmed) {
      setIsDoubleConfirmed(true);
    } else {
      onDeleteCategory(selectedCategory);
      setShowConfirmDeleteModal(false);
      setIsDoubleConfirmed(false);
    }
  };

  const cancelDelete = () => {
    setIsDoubleConfirmed(false);
    setShowConfirmDeleteModal(false);
  };

  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id).then(
      () => {
        toast.info("Category ID copied to clipboard");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <Button
                  variant="outline-secondary"
                  onClick={() => copyToClipboard(category.id)}
                  disabled={isBusy}
                  className="me-2"
                >
                  <FontAwesomeIcon icon={faClipboard} /> Copy ID
                </Button>
                {isAdmin && ( // Hide button if not admin
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(category)}
                    disabled={isBusy} // No need to check isAdmin here
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
          {isDoubleConfirmed ? (
            <>
              <p>Are you really sure?</p>
              <p>
                This action is irreversible and will delete the challenges in
                this category.
              </p>
            </>
          ) : (
            <p>
              Do you want to delete the category &quot;
              {selectedCategory?.name}&quot;?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          {isDoubleConfirmed ? (
            <>
              <Button
                variant="danger"
                onClick={confirmDelete}
                disabled={isBusy || !isAdmin}
              >
                <FontAwesomeIcon icon={faTrash} />{" "}
                {isBusy ? "Deleting..." : "Delete"}
              </Button>
              <Button
                variant="secondary"
                onClick={cancelDelete}
                disabled={isBusy}
              >
                <FontAwesomeIcon icon={faTimes} /> Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={cancelDelete}
                disabled={isBusy}
              >
                <FontAwesomeIcon icon={faTimes} /> Cancel
              </Button>
              <Button
                variant="danger"
                onClick={confirmDelete}
                disabled={isBusy || !isAdmin}
              >
                <FontAwesomeIcon icon={faTrash} />{" "}
                {isBusy ? "Deleting..." : "Delete"}
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
