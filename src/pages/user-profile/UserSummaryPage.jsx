import MetaComponent from "@/components/MetaComponent";
import HeaderProfile from "@/layout/headers/HeaderProfile";
import UserProfileSidebar from "@/features/user-profile/layout/UserProfileSidebar";
import UserReportOld from "@/features/user-profile/components/UserReportOld";

const metadata = {
  title:
    "Summary || PWNEU",
  description:
    "A concise yet detailed summary of the user's overall activity and performance.",
};

export default function UserSummaryPage() {
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
            <UserReportOld />
          </div>
        </div>
      </main>
    </div>
  );
}
