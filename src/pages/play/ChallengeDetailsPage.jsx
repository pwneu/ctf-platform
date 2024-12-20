import { useParams } from "react-router-dom";
import Preloader from "@/components/Preloader";
import MetaComponent from "@/components/MetaComponent";
import Header from "@/layout/headers/Header";
import Footer from "@/layout/footers/Footer";
// import { ChallengeDetailsOld } from "@/features/challengeDetails";
import { ChallengeDetails } from "@/features/challengeDetails";

const metadata = {
  title: "Challenge Details || PWNEU",
  description:
    "This challenge is part of the PWNEU competition, focusing on advanced problem-solving and technical expertise in cybersecurity and related domains.",
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
