import { useEffect, useState } from "react";
import { api } from "@/api";
import { toast } from "react-toastify";
import jsPDF from "jspdf";

// TODO -- Design

export default function CertifyPage() {
  const [certificationStatus, setCertificationStatus] = useState(null);

  useEffect(() => {
    const generateCertificate = async () => {
      try {
        const response = await api.post("/identity/certificates/me");
        setCertificationStatus("generating");

        const doc = new jsPDF({
          orientation: "landscape",
          unit: "px",
          format: [2480, 3508],
          hotfixes: [],
        });

        doc.html(response.data, {
          html2canvas: { scale: 2 },
          callback: function (doc) {
            doc.save("certificate.pdf");
          },
          autoPaging: "text",
          x: 0,
          y: 0,
          width: 2480,
          windowWidth: 2480,
        });

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
