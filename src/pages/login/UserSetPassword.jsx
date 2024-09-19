
import Preloader from "@/components/common/Preloader"; 
import HeaderAuth from "@/components/layout/headers/HeaderAuth";
import AuthImageMove from "@/components/others/AuthImageMove";
import SetPassword from "@/pages/login/SetPassword"; 
import React from "react";
import MetaComponent from "@/components/common/MetaComponent"; 

const metadata = {
  title: "Set New Password || PWNEU",
  description: "Create a new password to secure your account and gain access to our platform.",
};

export default function SetPasswordPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />

      <HeaderAuth />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <section className="form-page js-mouse-move-container">
          <AuthImageMove />
          <SetPassword />
        </section>
      </div>
    </div>
  );
}
