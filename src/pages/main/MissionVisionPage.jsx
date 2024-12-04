import MetaComponent from "@/components/MetaComponent";
import Preloader from "@/components/Preloader";
import Header from "@/layout/headers/Header";
// import Mission from "@/features/about/components/Mission";
import MissionVision from "@/features/about/components/MissionVision";
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
        {/* <Mission /> */}
        <MissionVision />
        <Footer />
      </div>
    </div>
  );
}
