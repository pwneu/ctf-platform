import Header from "@/components/layout/headers/Header";
import Footer from "@/components/layout/footers/Footer";
import Preloader from "@/components/common/Preloader";
import MetaComponent from "@/components/common/MetaComponent";


import HomeHero from "@/components/homes/heros/HomeHero"; 
import Organization from "@/components/common/Organization"; 
import LearningFeatures from "../../../components/homes/LearningFeatures/LearningFeatures";
import FindLearningPath from "@/components/homes/FindLearningPath"; 
import FeaturesBenefits from "@/components/homes/features/Features"; 
import TopCategories from "@/components/homes/categories/TopCategories";
import WhyPWNEU from "@/components/homes/WhyPWNEU"; 

import Mentors from "@/components/homes/mentors/Mentorship"; 
import Campuses from "@/components/homes/campuses/CampusesTag"; 
import Testimonials from "@/components/homes/testimonials/Testimonials";
import Achievement from "@/components/homes/achievements/Achievements"; 


const metadata = {
  title: "Welcome to Our Platform || PWNEU",
  description:
    "Explore our features, participate in challenges, and enjoy your experience on our platform.",
};

export default function PublicWeb() {
  return (
    <>
      <Preloader />
      <MetaComponent meta={metadata} />
      <Header />

      <div className="content-wrapper  js-content-wrapper overflow-hidden">
          <HomeHero />
          <Organization />
          <LearningFeatures />
           <FindLearningPath />
          <FeaturesBenefits />
          <TopCategories />
          <WhyPWNEU />
           <Mentors />
          <Campuses />
          <Testimonials />
          <Achievement /> 

        <Footer />
      </div>
    </>
  );
}
