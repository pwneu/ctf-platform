import MetaComponent from "@/components/common/MetaComponent";  
import Preloader from "@/components/common/Preloader";
import Header from "@/layout/headers/Header";
import PageLinks from "@/components/common/PageLinks"; 
import AchievementsOne from "@/components/achievements/AchievementsOne";
import Footer from "@/layout/footers/Footer";

const metadata = {
  title: "Achievements List || PWNEU",
  description: "Explore our milestones and accomplishments that showcase our journey and success.",
};

export default function AchievementsListPage() {
  return (
    <div className="main-content  ">

      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />

      <div className="content-wrapper js-content-wrapper overflow-hidden">

        <PageLinks />
        <AchievementsOne />
        <Footer />

      </div>
    </div>
  );
}
