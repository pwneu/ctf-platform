import { useEffect, useState } from "react";
import { Container, Card, Form, Button, Modal } from "react-bootstrap";
import { api } from "@/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import HeaderAdmin from "@/layout/headers/HeaderAdmin";

export default function ConfigurationsPage() {
  const navigate = useNavigate();
  const [playConfigurations, setPlayConfigurations] = useState([]);
  const [identityConfigurations, setIdentityConfigurations] = useState([]);

  const [isSubmissionModalVisible, setIsSubmissionModalVisible] =
    useState(false);
  const [isLeaderboardSaveModalVisible, setIsLeaderboardSaveModalVisible] =
    useState(false);

  const [isTurnstileSetModalVisible, setIsTurnstileSetModalVisbile] =
    useState(false);

  const [isEnablingSubmissions, setIsEnablingSubmissions] = useState(false);
  const [leaderboardCount, setLeaderboardCount] = useState("");
  const [initialLeaderboardCount, setInitialLeaderboardCount] = useState("");

  const [isEnablingTurnstile, setIsEnablingTurnstile] = useState(false);

  const [isEnablingCertifications, setIsEnablingCertifications] =
    useState(false);

  const [isCertificationSetModalVisible, setIsCertificationSetModalVisbile] =
    useState(false);

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
        console.log(response.data);
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

  const submissionsAllowedConfig = playConfigurations.find(
    (config) => config.key === "SubmissionsAllowed"
  );

  const handleSubmissionsSwitchChange = (isTurningOn) => {
    setIsEnablingSubmissions(isTurningOn);
    setIsSubmissionModalVisible(true);
  };

  const handleConfirmSubmissionsChange = async () => {
    try {
      setIsBusy(true);
      const url = isEnablingSubmissions
        ? "/play/configurations/submissionsAllowed/allow"
        : "/play/configurations/submissionsAllowed/deny";

      await api.put(url);
      setIsSubmissionModalVisible(false);

      if (isEnablingSubmissions) {
        toast.success("Submissions have been enabled successfully!");
      } else {
        toast.success("Submissions have been disabled successfully!");
      }

      const response = await api.get("/play/configurations");
      setPlayConfigurations(response.data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsBusy(false);
    }
  };

  const handleLeaderboardCountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setLeaderboardCount(value);
    }
  };

  const handleLeaderboardSaveClick = () => {
    setIsLeaderboardSaveModalVisible(true);
  };

  const handleConfirmLeaderboardSave = async () => {
    try {
      setIsBusy(true);
      await api.put(
        `/play/configurations/publicLeaderboardCount?count=${leaderboardCount}`
      );
      toast.success("Leaderboard count updated successfully!");

      const response = await api.get("/play/configurations");
      setPlayConfigurations(response.data);
      setInitialLeaderboardCount(leaderboardCount);
      setIsLeaderboardSaveModalVisible(false);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsBusy(false);
    }
  };

  const isTurnstileEnabledConfig = identityConfigurations.find(
    (config) => config.key === "IsTurnstileEnabled"
  );

  const handleTurnstileSwitchChanged = (isTurningOn) => {
    setIsEnablingTurnstile(isTurningOn);
    setIsTurnstileSetModalVisbile(true);
  };

  const handleConfirmTurnstileChange = async () => {
    try {
      setIsBusy(true);
      const url = isEnablingTurnstile
        ? "/identity/configurations/isTurnstileEnabled/enable"
        : "/identity/configurations/isTurnstileEnabled/disable";

      await api.put(url);
      setIsTurnstileSetModalVisbile(false);

      if (isEnablingTurnstile) {
        toast.success("Turnstile has been enabled successfully!");
      } else {
        toast.success("Turnstile has been disabled successfully!");
      }

      const response = await api.get("/identity/configurations");
      setIdentityConfigurations(response.data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsBusy(false);
    }
  };

  const isCertificationEnabledConfig = identityConfigurations.find(
    (config) => config.key === "IsCertificationEnabled"
  );

  const handleCertificationSwitchChanged = (isTurningOn) => {
    setIsEnablingCertifications(isTurningOn);
    setIsCertificationSetModalVisbile(true);
  };

  const handleConfirmCertificationChange = async () => {
    try {
      setIsBusy(true);
      const url = isEnablingCertifications
        ? "/identity/configurations/isCertificationEnabled/enable"
        : "/identity/configurations/isCertificationEnabled/disable";

      await api.put(url);
      setIsCertificationSetModalVisbile(false);

      if (isEnablingCertifications) {
        toast.success("Certification has been enabled successfully!");
      } else {
        toast.success("Certification has been disabled successfully!");
      }

      const response = await api.get("/identity/configurations");
      setIdentityConfigurations(response.data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsBusy(false);
    }
  };

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
            {submissionsAllowedConfig && (
              <Form.Group controlId="submissionsAllowed">
                <Form.Label>Submissions Allowed</Form.Label>
                <Form.Check
                  type="switch"
                  label={
                    submissionsAllowedConfig.value === "true"
                      ? "Enabled"
                      : "Disabled"
                  }
                  checked={submissionsAllowedConfig.value === "true"}
                  onChange={(e) =>
                    handleSubmissionsSwitchChange(e.target.checked)
                  }
                  disabled={!isAdmin}
                />
              </Form.Group>
            )}

            <Form.Group controlId="publicLeaderboardCount" className="mt-3">
              <Form.Label>Public Leaderboard Count</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  value={leaderboardCount}
                  onChange={handleLeaderboardCountChange}
                  placeholder="Enter leaderboard count"
                  className="me-2"
                  disabled={!isAdmin} // Disable input if not admin
                />
                <Button
                  variant="primary"
                  onClick={handleLeaderboardSaveClick}
                  disabled={
                    leaderboardCount === initialLeaderboardCount || !isAdmin
                  } // Disable if unchanged or not admin
                >
                  Save
                </Button>
              </div>
            </Form.Group>
          </Card.Body>
        </Card>

        <Card className="mt-4">
          <Card.Header as="h5">Identity Configuration</Card.Header>
          <Card.Body>
            {isTurnstileEnabledConfig && (
              <Form.Group controlId="isTurnstileEnabled">
                <Form.Label>Is Turnstile Enabled</Form.Label>
                <Form.Check
                  type="switch"
                  label={
                    isTurnstileEnabledConfig.value === "true"
                      ? "Enabled"
                      : "Disabled"
                  }
                  checked={isTurnstileEnabledConfig.value === "true"}
                  onChange={(e) =>
                    handleTurnstileSwitchChanged(e.target.checked)
                  }
                  disabled={!isAdmin}
                />
              </Form.Group>
            )}

            {isCertificationEnabledConfig && (
              <Form.Group controlId="isCertificationEnabled">
                <Form.Label>Is Certification Enabled</Form.Label>
                <Form.Check
                  type="switch"
                  label={
                    isCertificationEnabledConfig.value === "true"
                      ? "Enabled"
                      : "Disabled"
                  }
                  checked={isCertificationEnabledConfig.value === "true"}
                  onChange={(e) =>
                    handleCertificationSwitchChanged(e.target.checked)
                  }
                  disabled={!isAdmin}
                />
              </Form.Group>
            )}
          </Card.Body>
        </Card>
      </Container>

      {/* Modal for confirming submissions change */}
      <Modal
        show={isSubmissionModalVisible}
        onHide={() => setIsSubmissionModalVisible(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEnablingSubmissions
            ? "Are you sure you want to enable submissions?"
            : "Are you sure you want to disable submissions?"}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsSubmissionModalVisible(false)}
            disabled={isBusy}
          >
            {isBusy ? "Loading..." : "Cancel"}
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmSubmissionsChange}
            disabled={isBusy}
          >
            {isBusy ? "Loading..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for confirming leaderboard count save */}
      <Modal
        show={isLeaderboardSaveModalVisible}
        onHide={() => setIsLeaderboardSaveModalVisible(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Save</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to save the changes to the leaderboard count?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsLeaderboardSaveModalVisible(false)}
            disabled={isBusy}
          >
            {isBusy ? "Loading..." : "Cancel"}
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmLeaderboardSave}
            disabled={isBusy}
          >
            {isBusy ? "Loading..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for enabling or disabling turnstile*/}
      <Modal
        show={isTurnstileSetModalVisible}
        onHide={() => setIsTurnstileSetModalVisbile(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEnablingTurnstile
            ? "Are you sure you want to enable turnstile?"
            : "Are you sure you want to disable turnstile?"}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsTurnstileSetModalVisbile(false)}
            disabled={isBusy}
          >
            {isBusy ? "Loading..." : "Cancel"}
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmTurnstileChange}
            disabled={isBusy}
          >
            {isBusy ? "Loading..." : "Confirm"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for enabling or disabling certification*/}
      <Modal
        show={isCertificationSetModalVisible}
        onHide={() => setIsCertificationSetModalVisbile(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEnablingTurnstile
            ? "Are you sure you want to enable certifications?"
            : "Are you sure you want to disable certifications?"}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsCertificationSetModalVisbile(false)}
            disabled={isBusy}
          >
            {isBusy ? "Loading..." : "Cancel"}
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmCertificationChange}
            disabled={isBusy}
          >
            {isBusy ? "Loading..." : "Confirm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
