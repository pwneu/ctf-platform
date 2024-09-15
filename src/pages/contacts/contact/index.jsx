
import Preloader from "@/components/common/Preloader";
import Contact from "@/components/contacts/Contact"; 
import Footer from "@/components/layout/footers/Footer"; 
import Header from "@/components/layout/headers/Header";
import React from "react"; 

import MetaComponent from "@/components/common/MetaComponent"; 

const metadata = {
  title: "Contact Us || PWNEU",
  description: "Get in touch with us for any questions, support, or feedback. We're here to help!",
};

export default function ContactPage() {
  return (
    <div className="main-content  ">
      <section class="breadcrumbs  "></section>
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
