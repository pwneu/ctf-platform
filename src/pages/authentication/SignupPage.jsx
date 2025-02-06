import Preloader from "@/components/Preloader";
import MetaComponent from "@/components/MetaComponent";
import {
  SignUpForm,
  AuthImageMove,
  HeaderAuth,
  AccountHasbeenCreated,
} from "@/features/authentication";
import { useState, useEffect } from "react";

const metadata = {
  title: "Sign Up || PWNEU",
  description:
    "Create your account to join our community and start participating in exciting challenges.",
};

export default function SignupPage() {
  const [hasRegistered, setHasRegistered] = useState(false); // gawing true para mag appear yung AccountHasbeenCreated. Originally false
  const [accessKey, setAccessKey] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessKeyParams = queryParams.get("accessKey");

    if (accessKeyParams !== null) {
      setAccessKey(accessKeyParams);
    }
  }, []);

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
            <SignUpForm
              setHasRegistered={setHasRegistered}
              accessKey={accessKey}
            />
          )}
        </section>
      </div>
    </div>
  );
}
