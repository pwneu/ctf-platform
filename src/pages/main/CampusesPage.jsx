import MetaComponent from "@/components/MetaComponent";
import Preloader from "@/components/Preloader";
import Header from "@/layout/headers/Header";
import CampusPreview from "@/features/campuses/components/CampusPreview";
import Footer from "@/layout/footers/Footer";

import {
  MainBranch,
  BatangasBranch,
  PampangaBranch,
  GeneralSantosBranch,
  RizalBranch,
} from "@/features/campuses";

const metadata = {
  title: "University || PWNEU",
  description:
    "Get in touch with us for any questions, support, or feedback. We're here to help!",
};

export default function CampusesPage() {
  return (
    <div className="main-content  ">
      <section className="breadcrumbs  "></section>

      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />

      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <CampusPreview />
        <MainBranch />
        <BatangasBranch />
        <PampangaBranch />
        <GeneralSantosBranch />
        <RizalBranch />
        <Footer />
      </div>
    </div>
  );
}
