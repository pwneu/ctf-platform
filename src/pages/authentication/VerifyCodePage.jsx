import Preloader from "@/components/Preloader";
import MetaComponent from "@/components/MetaComponent";
import {
  VerifyCode,
  AuthImageMove,
  HeaderAuth,
} from "@/features/authentication";

const metadata = {
  title: "Verify Code || PWNEU",
  description:
    "Enter the verification code sent to your email to confirm your identity and proceed.",
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
