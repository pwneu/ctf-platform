import { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import { api } from "@/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import HeaderAdmin from "@/layout/headers/HeaderAdmin";
import {
  IsCertificationEnabled,
  IsTurnstileEnabled,
  PublicLeaderboardCount,
  SubmissionsAllowed,
} from "@/features/admin/configurations";

export default function ConfigurationsPage() {
  const navigate = useNavigate();
  const [playConfigurations, setPlayConfigurations] = useState([]);
  const [identityConfigurations, setIdentityConfigurations] = useState([]);

  const [leaderboardCount, setLeaderboardCount] = useState("");
  const [initialLeaderboardCount, setInitialLeaderboardCount] = useState("");

  const [isBusy, setIsBusy] = useState(false);

  const { auth } = useAuth();
  const isAdmin = auth?.roles?.includes("Admin");

  useEffect(() => {
    const fetchPlayConfigurations = async () => {
      try {
        setIsBusy(true);
        const response = await api.get("/play/configurations");
        setPlayConfigurations(response.data);

        const leaderboardConfig = response.data.find(
          (config) => config.key === "PublicLeaderboardCount"
        );

        if (leaderboardConfig) {
          setLeaderboardCount(leaderboardConfig.value);
          setInitialLeaderboardCount(leaderboardConfig.value);
        }
      } catch {
        toast.error(
          "Something went wrong getting play configurations. Please try again later"
        );
      } finally {
        setIsBusy(false);
      }
    };

    const fetchIdentityConfigurations = async () => {
      try {
        setIsBusy(true);
        const response = await api.get("/identity/configurations");
        setIdentityConfigurations(response.data);
      } catch {
        toast.error(
          "Something went wrong getting identity configurations. Please try again later"
        );
      } finally {
        setIsBusy(false);
      }
    };

    fetchPlayConfigurations();
    fetchIdentityConfigurations();
  }, []);

  const handleApiError = (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      navigate("/login");
    } else if (status === 403) {
      toast.error("You are not allowed to update configurations");
    } else if (status === 400) {
      toast.error(
        error.response.data.message || "Error updating configuration"
      );
    } else {
      toast.error(
        "Something went wrong updating configuration. Please try again later"
      );
    }
  };

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
      <Container className="mt-4">
        <Card className="mt-4">
          <Card.Header as="h5">Play Configuration</Card.Header>
          <Card.Body>
            <SubmissionsAllowed
              playConfigurations={playConfigurations}
              setPlayConfigurations={setPlayConfigurations}
              isAdmin={isAdmin}
              isBusy={isBusy}
              setIsBusy={setIsBusy}
              handleApiError={handleApiError}
            />

            <PublicLeaderboardCount
              leaderboardCount={leaderboardCount}
              setLeaderboardCount={setLeaderboardCount}
              initialLeaderboardCount={initialLeaderboardCount}
              setInitialLeaderboardCount={setInitialLeaderboardCount}
              setPlayConfigurations={setPlayConfigurations}
              isAdmin={isAdmin}
              isBusy={isBusy}
              setIsBusy={setIsBusy}
              handleApiError={handleApiError}
            />
          </Card.Body>
        </Card>

        <Card className="mt-4">
          <Card.Header as="h5">Identity Configuration</Card.Header>
          <Card.Body>
            <IsTurnstileEnabled
              identityConfigurations={identityConfigurations}
              setIdentityConfigurations={setIdentityConfigurations}
              isAdmin={isAdmin}
              isBusy={isBusy}
              setIsBusy={setIsBusy}
              handleApiError={handleApiError}
            />

            <IsCertificationEnabled
              identityConfigurations={identityConfigurations}
              setIdentityConfigurations={setIdentityConfigurations}
              isAdmin={isAdmin}
              isBusy={isBusy}
              setIsBusy={setIsBusy}
              handleApiError={handleApiError}
            />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
