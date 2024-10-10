import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { api } from "@/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
  const [userDetails, setUserDetails] = useState();
  const [userEmail, setUserEmail] = useState("");
  const [userGraph, setUserGraph] = useState();
  const [userEvaluations, setUserEvaluations] = useState();

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { auth } = useAuth();
  const isAdmin = auth?.roles?.includes("Admin");

  const getUserDetails = async (id) => {
    try {
      const response = await api.get(`/identity/users/${id}/details`);
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

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const userIdParam = queryParams.get("userId");

    if (userIdParam) {
      getUserDetails(userIdParam);
      getUserEmail(userIdParam);
      getUserGraph(userIdParam);
      getUserEvaluations(userIdParam);
    } else {
      setUserDetails(null);
      setUserEmail(null);
      setUserGraph(null);
      setUserEvaluations(null);
    }
  }, []);

  // useEffect(() => {
  //   import("bootstrap/dist/css/bootstrap.min.css");
  // }, []);

  // Hack fix because of educrat overriding bootstrap classes :(
  useEffect(() => {
    let bootstrapLink;

    import("bootstrap/dist/css/bootstrap.min.css").then(() => {
      bootstrapLink = document.createElement("link");
      bootstrapLink.rel = "stylesheet";
      bootstrapLink.href = "bootstrap/dist/css/bootstrap.min.css";
      document.head.appendChild(bootstrapLink);
    });

    return () => {
      if (bootstrapLink) {
        document.head.removeChild(bootstrapLink);
      }
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
              isAdmin={isAdmin}
              navigate={navigate}
              getUserDetails={getUserDetails}
            />

            <UserEvaluations userEvaluations={userEvaluations} />
            <UserGraph userGraph={userGraph} />

            <UserSolves userId={userDetails.id} />
            <UserHintUsages userId={userDetails.id} />
          </>
        )}
      </Container>
    </>
  );
}
