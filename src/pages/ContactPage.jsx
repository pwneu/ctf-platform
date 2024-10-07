import MetaComponent from "@/components/common/MetaComponent"; 
import Preloader from "@/components/common/Preloader";
import Header from "@/layout/headers/Header";
import Contact from "@/components/contacts/Contact"; 
import Footer from "@/layout/footers/Footer";

const metadata = {
  title: "Contact Us || PWNEU",
  description: "Get in touch with us for any questions, support, or feedback. We're here to help!",
};

export default function ContactPage() {
  return (
    <div className="main-content  ">
      <section className="breadcrumbs  "></section>

      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />

      <div className="content-wrapper js-content-wrapper overflow-hidden">

        <Contact />
        <Footer />

      </div>
    </div>
  );
}
