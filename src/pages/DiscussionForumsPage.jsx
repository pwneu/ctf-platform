import MetaComponent from "@/components/common/MetaComponent"; 
import Preloader from "@/components/common/Preloader"; 
import Header from "@/layout/headers/Header";
import PageLinks from "@/components/common/PageLinks"; 
import DiscussionForum from "@/components/community/DiscussionForum"; 
import Footer from "@/layout/footers/Footer";

const metadata = {
  title:"Discussion Forum || PWNEU",
  description: "A platform for students and faculty at PWNEU to engage in discussions, share knowledge, and collaborate on academic projects.",
};

export default function DiscussionForumsPage() {
  return (
    <div className="main-content  ">

      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />

      <div className="content-wrapper js-content-wrapper overflow-hidden">

        <PageLinks />
        <DiscussionForum  />
        <Footer />

      </div>
    </div>
  );
}
