import AOS from "aos";
import "aos/dist/aos.css";
import "./styles/index.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-calendar/dist/Calendar.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import RequireNoAuth from "./components/RequireNoAuth";
import RequireAuth from "./components/RequireAuth";

import {
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  VerifyEmailPage,
  SignupPage,
} from "./pages/authentication";
import { CertifyPage, UserProfilePage } from "./pages/profile";
import {
  CampusesPage,
  // DiscussionForumsPage,
  HomePage,
  WhoWeArePage,
  OurStoryPage,
  MissionVisionPage,
  NotFoundPage,
} from "./pages/main";
import {
  ContactPage,
  HelpCenterPage,
  DiscussionForumsPage,
} from "./pages/contact";
import { PrivacyPolicyPage, TermsAndConditionsPage } from "./pages/ownership";
import {
  ChallengeDetailsPage,
  ChallengesPage,
  LeaderboardsPage,
} from "./pages/play";
import {
  AccessKeysPage,
  AdminPage,
  CategoriesPage,
  ChallengeDetailsAdminPage,
  UserDetailsPage,
  UsersPage,
  LeaderboardsAdminPage,
  ConfigurationsPage,
  ChallengesAdminPage,
} from "./pages/admin";
import RequireDefinedAuth from "./components/RequireDefinedAuth";

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

    console.log(
      "%cPWNEU{570P_R1GH7_TH3R3!}",
      "color: red; font-size: 30px; font-weight: bold;"
    );
    console.log(
      "%cThis is a developer feature designed for use by developers. If anyone asks you to copy and paste something here to enable a feature or 'hack' into someone's account, it is a scam and could grant them access to your account.",
      "font-size: 20px; font-weight: bold;"
    );
  }, []);

  return (
    <>
      <Routes>
        <Route path="/">
          <Route element={<RequireDefinedAuth />}>
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
          </Route>

          {/* Routes that requires the user to be logged out */}
          <Route element={<RequireNoAuth />}>
            {/* User Authentication */}

            <Route path="login" element={<LoginPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
            <Route path="verify-email" element={<VerifyEmailPage />} />

            {/* User Registration */}
            <Route path="signup" element={<SignupPage />} />
          </Route>

          {/* Routes that require the user to be logged in */}
          <Route
            element={
              <RequireAuth allowedRoles={["Member", "Manager", "Admin"]} />
            }
          >
            {/* Challenges */}
            <Route path="play" element={<ChallengesPage />} />
            <Route path="/play/:id" element={<ChallengeDetailsPage />} />
            <Route path="/leaderboards" element={<LeaderboardsPage />} />
          </Route>

          {/* Routes that require the user to be a member */}
          <Route element={<RequireAuth allowedRoles={["Member"]} />}>
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/certify" element={<CertifyPage />} />
          </Route>

          {/* Routes that require the user to have a manager role in order to give access */}
          <Route element={<RequireAuth allowedRoles={["Manager"]} />}>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/keys" element={<AccessKeysPage />} />
            <Route path="/admin/categories" element={<CategoriesPage />} />
            <Route path="/admin/challenges" element={<ChallengesAdminPage />} />

            <Route
              path="/admin/challenge/:id"
              element={<ChallengeDetailsAdminPage />}
            />
            <Route path="/admin/users" element={<UsersPage />} />
            <Route path="/admin/user/:id" element={<UserDetailsPage />} />
            <Route
              path="/admin/configurations"
              element={<ConfigurationsPage />}
            />
            <Route
              path="/admin/leaderboards"
              element={<LeaderboardsAdminPage />}
            />
          </Route>

          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
          {/* Achievements */}
          {/* <Route path="achievements/:id" element={<AchievementsdetailsPage />} /> */}
          {/* <Route path="achievements-list" element={<AchievementsListPage />} />  */}
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </>
  );
}

export default App;
