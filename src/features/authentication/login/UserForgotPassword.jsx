import Preloader from "@/components/common/Preloader"; 
import HeaderAuth from "@/layout/headers/HeaderAuth";
import AuthImageMove from "@/components/others/AuthImageMove";
import ForgotPassword from "@/features/authentication/login/ForgotPassword"; 
import MetaComponent from "@/components/common/MetaComponent"; 

const metadata = {
  title: "Forgot Password || PWNEU",
  description: "Reset your password to regain access to your account and continue exploring our platform.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="main-content  ">
      
      <MetaComponent meta={metadata} />
      <Preloader />
      <HeaderAuth />

      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <section className="form-page js-mouse-move-container">

          <AuthImageMove />
          <ForgotPassword />

        </section>
      </div>
    </div>
  );
}
