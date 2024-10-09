import { useNavigate } from "react-router-dom";
import { api } from "@/api";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { useEffect } from "react";

const LOGOUT_API = "/identity/logout";

export default function AdminPage() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const handleLogout = async () => {
    try {
      await api.post(LOGOUT_API);
      setAuth(null);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else {
        toast.error("Something went wrong. Please try again later");
      }
    }
  };

  useEffect(() => {
    import("bootstrap/dist/css/bootstrap.min.css");
  }, []);

  return (
    <div className="container text-center mt-5">
      <h3>{auth?.userName ? `Welcome, ${auth.userName}` : "Logged out"}</h3>
      <div className="row mt-4">
        <div className="col-md-3 mb-3">
          <button
            className="btn btn-primary btn-block w-100"
            onClick={() => navigate("/admin/keys")}
          >
            Go to Access Keys
          </button>
        </div>

        <div className="col-md-3 mb-3">
          <button
            className="btn btn-primary btn-block w-100"
            onClick={() => navigate("/admin/users")}
          >
            Go to Users
          </button>
        </div>

        <div className="col-md-3 mb-3">
          <button
            className="btn btn-primary btn-block w-100"
            onClick={() => navigate("/admin/categories")}
          >
            Go to Categories
          </button>
        </div>

        <div className="col-md-3 mb-3">
          <button
            className="btn btn-primary btn-block w-100"
            onClick={() => navigate("/admin/challenges")}
          >
            Go to Challenges
          </button>
        </div>

        <div className="col-md-3 mb-3">
          <button
            className="btn btn-primary btn-block w-100"
            onClick={() => navigate("/admin/configurations")}
          >
            Go to Configurations
          </button>
        </div>
        <div className="col-md-3 mb-3">
          <button
            className="btn btn-primary btn-block w-100"
            onClick={() => navigate("/admin/leaderboards")}
          >
            Go to Leaderboards
          </button>
        </div>

        <div className="col-md-3 mb-3">
          <button
            className="btn btn-danger btn-block w-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
