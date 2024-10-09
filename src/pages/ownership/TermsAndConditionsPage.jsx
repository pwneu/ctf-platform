import MetaComponent from "@/components/MetaComponent";
import Preloader from "@/components/Preloader";
import Header from "@/layout/headers/Header";
import PageLinks from "@/components/PageLinks";
import Footer from "@/layout/footers/Footer";
import { TermsAndConditionTabs } from "@/features/ownership";

const metadata = {
  title: "Terms and Conditions || PWNEU",
  description:
    "These Terms and Conditions govern your use of the PWNEU website and services. By accessing or using our site, you agree to comply with these terms. Please read them carefully.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />

      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />
        <TermsAndConditionTabs />
        <Footer />
      </div>
    </div>
  );
}
