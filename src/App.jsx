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
import RequireNoAuth from "./components/RequireNoAuth";
import RequireAuth from "./components/RequireAuth";

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
import {
  CampusesPage,
  // DiscussionForumsPage,
  HomePage,
  WhoWeArePage,
  OurStoryPage,
  MissionVisionPage,
} from "./pages/main";
import {
  ContactPage,
  HelpCenterPage,
  DiscussionForumsPage,
} from "./pages/contact";
import { PrivacyPolicyPage, TermsAndConditionsPage } from "./pages/ownership";
import { ChallengesListPage, ChallengeDetailsPage } from "./pages/play";
import {
  AccessKeysPage,
  AdminPage,
  CategoriesPage,
  ChallengesPage,
  ChallengeDetailsAdminPage,
  UserDetailsPage,
  UsersPage,
  LeaderboardsPage,
  ConfigurationsPage,
} from "./pages/admin";

// import {
//   AchievementDetailsPage,
//   AchievementsListPage,
// } from "./pages/achievements";

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

          {/* Main Application Pages */}
          <Route path="campuses" element={<CampusesPage />} />

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
            element={<TermsAndConditionsPage />}
          />

          {/* Community */}
          <Route path="discussion-forum" element={<DiscussionForumsPage />} />

          {/* Routes that requires the user to be logged out */}
          <Route element={<RequireNoAuth />}>
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
            <Route
              path="user-account-created"
              element={<AccountCreatedPage />}
            />
            <Route path="account-verified" element={<AccountVerifiedPage />} />
          </Route>

          {/* Routes that require the user to be logged in */}
          <Route
            element={
              <RequireAuth allowedRoles={["Member", "Manager", "Admin"]} />
            }
          >
            {/* Challenges */}
            <Route path="list-of-challenges" element={<ChallengesListPage />} />
            <Route
              path="challengeDetails/:id"
              element={<ChallengeDetailsPage />}
            />
          </Route>

          {/* Routes that require the user to have a manager role in order to give access */}
          <Route element={<RequireAuth allowedRoles={["Manager"]} />}>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/keys" element={<AccessKeysPage />} />
            <Route path="/admin/categories" element={<CategoriesPage />} />
            <Route path="/admin/challenges" element={<ChallengesPage />} />
            <Route
              path="/admin/challenge"
              element={<ChallengeDetailsAdminPage />}
            />
            <Route path="/admin/users" element={<UsersPage />} />
            <Route path="/admin/user" element={<UserDetailsPage />} />
            <Route
              path="/admin/configurations"
              element={<ConfigurationsPage />}
            />
            <Route path="/admin/leaderboards" element={<LeaderboardsPage />} />
          </Route>

          {/* Achievements */}
          {/* <Route path="achievements/:id" element={<AchievementsdetailsPage />} /> */}
          {/* <Route path="achievements-list" element={<AchievementsListPage />} />  */}
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
      />
    </>
  );
}

export default App;
