import Preloader from "@/components/Preloader";
import MetaComponent from "@/components/MetaComponent";
import Header from "@/layout/headers/Header";
import PageLinks from "@/components/PageLinks";
import Footer from "@/layout/footers/Footer";
import { UserProfile, UserOverview, UserProfileEvaluation, UserProfileGraph} from "@/features/profile";
import { useEffect, useState } from "react";
import { api } from "@/api";


const metadata = {
  title:
    "",
  description:
    "",
};

export default function UserProfilePage() {
const [userEvaluations, setUserEvaluations] = useState();
const [userGraph, setUserGraph] = useState();

const getMyEvaluations = async () => {
  try {
    const response = await api.get("/play/me/evaluate")
    console.log(response.data)
    setUserEvaluations(response.data);
  } catch {
    setUserEvaluations(null);
  }
};

const getMyGraph = async () => {
  try {
    const response = await api.get(`/play/me/graph`);
    setUserGraph(response.data);
  } catch {
    setUserGraph(null);
  }
};


useEffect(() => {
  getMyEvaluations();
  getMyGraph();
}, []);

  
  return (
    
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />

      <div className="content-wrapper  js-content-wrapper ">
        <PageLinks />
        <UserOverview />
        <UserProfile />
        <UserProfileEvaluation userEvaluations={ userEvaluations } />
        <UserProfileGraph userGraph={userGraph}/>
        <Footer />
      </div>
    </div>
  );
}
