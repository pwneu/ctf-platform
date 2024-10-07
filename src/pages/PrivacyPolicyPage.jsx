import MetaComponent from "@/components/common/MetaComponent"; 
import Preloader from "@/components/common/Preloader"; 
import Header from "@/layout/headers/Header";
import PageLinks from "@/components/common/PageLinks"; 
import PrivacyTabs from "@/components/ownership/privacy-policy/Tabs";
import Footer from "@/layout/footers/Footer";

const metadata = {
  title:"Privacy Policy || PWNEU",
  description: "This Privacy Policy outlines how PWNEU collects, uses, and protects your personal information. By using our services, you agree to the collection and use of information in accordance with this policy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="main-content  ">

      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />

      <div className="content-wrapper js-content-wrapper overflow-hidden">

        <PageLinks />
        <PrivacyTabs />
        <Footer />

      </div>
    </div>
  );
}
