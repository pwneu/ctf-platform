import MetaComponent from "@/components/MetaComponent";
import Preloader from "@/components/Preloader";
import Header from "@/layout/headers/Header";
import Footer from "@/layout/footers/Footer";
import { AchievementsOne } from "@/features/achievements";

const metadata = {
  title: "Achievements List || PWNEU",
  description:
    "Explore our milestones and accomplishments that showcase our journey and success.",
};

export default function AchievementsListPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />

      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <AchievementsOne />
        <Footer />
      </div>
    </div>
  );
}
