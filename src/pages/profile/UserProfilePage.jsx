import Preloader from "@/components/Preloader";
import MetaComponent from "@/components/MetaComponent";
import Header from "@/layout/headers/Header";
import PageLinks from "@/components/PageLinks";
import Footer from "@/layout/footers/Footer";
import {
  UserProfile,
  UserOverview,
  UserProfileEvaluation,
  UserProfileGraph,
  UserProfileSolves,
  UserProfileHintUsages,
} from "@/features/profile";

const metadata = {
  title: "",
  description: "",
};

export default function UserProfilePage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />

      <div className="content-wrapper  js-content-wrapper ">
        <PageLinks />
        <UserOverview />
        <UserProfile />
        <UserProfileEvaluation />
        <UserProfileGraph />
        <UserProfileSolves />
        <UserProfileHintUsages />
        <Footer />
      </div>
    </div>
  );
}
