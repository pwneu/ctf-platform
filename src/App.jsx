import AOS from "aos";
import "aos/dist/aos.css";
// import "./styles/index.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-calendar/dist/Calendar.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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
// import { CertifyPage /*UserProfilePage*/ } from "./pages/profile";
import {
  UserDashboardPage,
  // UserSummaryPage,
  UserSolveOverviewPage,
  UserHintUsagePage,
  // UserCertifyPage,
  UserSettingsPage,
} from "./pages/user-profile";

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
import BlacklistPage from "./pages/admin/BlacklistPage";
import ChatBotPage from "./pages/chatbot/ChatBotPage";
import AuditsPage from "./pages/admin/AuditsPage";
// import {
//   AchievementDetailsPage,
//   AchievementsListPage,
// } from "./pages/achievements";

function App() {
  const location = useLocation();
  const [cssLoaded, setCssLoaded] = useState(false); // Initialize state to false

  // Conditionally load SCSS or Bootstrap CSS based on route
  useEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      // import("bootstrap/dist/css/bootstrap.min.css").then(() => {
      //   setCssLoaded(true); // Bootstrap is loaded
      // });
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css";
      document.head.appendChild(link);

      // Set loading to false once the link is added
      link.onload = () => setCssLoaded(true);
    } else {
      import("./styles/index.scss").then(() => {
        setCssLoaded(true); // SCSS is loaded
      });
    }
  }, [location.pathname]);

  // Conditionally load SCSS based on route
  // useEffect(() => {
  //   if (!location.pathname.startsWith("/admin")) {
  //     import("./styles/index.scss").then(() => {
  //       setCssLoaded(true); // Set loading to false after SCSS is loaded
  //     });
  //   } else {
  //     setCssLoaded(true); // Don't load SCSS for /admin pages
  //   }
  // }, [location.pathname]);

  useEffect(() => {
    AOS.init({
      duration: 700,
      offset: 120,
      easing: "ease-out",
      once: true,
    });

    // eslint-disable-next-line no-console
    console.log(
      "%cPWNEU{570P_R1GH7_TH3R3!}",
      "color: red; font-size: 30px; font-weight: bold;"
    );
    // eslint-disable-next-line no-console
    console.log(
      "%cThis is a developer feature designed for use by developers. If anyone asks you to copy and paste something here to enable a feature or 'hack' into someone's account, it is a scam and could grant them access to your account.",
      "font-size: 20px; font-weight: bold;"
    );
  }, []);

  if (!cssLoaded) {
    return <div></div>; // Show loading indicator while CSS is being loaded
  }

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
            <Route path="/chat" element={<ChatBotPage />} />
          </Route>

          {/* Routes that require the user to be a member */}
          <Route element={<RequireAuth allowedRoles={["Member"]} />}>
            {/* <Route path="/profile" element={<UserProfilePage />} />  */}
            <Route path="/dashboard" element={<UserDashboardPage />} />
            {/* <Route path="/user-summary" element={<UserSummaryPage />} /> */}
            <Route path="/solve-overview" element={<UserSolveOverviewPage />} />
            <Route path="/hint-usage" element={<UserHintUsagePage />} />
            {/* <Route path="/certify" element={<UserCertifyPage />} /> */}
            <Route path="/settings" element={<UserSettingsPage />} />
            {/* <Route path="/certify" element={<CertifyPage />} /> */}
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
            <Route path="/admin/blacklist" element={<BlacklistPage />} />
            <Route
              path="/admin/leaderboards"
              element={<LeaderboardsAdminPage />}
            />
          </Route>

          {/* Routes that only the admin is allowed to access*/}
          <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
            <Route path="/admin/audits" element={<AuditsPage />} />
          </Route>

          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
          {/* Achievements */}
          {/* <Route path="achievements/:id" element={<AchievementsdetailsPage />} /> */}
          {/* <Route path="achievements-list" element={<AchievementsListPage />} />  */}
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        // hideProgressBar
        style={{ width: "500px" }}
      />
    </>
  );
}

export default App;
