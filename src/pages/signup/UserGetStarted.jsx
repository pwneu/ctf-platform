import Preloader from "@/components/common/Preloader"; 
import HeaderAuth from "@/components/layout/headers/HeaderAuth"; 
import AuthImageMove from "@/components/others/AuthImageMove"; 
import AccountHasVerified from "@/pages/signup/AccountHasVerified";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent"; 

const metadata = {
  title: "Account Created || PWNEU",
  description: "Your account has been successfully created! Start exploring our platform and participating in exciting challenges.",
};

export default function UserGetStartedPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />

      <HeaderAuth />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <section className="form-page js-mouse-move-container">
          <AuthImageMove />
          <AccountHasVerified />
        </section>
      </div>
    </div>
  );
}
