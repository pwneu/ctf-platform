import { useEffect, useState } from "react";
import { api } from "@/api";
import HeaderAuth from "@/features/authentication/layout/HeaderAuth";
import AuthImageMove from "@/features/authentication/layout/AuthImageMove";
import Preloader from "@/components/Preloader";
import MetaComponent from "@/components/MetaComponent";
import AccountHasVerified from "./AccountHasVerified";
import AccountVerificationFailed from "./AccountVerificationFailed";

// Unused but keep it

const VERIFY_EMAIL_API = "/identity/verify";

const metadata = {
  title: "Verify Email || PWNEU",
  description: "Verify your email to join PWNEU",
};

export default function VerifyEmail() {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const emailParam = queryParams.get("email");
    const confirmationToken = queryParams.get("confirmationToken");

    if (emailParam && confirmationToken) {
      setEmail(emailParam);
      verifyEmail(emailParam, confirmationToken);
    }
  }, []);

  const verifyEmail = async (email, token) => {
    try {
      await api.post(VERIFY_EMAIL_API, { email, confirmationToken: token });
      setVerificationStatus("success");
    } catch (error) {
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
            <></>
          )}
        </section>
      </div>
    </div>
  );
}
