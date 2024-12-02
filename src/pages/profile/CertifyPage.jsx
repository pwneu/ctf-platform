import { useEffect, useState } from "react";
import { api } from "@/api";
import { toast } from "react-toastify";

// TODO -- Design

export default function CertifyPage() {
  const [certificationStatus, setCertificationStatus] = useState(null);

  useEffect(() => {
    const generateCertificate = async () => {
      try {
        const checkResponse = await api.get("/identity/me/certificate/check");

        if (checkResponse.data === false) {
          toast.error("Sorry! You don't have a certificate");
          return;
        }

        setCertificationStatus("generating");
        const response = await api.get("/identity/me/certificate", {
          responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "pwneu-certificate.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        setCertificationStatus("success");
      } catch (error) {
        toast.error(error.response.data.message);
        setCertificationStatus("failed");
      }
    };

    generateCertificate();
  }, []);

  return (
    <>
      {certificationStatus === "success" ? (
        <div>Success</div>
      ) : certificationStatus === "failed" ? (
        <div>Failed</div>
      ) : certificationStatus === "generating" ? (
        <div>Generating...</div>
      ) : (
        <div>Downloading...</div>
      )}
    </>
  );
}
