import MetaComponent from "@/components/MetaComponent";
import HeaderProfile from "@/layout/headers/HeaderProfile";
import Sidebar from "@/features/user-profile/components/Sidebar";
import HintUsage from "@/features/user-profile/components/HintUsage";

const metadata = {
  title: "Hints activity || PWNEU",
  description:
    "Insights into the user's hint usage, including frequency and effectiveness.",
};
export default function UserHintUsagePage() {
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
              <Sidebar />
            </div>
            <HintUsage />
          </div>
        </div>
      </main>
    </div>
  );
}
