import { api } from "@/api";
import { useState } from "react";
import { toast } from "react-toastify";

export default function UserProfileCertify() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [canGetCertified, setCanGetCertified] = useState(true);

  const disableButtonTemporarily = () => {
    setCanGetCertified(false);
    setTimeout(() => {
      setCanGetCertified(true);
    }, 5000);
  };

  const generateCertificate = async () => {
    if (!canGetCertified) return;

    setIsGenerating(true);
    disableButtonTemporarily();

    try {
      const checkResponse = await api.get("/identity/me/certificate/check");

      if (checkResponse.data === "WithoutCertificate") {
        toast.error("Sorry! You haven't received a certificate");
        return;
      }

      if (checkResponse.data === "NotAllowed") {
        toast.error("Sorry! Not allowed to receive a certificate");
        return;
      }

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
    } catch (error) {
      const status = error?.response?.status;

      if (status === 400) {
        toast.error(error.response.data.message);
      } else if (status === 429) {
        toast.warn("Slow down on generating certificate!");
      } else {
        toast.error(
          "Something went wrong getting user certificate. Please try again later"
        );
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="dashboard__content bg-black">
        <div className="row pb-50 mb-10 mt-30 ">
          <div className="col-auto">
            <h1 className="text-30 text-white lh-12 fw-700 ">
              Get your Certificate after the event!
            </h1>
            <div className="mt-10 text-white ">
              Wait for announcement and click the button to get your
              certificate!
            </div>
          </div>
        </div>

        <div className="row y-gap-30 ">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-1 h-100 ">
              <div className="tabs -active-purple-2 js-tabs pt-0 ">
                <button
                  onClick={generateCertificate}
                  disabled={!canGetCertified}
                  className="tabs__content py-30 px-30 js-tabs-content"
                  style={{
                    fontSize: "20px",
                    cursor: canGetCertified ? "pointer" : "not-allowed",
                  }}
                >
                  <i className="fa fa-certificate mr-15"> </i>
                  {isGenerating ? "Generating..." : "Generate Certificate"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-90"></div>
    </>
  );
}
