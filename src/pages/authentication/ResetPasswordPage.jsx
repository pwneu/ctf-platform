import Preloader from "@/components/Preloader";
import MetaComponent from "@/components/MetaComponent";
import {
  ResetPassword,
  PasswordResetCompleted,
  AuthImageMove,
  HeaderAuth,
} from "@/features/authentication";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const metadata = {
  title: "Set New Password || PWNEU",
  description:
    "Create a new password to secure your account and gain access to our platform.",
};

export default function ResetPasswordPage() {
  const [resetToken, setResetToken] = useState(undefined);
  const [email, setEmail] = useState(undefined);

  const [passwordResetHasCompleted, setPasswordResetHasCompleted] =
    useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const emailParam = queryParams.get("email");
    const resetToken = queryParams.get("resetToken");

    if (emailParam && validateEmail(emailParam) && resetToken) {
      setEmail(emailParam);
      setResetToken(resetToken);
    } else {
      // If email is invalid or token is missing, navigate back to home page
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="main-content">
      <MetaComponent meta={metadata} />
      <Preloader />
      <HeaderAuth />

      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <section className="form-page js-mouse-move-container">
          <AuthImageMove />
          {passwordResetHasCompleted ? (
            <PasswordResetCompleted />
          ) : (
            <ResetPassword
              email={email}
              resetToken={resetToken}
              setPasswordResetHasCompleted={setPasswordResetHasCompleted}
            />
          )}
        </section>
      </div>
    </div>
  );
}
