import MetaComponent from "@/components/MetaComponent";
import Preloader from "@/components/Preloader";
import Header from "@/layout/headers/Header";
import Footer from "@/layout/footers/Footer";
import { PrivacyPolicyTabs } from "@/features/ownership";

const metadata = {
  title: "Privacy Policy || PWNEU",
  description:
    "This Privacy Policy outlines how PWNEU collects, uses, and protects your personal information. By using our services, you agree to the collection and use of information in accordance with this policy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />

      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PrivacyPolicyTabs />
        <Footer />
      </div>
    </div>
  );
}
