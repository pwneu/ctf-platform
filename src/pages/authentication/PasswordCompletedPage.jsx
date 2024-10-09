import Preloader from "@/components/common/Preloader";
import MetaComponent from "@/components/common/MetaComponent";
import {
  PasswordCompleted,
  AuthImageMove,
  HeaderAuth,
} from "@/features/authentication";

const metadata = {
  title: "Password Reset Complete || PWNEU",
  description:
    "Your password has been successfully reset. You can now log in and explore our platform.",
};

export default function PasswordCompletedPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <HeaderAuth />

      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <section className="form-page js-mouse-move-container">
          <AuthImageMove />
          <PasswordCompleted />
        </section>
      </div>
    </div>
  );
}
