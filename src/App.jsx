import AOS from "aos";
import "aos/dist/aos.css";
import "./styles/index.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-calendar/dist/Calendar.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

// Authentication-related pages
import {
  LoginPage,
  ForgotPasswordPage,
  VerifyCodePage,
  SetPasswordPage,
  PasswordCompletedPage,
  VerifyEmailPage,
  SignupPage,
  AccountCreatedPage,
  AccountVerifiedPage,
} from "./pages/authentication";

// Main application pages
import HomePage from "./pages/HomePage.jsx";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsandConditionsPage from "./pages/TermsAndConditionsPage";
import UniversityPage from "./pages/CampusesPage";
import ListofChallenges from "./pages/ChallengeListPage";
import ChallengeDetails from "./pages/ChallengesDetailsPage";

// Informational pages
import OurStoryPage from "./pages/OurStoryPage";
import WhoWeArePage from "./pages/WhoWeArePage";
import MissionVisionPage from "./pages/MissionVisionsPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import DiscussionPage from "./pages/DiscussionForumsPage";

// import AchievementsdetailsPage from "./pages/achivements/achievements";
// import AchievementsListPage from "./pages/achivements/achievements-list";

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
          <Route index element={<HomePage />} />

          {/* User Authentication */}
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
          <Route path="account-verified" element={<AccountVerifiedPage />} />

          {/* Main Application Pages */}
          <Route path="campuses" element={<UniversityPage />} />

          {/* About Us */}
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

          {/* Challenges */}
          <Route path="list-of-challenges" element={<ListofChallenges />} />
          <Route path="challengeDetails/:id" element={<ChallengeDetails />} />

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
