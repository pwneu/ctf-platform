import { useEffect, useState } from "react";
import { api } from "@/api";
import { Container, Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  ChallengeSolves,
  EditChallenge,
  ChallengeArtifacts,
  ChallengeHints,
  ChallengeHintUsages,
} from "@/features/admin/challenges";
import HeaderAdmin from "@/layout/headers/HeaderAdmin";
import { useNavigate } from "react-router-dom";

export default function ChallengeDetailsAdminPage() {
  const navigate = useNavigate();
  const [challengeDetails, setChallengeDetails] = useState();
  const [challengeFlags, setChallengeFlags] = useState();
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const getChallengeDetails = async (id) => {
    try {
      const response = await api.get(`/play/challenges/${id}`);
      setChallengeDetails(response.data);
      setFormData({
        name: response.data.name,
        description: response.data.description,
        points: response.data.points,
        deadlineEnabled: response.data.deadlineEnabled,
        deadline: response.data.deadline,
        maxAttempts: response.data.maxAttempts,
        tags: response.data.tags,
        flags: [],
      });

      const flagsResponse = await api.get(`/play/challenges/${id}/flags`);
      setChallengeFlags(flagsResponse.data);
      setFormData((prevData) => ({
        ...prevData,
        flags: flagsResponse.data,
      }));
    } catch (error) {
      const status = error?.response?.status;

      if (status === 404) {
        toast.error(error.response.data.message || "Challenge not found");
      } else {
        toast.error(
          "Something went wrong getting challenge details. Please try again later"
        );
      }
      setChallengeDetails(null);
      setChallengeFlags([]);
    }
  };

  const refreshArtifacts = async () => {
    if (challengeDetails) {
      await getChallengeDetails(challengeDetails.id);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setShowModal(true);
  };

  const confirmSave = async () => {
    setLoading(true); // Set loading to true when save starts
    try {
      await api.put(`/play/challenges/${challengeDetails.id}`, {
        name: formData.name,
        description: formData.description,
        points: formData.points,
        deadlineEnabled: formData.deadlineEnabled,
        deadline: new Date(formData.deadline).toISOString(),
        maxAttempts: formData.maxAttempts,
        tags: formData.tags,
        flags: formData.flags,
      });

      toast.success(`Successfully updated challenge: ${challengeDetails.id}`);
      await getChallengeDetails(challengeDetails.id);
      setShowModal(false);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 400) {
        toast.error(error.response?.data?.message || "Failed to save changes");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (challengeDetails) {
      try {
        setFormData({
          name: challengeDetails.name,
          description: challengeDetails.description,
          points: challengeDetails.points,
          deadline: challengeDetails.deadline,
          maxAttempts: challengeDetails.maxAttempts,
          tags: [...challengeDetails.tags],
          flags: challengeFlags,
        });
      } catch {
        setChallengeDetails(null);
      }
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const challengeIdParam = queryParams.get("challengeId");

    if (challengeIdParam) {
      getChallengeDetails(challengeIdParam);
    } else {
      setChallengeDetails(null);
    }
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
        {challengeDetails === undefined ? (
          <div className="text-center mt-5">
            <h5>Loading challenge details...</h5>
          </div>
        ) : challengeDetails === null ? (
          <div className="text-center mt-5">
            <h5>Challenge not found.</h5>
          </div>
        ) : (
          <>
            <EditChallenge
              challengeDetails={challengeDetails}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSave={handleSave}
              handleReset={handleReset}
              setFormData={setFormData}
            />
            {/* Render Artifacts and Hints components */}
            <ChallengeArtifacts
              artifacts={challengeDetails.artifacts}
              refreshArtifacts={refreshArtifacts}
              challengeId={challengeDetails.id}
            />
            <ChallengeHints challengeId={challengeDetails.id} />
            <ChallengeSolves challengeId={challengeDetails.id} />
            <ChallengeHintUsages challengeId={challengeDetails.id} />
          </>
        )}
      </Container>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Save</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to save these changes?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmSave} disabled={loading}>
            {loading ? "Saving..." : "Confirm"}{" "}
            {/* Show saving text while loading */}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
