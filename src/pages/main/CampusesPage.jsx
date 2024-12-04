import MetaComponent from "@/components/MetaComponent";
import Preloader from "@/components/Preloader";
import Header from "@/layout/headers/Header";
import CampusesBranch from "@/features/campuses/components/CampusesBranch";
import Footer from "@/layout/footers/Footer";

const metadata = {
  title: "University || PWNEU",
  description:
    "Get in touch with us for any questions, support, or feedback. We're here to help!",
};

export default function CampusesPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />

      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <CampusesBranch />
        <Footer />
      </div>
    </div>
  );
}
