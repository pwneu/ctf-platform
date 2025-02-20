import { Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function DownloadCertificateButton({ userDetailsId }) {
  const navigate = useNavigate();
  const [isDownloadingCertificate, setIsDownloadingCertificate] =
    useState(false);

  const downloadCertificate = async () => {
    if (isDownloadingCertificate) return;

    try {
      setIsDownloadingCertificate(true);

      const checkResponse = await api.get(
        `/identity/users/${userDetailsId}/certificate/check`
      );

      if (checkResponse.data === "WithoutCertificate") {
        toast.error("The user doesn't have a certificate yet");
        return;
      }

      if (checkResponse.data === "NotAllowed") {
        toast.error("Certification is disabled");
        return;
      }

      const response = await api.get(
        `/identity/users/${userDetailsId}/certificate`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "pwneu-certificate.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 400) {
        toast.error(error.response.data.message);
      } else if (status === 429) {
        toast.warn("Slow down on generating certificate!");
      } else {
        toast.error(
          "Something went wrong getting user certificate. Please try again later"
        );
      }
    } finally {
      setIsDownloadingCertificate(false);
    }
  };

  return (
    <>
      <Button
        className="ml-3 mb-1"
        variant="success"
        onClick={downloadCertificate}
        disabled={isDownloadingCertificate}
      >
        {isDownloadingCertificate ? (
          <Spinner animation="border" size="sm" />
        ) : (
          <FontAwesomeIcon icon={faDownload} />
        )}{" "}
        {isDownloadingCertificate ? "Downloading..." : "Download Certificate"}
      </Button>
    </>
  );
}
