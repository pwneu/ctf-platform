import HeaderAdmin from "@/layout/headers/HeaderAdmin";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { api } from "@/api";
import { toast } from "react-toastify";
import { Container, Spinner, Button } from "react-bootstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AddEmailToBlackList,
  BlacklistedEmails,
} from "@/features/admin/blacklist";

export default function BlacklistPage() {
  const navigate = useNavigate();
  const [isBusy, setIsBusy] = useState(false);
  const [blacklistedEmails, setBlacklistedEmails] = useState();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { auth } = useAuth();
  const isAdmin = auth?.roles?.includes("Admin");

  const handleDeleteBlacklistedEmail = async (blacklistedEmail) => {
    setIsBusy(true);
    try {
      await api.delete(`/identity/blacklist/${blacklistedEmail.id}`);
      getBlacklistedEmails();
      toast.success("Email successfully removed on the blacklist");
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 403) {
        toast.error("You are not allowed to remove blacklisted emails");
      } else {
        toast.error(
          error?.response?.data?.message ||
            "Something went wrong removing blacklisted email. Please try again later"
        );
      }
    } finally {
      setIsBusy(false);
    }
  };

  const getBlacklistedEmails = async () => {
    try {
      const response = await api.get("/identity/blacklist");
      setBlacklistedEmails(response.data);
    } catch {
      toast.error("Something went wrong getting blacklisted emails");
      setBlacklistedEmails([]);
    }
  };

  useEffect(() => {
    getBlacklistedEmails();
  }, []);

  // useEffect(() => {
  //   import("bootstrap/dist/css/bootstrap.min.css");
  // }, []);

  // Hack fix because of educrat overriding bootstrap classes :(
  useEffect(() => {
    const bootstrapLink = document.createElement("link");
    bootstrapLink.rel = "stylesheet";
    bootstrapLink.href =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css";
    document.head.appendChild(bootstrapLink);

    return () => {
      document.head.removeChild(bootstrapLink);
    };
  }, []);

  return (
    <>
      <HeaderAdmin />
      <Container className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Blacklisted Emails</h2>
          {isAdmin && (
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              <FontAwesomeIcon icon={faPlus} /> Add Email
            </Button>
          )}
        </div>

        {blacklistedEmails === undefined ? (
          <div className="d-flex justify-content-center my-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : blacklistedEmails.length > 0 ? (
          <BlacklistedEmails
            blacklistedEmails={blacklistedEmails}
            isBusy={isBusy}
            onDeleteBlacklistedEmail={handleDeleteBlacklistedEmail}
            isAdmin={isAdmin}
          />
        ) : (
          <p className="text-center mt-4">No blacklisted emails found.</p>
        )}

        <AddEmailToBlackList
          show={showCreateModal}
          onHide={() => setShowCreateModal(false)}
          onSuccess={() => getBlacklistedEmails()}
        />
      </Container>
    </>
  );
}
