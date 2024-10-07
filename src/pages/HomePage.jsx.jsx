import HomeHero from "@/components/home/HomeHero"; 
import Organization from "@/components/common/Organization"; 
import LearningFeatures from "../components/home/LearningFeatures";
import FindLearningPath from "@/components/home/FindLearningPath"; 
import Campuses from "@/components/home/CampusesTag"; 
import WhyPWNEU from "@/components/home/WhyPWNEU"; 
import FeaturesBenefits from "@/components/home/Features"; 
import TopCategories from "@/components/home/TopCategories";
import Testimonials from "@/components/home/Testimonials";
import Footer from "@/layout/footers/Footer";
// import Achievement from "@/components/homes/achievements/Achievements"; 
import Preloader from "@/components/common/Preloader";
import MetaComponent from "@/components/common/MetaComponent";
import Header from "@/layout/headers/Header";

const metadata = {
  title: "Welcome to Our Platform || PWNEU",
  description:
    "Explore our features, participate in challenges, and enjoy your experience on our platform.",
};

export default function HomePage() {
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
          <Campuses />
          <WhyPWNEU />
          <FeaturesBenefits />
          <TopCategories />
          <Testimonials />
          {/* <Achievement />  */}
          <Footer />

      </div>
    </>
  );
}
