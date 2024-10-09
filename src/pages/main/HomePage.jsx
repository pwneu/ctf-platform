import Footer from "@/layout/footers/Footer";
import Preloader from "@/components/Preloader";
import MetaComponent from "@/components/MetaComponent";
import Header from "@/layout/headers/Header";

import {
  HomeHero,
  Organization,
  LearningFeatures,
  FindLearningPath,
  CampusesTag,
  WhyPWNEU,
  Features,
  TopCategories,
  Testimonials,
  // Achievements
} from "@/features/home";

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
        <CampusesTag />
        <WhyPWNEU />
        <Features />
        <TopCategories />
        <Testimonials />
        {/* <Achievements /> */}
        <Footer />
      </div>
    </>
  );
}
