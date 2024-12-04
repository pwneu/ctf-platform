import MetaComponent from "@/components/MetaComponent";
import Preloader from "@/components/Preloader";
import Header from "@/layout/headers/Header";
import Footer from "@/layout/footers/Footer";
import { NotFound } from "@/features/contact";

const metadata = {
  title: "Not Found || PWNEU",
  description: "The page you're looking for could not be found. Please check the URL or go back to the homepage.",
};

export default function NotFoundPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />

      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <NotFound />
        <Footer />
      </div>
    </div>
  );
}
