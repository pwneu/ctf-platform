import Preloader from "@/components/common/Preloader"; 
import HeaderAuth from "@/layout/headers/HeaderAuth";
import AuthImageMove from "@/components/others/AuthImageMove";
import VerifyCode from "@/features/authentication/login/VerifyCode"; 
import MetaComponent from "@/components/common/MetaComponent"; 

const metadata = {
  title: "Verify Code || PWNEU",
  description: "Enter the verification code sent to your email to confirm your identity and proceed.",
};

export default function VerifyCodePage() {
  return (
    <div className="main-content  ">

      <MetaComponent meta={metadata} />
      <Preloader />
      <HeaderAuth />

      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <section className="form-page js-mouse-move-container">

          <AuthImageMove />
          <VerifyCode />
          
        </section>
      </div>
    </div>
  );
}
