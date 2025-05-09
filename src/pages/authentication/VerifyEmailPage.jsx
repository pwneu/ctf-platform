import { useEffect, useState } from "react";
import { api } from "@/api";
import Preloader from "@/components/Preloader";
import MetaComponent from "@/components/MetaComponent";
import {
  AccountHasVerified,
  AccountVerificationFailed,
  AccountVerificationLoading,
  AuthImageMove,
  HeaderAuth,
} from "@/features/authentication";
import { toast } from "react-toastify";

const VERIFY_EMAIL_API = "/identity/verify";

const metadata = {
  title: "Verify Email || PWNEU",
  description: "Verify your email to join PWNEU",
};

export default function VerifyEmailPage() {
  const [verificationStatus, setVerificationStatus] = useState("null"); // gawing "success" para mag appear yung AccountHasVerified, "failed" para mag appear yung AccountVerificationFailed. originally null
  const [email, setEmail] = useState(null);

  // comment out useEffect
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const emailParam = queryParams.get("email");
    const confirmationToken = queryParams.get("confirmationToken");

    if (emailParam && confirmationToken) {
      setEmail(emailParam);
      verifyEmail(emailParam, confirmationToken);
    } else {
      setVerificationStatus("failed");
    }
  }, []);

  const verifyEmail = async (email, token) => {
    try {
      await api.post(VERIFY_EMAIL_API, { email, confirmationToken: token });
      setVerificationStatus("success");
    } catch (error) {
      const status = error?.response?.status;

      if (status === 400) {
        toast.error(error.response.data.message || "Error verifying user");
      } else if (status === 429) {
        toast.error(
          "Too many request in your IP address. Please try again later"
        );
      } else {
        toast.error(
          "Something went wrong verifying user. Please try again later"
        );
      }

      setVerificationStatus("failed");
    }
  };

  return (
    <div className="main-content">
      <MetaComponent meta={metadata} />
      <Preloader />
      <HeaderAuth />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <section className="form-page js-mouse-move-container">
          <AuthImageMove />
          {verificationStatus === "success" ? (
            <AccountHasVerified email={email} />
          ) : verificationStatus === "failed" ? (
            <AccountVerificationFailed />
          ) : (
            <AccountVerificationLoading />
          )}
        </section>
      </div>
    </div>
  );
}
