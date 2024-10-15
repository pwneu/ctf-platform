import Preloader from "@/components/Preloader";
import MetaComponent from "@/components/MetaComponent";
import Header from "@/layout/headers/Header";
import PageLinks from "@/components/PageLinks";
import Footer from "@/layout/footers/Footer";
import {
  UserProfile,
  // UserOverview,
  UserProfileEvaluation,
  UserProfileGraph,
  UserProfileSolves,
  UserProfileHintUsages,
} from "@/features/profile";
import { useState } from "react";

const metadata = {
  title: "",
  description: "",
};

export default function UserProfilePage() {
  const [userDetails, setUserDetails] = useState();
  const [totalSolveCount, setTotalSolveCount] = useState(0);
  const [totalHintUsagesCount, setTotalHintUsagesCount] = useState(0);

  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />

      <div className="content-wrapper  js-content-wrapper ">
        <PageLinks />
        {/* <UserOverview /> */}
        <UserProfile
          totalSolveCount={totalSolveCount}
          totalHintUsagesCount={totalHintUsagesCount}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
        />
        <UserProfileEvaluation />
        <UserProfileGraph />
        <UserProfileSolves
          totalSolveCount={totalSolveCount}
          setTotalSolveCount={setTotalSolveCount}
        />
        <UserProfileHintUsages
          totalHintUsagesCount={totalHintUsagesCount}
          setTotalHintUsagesCount={setTotalHintUsagesCount}
        />
        <Footer />
      </div>
    </div>
  );
}
