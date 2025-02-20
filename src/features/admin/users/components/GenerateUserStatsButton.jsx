import { Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function GenerateUserStatsButton({ userDetailsId }) {
  const navigate = useNavigate();
  const [isGeneratingStatsReport, setIsGeneratingStatsReport] = useState(false);

  const generateStatsReport = async () => {
    if (isGeneratingStatsReport) return;
    try {
      setIsGeneratingStatsReport(true);
      const response = await api.get(`/play/users/${userDetailsId}/stats`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${userDetailsId}_stats-report.html`;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 400) {
        toast.error(error.response.data.message);
      } else if (status === 429) {
        toast.error("Slow down on downloading generating user stats!");
      } else {
        toast.error(
          "Something went wrong generating user stats. Please try again later"
        );
      }
    } finally {
      setIsGeneratingStatsReport(false);
    }
  };

  return (
    <>
      <Button
        className="ml-3 mb-1"
        variant="primary"
        onClick={generateStatsReport}
        disabled={isGeneratingStatsReport}
      >
        {isGeneratingStatsReport ? (
          <Spinner animation="border" size="sm" />
        ) : (
          <FontAwesomeIcon icon={faDownload} />
        )}{" "}
        {isGeneratingStatsReport ? "Generating..." : "Generate Stats Report"}
      </Button>
    </>
  );
}
