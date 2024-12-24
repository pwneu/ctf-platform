import MetaComponent from "@/components/MetaComponent";
import HeaderProfile from "@/layout/headers/HeaderProfile";
import UserProfileSidebar from "@/features/user-profile/layout/UserProfileSidebar";
import UserSolves from "@/features/user-profile/components/UserSolves";

const metadata = {
  title: "Solve Overview || PWNEU",
  description:
    "In-depth analysis of tasks and challenges successfully completed by the user.",
};
export default function UserSolveOverviewPage() {
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
            <UserSolves />
          </div>
        </div>
      </main>
    </div>
  );
}
