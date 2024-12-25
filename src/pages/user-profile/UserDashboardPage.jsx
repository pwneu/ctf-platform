import MetaComponent from "@/components/MetaComponent";
import HeaderProfile from "@/layout/headers/HeaderProfile";
import UserProfileSidebar from "@/features/user-profile/layout/UserProfileSidebar";
import UserProfileDashboard from "@/features/user-profile/layout/UserProfileDashboard";

const metadata = {
  title: "Profile || PWNEU",
  description:
    "Comprehensive overview of the user's profile, including personal details and activity.",
};

export default function UserDashboardPage() {
  return (
    <div className="barba-container" data-barba="container">
      <MetaComponent meta={metadata} />
      <main className="main-content">
        <HeaderProfile />
        <div className="content-wrapper js-content-wrapper overflow-hidden">
          <div
            id="dashboardOpenClose"
            className="dashboard -home-9 js-dashboard-home-9"
          >
            <div className="dashboard__sidebar scroll-bar-1">
              <UserProfileSidebar />
            </div>
            <UserProfileDashboard />
          </div>
        </div>
      </main>
    </div>
  );
}
