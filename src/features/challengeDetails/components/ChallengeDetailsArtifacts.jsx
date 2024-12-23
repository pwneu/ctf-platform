import { useState } from "react";
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

  // useEffect(() => {
  //   console.log(artifacts);
  // }, [artifacts]);

  return (
    <>
      {artifacts.length > 0 ? (
        <div
          className="user-ranks-container"
          data-aos="fade-up"
          data-aos-offset="80"
          data-aos-duration={900}
          style={{
            maxWidth: "1300px",
            width: "100%",
            display: "flex",
            flexDirection: "column", // Stack items vertically
          }}
        >
          <div className="leaderboard-wrapper" style={{ width: "100%" }}>
            {artifacts.map((artifact, index) => (
              <div
                key={index}
                className="leaderboard-row"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid #ddd", // Add row separators
                  width: "100%",
                }}
              >
                <div
                  className="text-dark-1"
                  style={{
                    flex: "2",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontSize: "0.875rem",
                    textAlign: "left", // Ensure left alignment
                  }}
                >
                  {artifact.fileName}
                </div>
                <div
                  style={{
                    flex: "",
                    textAlign: "left", // Ensure left alignment
                    fontSize: "0.875rem",
                  }}
                >
                  <button
                    onClick={() => handleDownloadArtifact(artifact)}
                    disabled={isDownloading}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "0.875rem",
                    }}
                  >
                    <i className="fa fa-download"></i>
                    {isDownloading ? "Downloading" : "Download"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="no-hints-message text-dark-1"
          style={{
            marginTop: "20px",
            display: "inline-flex",
            gap: "8px",
            alignItems: "center",
            textAlign: "left",
          }}
        >
          <i className="fa fa-download"></i> No Artifacts available.
        </div>
      )}

      <style>{`
        @media screen and (max-width: 768px) {
          .user-ranks-container {
            width: 100%;
            padding: 10px;
          }

          .leaderboard-row {
            flex-direction: column; /* Stack items vertically on smaller screens */
            gap: 5px;
          }

          .leaderboard-row div {
            text-align: left; /* Maintain left alignment */
            font-size: 0.875rem;
          }
        }

        @media screen and (max-width: 480px) {
          .user-ranks-container {
            width: 95%;
            padding: 10px;
          }

          .leaderboard-row div {
            font-size: 0.75rem;
          }
        }
      `}</style>
      <div
        style={{
          minHeight: "50vh",
          marginTop: "200px",
        }}
      ></div>
    </>
  );
}
