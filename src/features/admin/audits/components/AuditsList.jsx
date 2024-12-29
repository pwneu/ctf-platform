import { Table, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { api } from "@/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AuditsList({ audits, setAudits }) {
  const navigate = useNavigate();
  const [isBusy, setIsBusy] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState();
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  const handleDeleteAudit = (audit) => {
    setSelectedAudit(audit);
    setShowConfirmDeleteModal(true);
  };

  const confirmDeleteAudit = async () => {
    setIsBusy(true);
    try {
      await api.delete(`/play/audits/${selectedAudit.id}`);
      toast.success(`Audit deleted successfully: ${selectedAudit.id}`);
      setAudits((prevAudits) =>
        prevAudits.filter((a) => a.id !== selectedAudit.id)
      );
      setShowConfirmDeleteModal(false);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 403) {
        toast.error("You are not allowed to delete audits");
      } else {
        toast.error(
          error?.response?.data?.message ||
            "Something went wrong deleting audit. Please try again later"
        );
      }
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Username</th>
            <th>User Action</th>
            <th>Performed At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {audits === undefined ? (
            <tr>
              <td colSpan={5} className="text-center">
                Click the search button to view audits.
              </td>
            </tr>
          ) : audits.length > 0 ? (
            audits.map((audit) => (
              <tr key={audit.id}>
                <td>{audit.id}</td>
                <td>{audit.userName}</td>
                <td>{audit.action}</td>
                <td>{audit.performedAt}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteAudit(audit)}
                    disabled={isBusy}
                    className="me-2"
                  >
                    <FontAwesomeIcon icon={faTrash} />{" "}
                    {isBusy ? "Deleting..." : "Delete"}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No audits found.
              </td>
            </tr>
          )}
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
          Are you sure you want to delete this audit?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmDeleteModal(false)}
            disabled={isBusy}
          >
            <FontAwesomeIcon icon={faTimes} /> Cancel
          </Button>
          <Button
            variant="danger"
            onClick={confirmDeleteAudit}
            disabled={isBusy}
          >
            <FontAwesomeIcon icon={faTrash} />{" "}
            {isBusy ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
