import Preloader from "@/components/Preloader";
import MetaComponent from "@/components/MetaComponent";
import Header from "@/layout/headers/Header";
import Footer from "@/layout/footers/Footer";
import {
  UserProfileOld,
  // UserOverview,
  UserProfileEvaluationOld,
  UserProfileGraphOld,
  UserProfileSolvesOld,
  UserProfileHintUsagesOld,
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
        {/* <UserOverview /> */}
        <UserProfileOld
          totalSolveCount={totalSolveCount}
          totalHintUsagesCount={totalHintUsagesCount}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
        />
        <UserProfileEvaluationOld />
        <UserProfileGraphOld />
        <UserProfileSolvesOld
          totalSolveCount={totalSolveCount}
          setTotalSolveCount={setTotalSolveCount}
        />
        <UserProfileHintUsagesOld
          totalHintUsagesCount={totalHintUsagesCount}
          setTotalHintUsagesCount={setTotalHintUsagesCount}
        />
        <Footer />
      </div>
    </div>
  );
}
