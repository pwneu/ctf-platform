import Preloader from "@/components/Preloader";
import MetaComponent from "@/components/MetaComponent";
import {
  SignUpForm,
  AuthImageMove,
  HeaderAuth,
  AccountHasbeenCreated,
} from "@/features/authentication";
import { useState } from "react";

const metadata = {
  title: "Sign Up || PWNEU",
  description:
    "Create your account to join our community and start participating in exciting challenges.",
};

export default function SignupPage() {
  const [hasRegistered, setHasRegistered] = useState(false);

  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <HeaderAuth />

      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <section className="form-page js-mouse-move-container">
          <AuthImageMove />
          {hasRegistered ? (
            <AccountHasbeenCreated />
          ) : (
            <SignUpForm setHasRegistered={setHasRegistered} />
          )}
        </section>
      </div>
    </div>
  );
}
