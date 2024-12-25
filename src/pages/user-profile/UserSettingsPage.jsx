import MetaComponent from "@/components/MetaComponent";
import HeaderProfile from "@/layout/headers/HeaderProfile";
import UserProfileSidebar from "@/features/user-profile/layout/UserProfileSidebar";

import UserProfileSettings from "@/features/user-profile/layout/UserProfileSettings";

const metadata = {
  title: "Settings || PWNEU",
  description:
    "Configuration options for personalizing the user's account and application preferences.",
};
export default function UserSettingsPage() {
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
            <UserProfileSettings />
          </div>
        </div>
      </main>
    </div>
  );
}
