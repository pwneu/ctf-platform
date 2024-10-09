import MetaComponent from "@/components/MetaComponent";
import Preloader from "@/components/Preloader";
import PageLinks from "@/components/PageLinks";
import Faq from "@/components/Faq";
import Header from "@/layout/headers/Header";
import Footer from "@/layout/footers/Footer";

const metadata = {
  title: "Help Center || PWNEU",
  description:
    "Find answers to your questions, explore tutorials, and get the support you need.",
};

export default function HelpCenterPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />

      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />
        <Faq />
        <Footer />
      </div>
    </div>
  );
}
