import MetaComponent from "@/components/common/MetaComponent"; 
import Preloader from "@/components/common/Preloader"; 
import Header from "@/layout/headers/Header";
import PageLinks from "@/components/common/PageLinks"; 
import OurPreview from "@/components/about/OurPreview";
import WhoWeAre from "@/components/about/WhoWeAre"; 
import Founder from "@/components/home/DevFounder";
import Footer from "@/layout/footers/Footer";

const metadata = {
  title:
    "Who We Are || PWNEU",
    description: "Get to know PWNEU—our team, our values, and what makes us unique in the world of competitive challenges.",
};

export default function WhoWeArePage() {
  return (
    <div className="main-content  ">

      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />

      <div className="content-wrapper js-content-wrapper overflow-hidden">

        <PageLinks />
        <OurPreview />
        <WhoWeAre />
        <Founder />
        <Footer />

      </div>
    </div>
  );
}
