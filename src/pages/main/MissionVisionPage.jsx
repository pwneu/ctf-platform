import MetaComponent from "@/components/MetaComponent";
import Preloader from "@/components/Preloader";
import Header from "@/layout/headers/Header";
import PageLinks from "@/components/PageLinks";
import Mission from "@/features/about/components/Mission";
import Vision from "@/features/about/components/Vision";
import GoalsAndObjectives from "@/features/about/components/GoalsAndObjectives";
import Footer from "@/layout/footers/Footer";

const metadata = {
  title: "Mission and Vision || PWNEU",
  description:
    "Discover our core values, our mission to drive innovation, and our vision for the future.",
};

export default function MissionVisionPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />

      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />
        <Mission />
        <Vision />
        <GoalsAndObjectives />
        <Footer />
      </div>
    </div>
  );
}
