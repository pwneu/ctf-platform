import { useEffect, useState } from "react";
import { Container, Button, Spinner } from "react-bootstrap";
import { api } from "@/api";
import { toast } from "react-toastify";
import { CreateCategory, CategoriesList } from "@/features/admin/categories";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import useAuth from "@/hooks/useAuth";
import HeaderAdmin from "@/layout/headers/HeaderAdmin";

export default function CategoriesPage() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [categories, setCategories] = useState();
  const [isBusy, setIsBusy] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getCategories = async () => {
    setIsBusy(true);
    try {
      const response = await api.get("/play/categories/all");
      setCategories(response.data);
    } catch {
      toast.error(
        "Something went wrong getting categories. Please try again later"
      );
      setCategories([]);
    } finally {
      setIsBusy(false);
    }
  };

  const handleDeleteCategory = async (category) => {
    setIsBusy(true);
    try {
      await api.delete(`/play/categories/${category.id}`);
      toast.success(`Category deleted successfully: ${category.id}`);
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat.id !== category.id)
      );
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        navigate("/login");
      } else if (status === 403) {
        toast.error("You are not allowed to delete categories");
      } else {
        toast.error(
          error?.response?.data?.message || "Error deleting category"
        );
      }
    } finally {
      setIsBusy(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const isAdmin = auth?.roles?.includes("Admin");

  return (
    <>
      <HeaderAdmin />
      <Container className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Categories</h2>
          {isAdmin && ( // Hide button if not admin
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              <FontAwesomeIcon icon={faPlus} /> Create Category
            </Button>
          )}
        </div>

        {categories === undefined ? (
          <div className="d-flex justify-content-center my-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : categories.length > 0 ? (
          <CategoriesList
            categories={categories}
            isBusy={isBusy}
            onDeleteCategory={handleDeleteCategory}
            isAdmin={isAdmin} // Pass isAdmin to CategoriesList
          />
        ) : (
          <p className="text-center mt-4">No categories available</p>
        )}

        <CreateCategory
          show={showCreateModal}
          onHide={() => setShowCreateModal(false)}
          onSuccess={getCategories}
        />
      </Container>
    </>
  );
}
