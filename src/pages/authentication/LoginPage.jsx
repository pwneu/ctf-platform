import Preloader from "@/components/common/Preloader";
import MetaComponent from "@/components/common/MetaComponent";
import {
  LoginForm,
  AuthImageMove,
  HeaderAuth,
} from "@/features/authentication";

const metadata = {
  title: "Login || PWNEU",
  description:
    "Access your account to explore our platform and participate in challenges.",
};

export default function LoginPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <HeaderAuth />

      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <section className="form-page js-mouse-move-container">
          <AuthImageMove />
          <LoginForm />
        </section>
      </div>
    </div>
  );
}
