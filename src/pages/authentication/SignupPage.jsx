import Preloader from "@/components/common/Preloader";
import MetaComponent from "@/components/common/MetaComponent";
import {
  SignUpForm,
  AuthImageMove,
  HeaderAuth,
} from "@/features/authentication";

const metadata = {
  title: "Sign Up || PWNEU",
  description:
    "Create your account to join our community and start participating in exciting challenges.",
};

export default function SignupPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <HeaderAuth />

      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <section className="form-page js-mouse-move-container">
          <AuthImageMove />
          <SignUpForm />
        </section>
      </div>
    </div>
  );
}
