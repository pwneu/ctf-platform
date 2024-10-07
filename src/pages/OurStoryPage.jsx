import MetaComponent from "@/components/common/MetaComponent";
import Preloader from "@/components/common/Preloader";
import Header from "@/layout/headers/Header";
import OurStory from "@/components/about/OurStory";
import PageLinks from "@/components/common/PageLinks";
import HeroStory from "@/components/about/HeroStory";
import OurApproach from "@/components/about/OurApproach";
import Footer from "@/layout/footers/Footer";


const metadata = {
  title: "Our Story || PWNEU",
  description:
    "Learn about our journey, from humble beginnings to where we are today, and the values that drive us.",
};

export default function OurStoryPage() {
  return (
    <div className="main-content  ">

      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />

      <div className="content-wrapper js-content-wrapper overflow-hidden">

        <PageLinks />
        <HeroStory />
        <OurStory />
        <OurApproach />
        <Footer />

      </div>
    </div>
  );
}
