import Preloader from "@/components/Preloader";
import MetaComponent from "@/components/MetaComponent";
import { SetPassword, AuthImageMove, HeaderAuth } from "@/features/authentication";

const metadata = {
  title: "Set New Password || PWNEU",
  description:
    "Create a new password to secure your account and gain access to our platform.",
};

export default function SetPasswordPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <HeaderAuth />

      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <section className="form-page js-mouse-move-container">
          <AuthImageMove />
          <SetPassword />
        </section>
      </div>
    </div>
  );
}
