import "./styles/index.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-calendar/dist/Calendar.css";
import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

import IndexWeb from "./pages/home/indexweb";

import LoginPage from "./pages/login";
import ForgotPasswordPage from "./pages/login/UserForgotPassword";
import VerifyCodePage from "./pages/login/UserVerifyCode";
import SetPasswordPage from "./pages/login/UserSetPassword";
import PasswordCompletedPage from "./pages/login/UserPasswordCompleted";

import SignupPage from "./pages/signup";
import AccountCreatedPage from "./pages/signup/UserAccountCreated";
import AccountHasVerifiedPage from "@/pages/signup/UserGetStarted";

import ContactPage from "./pages/contacts/contact";
import PrivacyPolicyPage from "./pages/ownership/privacy-policy";
import TermsandConditionsPage from "./pages/ownership/terms-and-conditions";

import UniversityPage from "./pages/campuses/campuses";
import ListofChallenges from "./pages/challengesList/list-of-challenges";

import OurStoryPage from "./pages/about/our-story";
import WhoWeArePage from "./pages/about/who-we-are";
import MissionVisionPage from "./pages/about/mission-vision";
import HelpCenterPage from "./pages/others/help-center";

import DiscussionPage from "./pages/community/discussion-forum";
import { ToastContainer } from "react-toastify";
// import AchievementsdetailsPage from "./pages/achivements/achievements";
// import AchievementsListPage from "./pages/achivements/achievements-list";

import "react-toastify/dist/ReactToastify.css"; // Make sure to import CSS
import VerifyEmailPage from "./pages/signup/VerifyEmail";

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
      <Routes>
        <Route path="/">
          {/* Homepage */}
          <Route index element={<IndexWeb />} />

          {/* User Login */}
          <Route path="login" element={<LoginPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="verify-code" element={<VerifyCodePage />} />
          <Route path="set-new-password" element={<SetPasswordPage />} />
          <Route
            path="password-completed"
            element={<PasswordCompletedPage />}
          />
          <Route path="verify-email" element={<VerifyEmailPage />} />

          {/* User Registration */}
          <Route path="signup" element={<SignupPage />} />
          <Route path="user-account-created" element={<AccountCreatedPage />} />
          <Route path="account-verified" element={<AccountHasVerifiedPage />} />
          <Route path="campuses" element={<UniversityPage />} />

          {/* About Us*/}
          <Route path="our-story" element={<OurStoryPage />} />
          <Route path="who-we-are" element={<WhoWeArePage />} />
          <Route path="mission-vision" element={<MissionVisionPage />} />

          {/* Contact */}
          <Route path="contact" element={<ContactPage />} />
          <Route path="help-center" element={<HelpCenterPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route
            path="terms-and-conditions"
            element={<TermsandConditionsPage />}
          />

          {/* Compete */}
          <Route path="list-of-challenges" element={<ListofChallenges />} />

          {/* Community */}
          <Route path="discussion-forum" element={<DiscussionPage />} />

          {/* Achievements */}
          {/* <Route path="achievements/:id" element={<AchievementsdetailsPage />} /> */}
          {/* <Route path="achievements-list" element={<AchievementsListPage />} />  */}
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}
export default App;
