import Preloader from "@/components/Preloader";
import MetaComponent from "@/components/MetaComponent";
import {
  AccountHasbeenCreated,
  AuthImageMove,
  HeaderAuth
} from "@/features/authentication";

const metadata = {
  title: "Account Created || PWNEU",
  description:
    "Your account has been created! Explore our community and start participating in exciting challenges.",
};

export default function AccountCreatedPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <HeaderAuth />

      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <section className="form-page js-mouse-move-container">
          <AuthImageMove />
          <AccountHasbeenCreated />
        </section>
      </div>
    </div>
  );
}
