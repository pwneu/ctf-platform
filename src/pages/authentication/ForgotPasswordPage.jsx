import Preloader from "@/components/Preloader";
import MetaComponent from "@/components/MetaComponent";
import {
  ForgotPassword,
  AuthImageMove,
  HeaderAuth,
  PasswordResetSent,
} from "@/features/authentication";
import { useState } from "react";

const metadata = {
  title: "Forgot Password || PWNEU",
  description:
    "Reset your password to regain access to your account and continue exploring our platform.",
};

export default function ForgotPasswordPage() {
  const [passwordResetSent, setPasswordResetSent] = useState(false); // gawing true para mag appear yung PasswordResetSent. originally false

  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <HeaderAuth />

      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <section className="form-page js-mouse-move-container">
          <AuthImageMove />
          {passwordResetSent ? (
            <PasswordResetSent />
          ) : (
            <ForgotPassword setPasswordResetSent={setPasswordResetSent} />
          )}
        </section>
      </div>
    </div>
  );
}
