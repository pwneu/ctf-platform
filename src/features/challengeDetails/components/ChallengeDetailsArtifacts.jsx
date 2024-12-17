import { useEffect, useState } from "react";
import { api } from "@/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ChallengeDetailsArtifacts({ artifacts }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const navigate = useNavigate();

  const handleDownloadArtifact = async (artifact) => {
    try {
      setIsDownloading(true);
      const response = await api.get(`/play/artifacts/${artifact.id}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", artifact.fileName || "download");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 400) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Error downloading artifact. Please try again later");
      }
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    console.log(artifacts);
  }, [artifacts]);

  return (
    <>
      {artifacts.length > 0 ? (
        artifacts.map((artifact, index) => (
          <div key={index} className="hint-container">
            <button
              onClick={() => handleDownloadArtifact(artifact)}
              className="hint-button"
              disabled={isDownloading}
            >
              {isDownloading ? "Downloading" : artifact.fileName}
            </button>
          </div>
        ))
      ) : (
        <div className="no-artifacts-message">No artifacts available.</div>
      )}
    </>
  );
}
