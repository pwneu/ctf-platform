import "./styles/index.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-calendar/dist/Calendar.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import IndexWeb from "./pages/home/indexweb";

import LoginPage from "./pages/others/login";
import SignupPage from "./pages/others/signup";
import ContactPage from "./pages/contacts/contact";
import HelpCenterPage from "./pages/others/help-center";
import ListofChallenges from "./pages/challengesList/list-of-challenges";

import OurStoryPage from "./pages/about/our-story";
import WhoWeArePage from "./pages/about/who-we-are";
import MissionVisionPage from "./pages/about/mission-vision";


import DiscussionPage from "./pages/community/discussion-forum";
import LearningPathPage from "./pages/community/learning-paths";
import ResourcesLibrariesPage from "./pages/community/resource-libraries";
import CareerDevelopment from "./pages/community/career-development";

import AchievementsdetailsPage from "./pages/achivements/achievements";
import AchievementsListPage from "./pages/achivements/achievements-list";  


function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      offset: 120,
      easing: "ease-out",
      once: true,
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {/* Homepage */}
            <Route index element={<IndexWeb />} />

            {/* Users */}
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />

            {/* About Us*/}
            <Route path="our-story" element={<OurStoryPage />} />
            <Route path="who-we-are" element={<WhoWeArePage />} />
            <Route path="mission-vision" element={<MissionVisionPage />} />

            {/* Contact */}
            <Route path="contact" element={<ContactPage />} />
            <Route path="help-center" element={<HelpCenterPage />} />

            {/* Compete */}
            <Route path="list-of-challenges" element={<ListofChallenges />} />

            {/* Community */}
            <Route path="discussion-forum" element={<DiscussionPage />} />
            <Route path="learning-paths" element={<LearningPathPage />} />
            <Route path="resource-libraries" element={<ResourcesLibrariesPage />} />
            <Route path="career-development" element={<CareerDevelopment />} />

            {/* Achievements */}
            <Route path="achievements/:id" element={<AchievementsdetailsPage />} />
            <Route path="achievements-list" element={<AchievementsListPage />} /> 

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
