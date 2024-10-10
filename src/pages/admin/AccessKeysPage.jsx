import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Container, Button, Spinner } from "react-bootstrap";
import { CreateAccessKey, AccessKeysList } from "@/features/admin/keys";
import { api } from "@/api";
import useAuth from "@/hooks/useAuth";
import HeaderAdmin from "@/layout/headers/HeaderAdmin";

export default function AccessKeysPage() {
  const navigate = useNavigate();
  const [isBusy, setIsBusy] = useState(false);
  const [accessKeys, setAccessKeys] = useState();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { auth } = useAuth();
  const isAdmin = auth?.roles?.includes("Admin");

  const getAccessKeys = async () => {
    try {
      const response = await api.get("/identity/keys");
      setAccessKeys(response.data);
    } catch {
      toast.error("Something went wrong getting access keys");
      setAccessKeys([]);
    }
  };

  useEffect(() => {
    getAccessKeys();
  }, []);

  const handleDeleteKey = async (key) => {
    setIsBusy(true);
    try {
      await api.delete(`/identity/keys/${key.id}`);
      getAccessKeys();
      toast.success(`Access key deleted successfully: ${key.id}`);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 403) {
        toast.error("You are not allowed to delete access keys");
      } else {
        toast.error(
          error?.response?.data?.message ||
            "Something went wrong. Please try again later"
        );
      }
    } finally {
      setIsBusy(false);
    }
  };

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
          <h2>Access Keys</h2>
          {isAdmin && (
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              <FontAwesomeIcon icon={faPlus} /> Create Access Key
            </Button>
          )}
        </div>

        {accessKeys === undefined ? (
          <div className="d-flex justify-content-center my-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : accessKeys.length > 0 ? (
          <AccessKeysList
            accessKeys={accessKeys}
            isBusy={isBusy}
            onDeleteKey={handleDeleteKey}
            isAdmin={isAdmin}
          />
        ) : (
          <p className="text-center mt-4">No access keys available</p>
        )}

        <CreateAccessKey
          show={showCreateModal}
          onHide={() => setShowCreateModal(false)}
          onSuccess={() => getAccessKeys()}
        />
      </Container>
    </>
  );
}
