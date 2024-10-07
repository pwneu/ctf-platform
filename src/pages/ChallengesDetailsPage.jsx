import { useParams } from "react-router-dom"; 
import Preloader from "@/components/common/Preloader"; 
import MetaComponent from "@/components/common/MetaComponent"; 
import Header from "@/layout/headers/Header";  
import PageLinks from "@/components/common/PageLinks";  
import ChallengeDetails from "@/components/challengeDetails/ChallengeDetails"; 
import Footer from "@/layout/footers/Footer"; 

const metadata = {
  title:
    "Challenge Details || PWNEU - Professional LMS Online Education Course ReactJS Template",
  description:
    "Elevate your e-learning content with PWNEU, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default function ChallengesDetails() {
  let params = useParams();
  <Preloader />;
  return (
    <div className="main-content  ">

      <MetaComponent meta={metadata} />
      <Header />

      <div className="content-wrapper  js-content-wrapper ">

        <PageLinks />
        <ChallengeDetails id={params.id} />
        <Footer />

      </div>
    </div>
  );
}
