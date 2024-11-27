import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { api } from "@/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import {
  UserSolves,
  UserDetails,
  UserHintUsages,
  UserGraph,
  UserEvaluations,
} from "@/features/admin/users";
import HeaderAdmin from "@/layout/headers/HeaderAdmin";

export default function UserDetailsPage() {
  const params = useParams();

  const [userDetails, setUserDetails] = useState();
  const [userRank, setUserRank] = useState();
  const [userEmail, setUserEmail] = useState("");
  const [userGraph, setUserGraph] = useState();
  const [userEvaluations, setUserEvaluations] = useState();

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { auth } = useAuth();
  const isAdmin = auth?.roles?.includes("Admin");
  const shouldShowPlayData = userDetails?.roles?.includes("Member");

  const getUserDetails = async (id) => {
    try {
      const response = await api.get(`/identity/users/${id}/details`);
      console.log(response.data);
      setUserDetails(response.data);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 404) {
        toast.error(error.response.data.message || "User not found");
      } else {
        toast.error(
          "Something went wrong getting user details. Please try again later"
        );
      }
      setUserDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const getUserEmail = async (id) => {
    try {
      const response = await api.get(`/identity/users/${id}/email`);
      setUserEmail(response.data);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setUserEmail("No Email");
    }
  };

  const getUserGraph = async (id) => {
    try {
      const response = await api.get(`/play/users/${id}/graph`);
      setUserGraph(response.data);
    } catch {
      setUserGraph(null);
    }
  };

  const getUserEvaluations = async (id) => {
    try {
      const response = await api.get(`/play/users/${id}/evaluate`);
      setUserEvaluations(response.data);
    } catch {
      setUserEvaluations(null);
    }
  };

  const getUserRank = async (id) => {
    try {
      const response = await api.get(`/play/users/${id}/rank`);
      setUserRank(response.data);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setUserRank(null);
    }
  };

  useEffect(() => {
    const userIdParam = params.id;

    if (userIdParam) {
      getUserDetails(userIdParam);
      getUserEmail(userIdParam);
      getUserGraph(userIdParam);
      getUserEvaluations(userIdParam);
      getUserRank(userIdParam);
    } else {
      setUserDetails(null);
      setUserEmail(null);
      setUserGraph(null);
      setUserEvaluations(null);
      setUserRank(null);
    }
  }, [params.id]);

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
        {loading ? (
          <Spinner animation="border" role="status" />
        ) : userDetails === null ? (
          <h4>User not found</h4>
        ) : (
          <>
            <UserDetails
              userDetails={userDetails}
              userEmail={userEmail}
              userRank={userRank}
              isAdmin={isAdmin}
              cannotBeDeleted={userDetails.userName === auth?.userName}
              navigate={navigate}
              getUserDetails={getUserDetails}
            />

            {shouldShowPlayData && (
              <>
                <UserEvaluations userEvaluations={userEvaluations} />
                <UserGraph userGraph={userGraph} />
                <UserSolves userId={userDetails.id} />
                <UserHintUsages userId={userDetails.id} />
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
}
