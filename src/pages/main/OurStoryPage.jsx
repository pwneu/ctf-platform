import MetaComponent from "@/components/MetaComponent";
import Preloader from "@/components/Preloader";
import Header from "@/layout/headers/Header";
import OurStory from "@/features/about/components/OurStory";
import PageLinks from "@/components/PageLinks";
import HeroStory from "@/features/about/components/HeroStory";
import OurApproach from "@/features/about/components/OurApproach";
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
