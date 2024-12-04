import { useParams } from "react-router-dom";
import MetaComponent from "@/components/MetaComponent";
import Preloader from "@/components/Preloader";
import Header from "@/layout/headers/Header";
import Footer from "@/layout/footers/Footer";
import { AchievementsDetails } from "@/features/achievements";

const metadata = {
  title: "Achievements Details || PWNEU",
  description:
    "Delve into the specifics of our key accomplishments and milestones that define our success.",
};

export default function AchievementDetailsPage() {
  let params = useParams();
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />

      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <AchievementsDetails id={params.id} />
        <Footer />
      </div>
    </div>
  );
}
