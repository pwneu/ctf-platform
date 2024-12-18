import { useParams } from "react-router-dom";
import Preloader from "@/components/Preloader";
import MetaComponent from "@/components/MetaComponent";
import Header from "@/layout/headers/Header";
import Footer from "@/layout/footers/Footer";
// import { ChallengeDetailsOld } from "@/features/challengeDetails";
import { ChallengeDetails } from "@/features/challengeDetails"

const metadata = {
  title:
    "Challenge Details || PWNEU - Professional LMS Online Education Course ReactJS Template",
  description:
    "Elevate your e-learning content with PWNEU, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default function ChallengeDetailsPage() {
  let params = useParams();

  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />;
      <Header />
      <div className="content-wrapper  js-content-wrapper ">
        {/* <ChallengeDetailsOld id={params.id} /> */}
        <ChallengeDetails id={params.id} />
        <Footer />
      </div>
    </div>
  );
}
