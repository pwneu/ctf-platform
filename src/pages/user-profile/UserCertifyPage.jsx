import MetaComponent from "@/components/MetaComponent";
import HeaderProfile from "@/layout/headers/HeaderProfile";
import Sidebar from "@/features/user-profile/components/Sidebar";

import Certification from "@/features/user-profile/components/Certificate";

const metadata = {
  title: "User Certificate || PWNEU",
  description:
    "Detailed information about the certifications achieved by the user.",
};

export default function UserCertifyPage() {
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
            <Certification />
          </div>
        </div>
      </main>
    </div>
  );
}
