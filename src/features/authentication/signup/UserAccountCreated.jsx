import Preloader from "@/components/common/Preloader"; 
import HeaderAuth from "@/layout/headers/HeaderAuth";
import AuthImageMove from "@/components/others/AuthImageMove"; 
import AccountHasbeenCreated from "@/features/authentication/signup/AccountHasbeenCreated";
import MetaComponent from "@/components/common/MetaComponent"; 

const metadata = {
  title: "Account Created || PWNEU",
  description: "Your account has been created! Explore our community and start participating in exciting challenges.",
};

export default function UserAccountCreatedPage() {
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
