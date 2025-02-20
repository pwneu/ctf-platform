import HeaderAdmin from "@/layout/headers/HeaderAdmin";
import { Container, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuditsList, AuditsQueryInput } from "@/features/admin/audits";
import { toast } from "react-toastify";
import { api } from "@/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faTrash,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

export default function AuditsPage() {
  const navigate = useNavigate();
  const [searchTermInput, setSearchTermInput] = useState("");
  const [sortByInput, setSortByInput] = useState("");
  const [sortOrderInput, setSortOrderInput] = useState("");
  const [pageInput, setPageInput] = useState("");
  const [pageSizeInput, setPageSizeInput] = useState("");
  const [audits, setAudits] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [isDeletingAllAudits, setIsDeletingAllAudits] = useState(false);
  const [showConfirmDeleteAllAuditsModal, setShowConfirmDeleteAllAuditsModal] =
    useState(false);
  const [isDoubleConfirmed, setIsDoubleConfirmed] = useState(false);

  const handleSearch = async () => {
    setIsBusy(true);
    const pageValue = pageInput ? Math.max(1, Number(pageInput)) : 1;
    const pageSizeValue = pageSizeInput
      ? Math.max(1, Number(pageSizeInput))
      : 10;

    const params = {
      ...(searchTermInput && { searchTerm: searchTermInput }),
      ...(sortByInput && { sortBy: sortByInput }),
      ...(sortOrderInput && { sortOrder: sortOrderInput }),
      page: pageValue,
      pageSize: pageSizeValue,
    };

    try {
      const response = await api.get("/play/audits", { params });
      // console.log(response.data);
      setAudits(response.data.items);
      setTotalCount(response.data.totalCount);
      setPage(response.data.page);
      setPageSize(response.data.pageSize);
      setHasNextPage(response.data.hasNextPage);
      setHasPreviousPage(response.data.hasPreviousPage);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 429) {
        toast.warn("Slow down!");
      } else {
        toast.error(
          "Something went wrong getting audits. Please try again later"
        );
      }
    } finally {
      setIsBusy(false);
    }
  };

  const cancelDeleteAllAudits = () => {
    setIsDoubleConfirmed(false);
    setShowConfirmDeleteAllAuditsModal(false);
  };

  const confirmDeleteAllAudits = async () => {
    if (!isDoubleConfirmed) {
      setIsDoubleConfirmed(true);
    } else {
      try {
        setIsDeletingAllAudits(true);
        await api.delete("/play/audits");

        toast.success("All audits deleted");

        setAudits([]);
      } catch (error) {
        const status = error?.response?.status;

        if (status === 401) {
          navigate("/login");
        } else if (status === 429) {
          toast.warn("Slow down!");
        } else {
          toast.error(
            "Something went wrong deleting all audits. Please try again later"
          );
        }
      } finally {
        setShowConfirmDeleteAllAuditsModal(false);
        setIsDeletingAllAudits(false);
        setIsDoubleConfirmed(false);
      }
    }
    // onDeleteCategory(selectedCategory);
  };

  return (
    <>
      <HeaderAdmin />
      <Container className="mt-5">
        <h2>Audits</h2>
        <AuditsQueryInput
          searchTermInput={searchTermInput}
          setSearchTermInput={setSearchTermInput}
          sortByInput={sortByInput}
          setSortByInput={setSortByInput}
          sortOrderInput={sortOrderInput}
          setSortOrderInput={setSortOrderInput}
          pageInput={pageInput}
          setPageInput={setPageInput}
          pageSizeInput={pageSizeInput}
          setPageSizeInput={setPageSizeInput}
          handleSearch={handleSearch}
          isBusy={isBusy}
        />

        <Button
          onClick={() => setShowConfirmDeleteAllAuditsModal(true)}
          className="me-2 mt-3"
          variant="danger"
        >
          <FontAwesomeIcon icon={faTrashAlt} className="me-2" />
          {"Delete All Audits"}
        </Button>

        <AuditsList audits={audits} setAudits={setAudits} />

        <div className="mt-3">
          <p>Total Audits: {totalCount}</p>
          <p>
            Page: {page} of {Math.ceil(totalCount / (pageSize || 1))}
          </p>
          <p>Page Size: {pageSize}</p>
          <p>Next Page: {hasNextPage ? "Yes" : "No"}</p>
          <p>Previous Page: {hasPreviousPage ? "Yes" : "No"}</p>
        </div>
      </Container>

      <Modal
        show={showConfirmDeleteAllAuditsModal}
        onHide={() => setShowConfirmDeleteAllAuditsModal(false)}
        aria-labelledby="confirmModalLabel"
      >
        <Modal.Header closeButton>
          <Modal.Title id="confirmModalLabel">Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isDoubleConfirmed ? (
            <>
              <p>Are you really sure?</p>
              <p>This action is irreversible.</p>
            </>
          ) : (
            <p>Do you want to delete all audits?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          {isDoubleConfirmed ? (
            <>
              <Button
                variant="danger"
                onClick={confirmDeleteAllAudits}
                disabled={isDeletingAllAudits}
              >
                <FontAwesomeIcon icon={faTrash} />{" "}
                {isDeletingAllAudits ? "Deleting..." : "Delete"}
              </Button>
              <Button
                variant="secondary"
                onClick={cancelDeleteAllAudits}
                disabled={isDeletingAllAudits}
              >
                <FontAwesomeIcon icon={faTimes} /> Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={cancelDeleteAllAudits}
                disabled={isDeletingAllAudits}
              >
                <FontAwesomeIcon icon={faTimes} /> Cancel
              </Button>
              <Button
                variant="danger"
                onClick={confirmDeleteAllAudits}
                disabled={isDeletingAllAudits}
              >
                <FontAwesomeIcon icon={faTrash} />{" "}
                {isDeletingAllAudits ? "Deleting..." : "Delete"}
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
