import { useState } from "react";

export default function PrivacyPolicyTabs() {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <>
      <section className="layout-pt-lg layout-pb-lg bg-dark-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row justify-center text-center">
              <div className="col-auto mt-90">
                <div>
                  <h1 className="page-header__title mt-90 text-white">Privacy Policy </h1>
                </div>

                <div>
                  <p className="page-header__text text-white mt-15">
                    New Era University is committed to protecting your privacy.
                    This Privacy Policy outlines how we collect, use, and <br />
                    protect your personal information in connection with the CTF
                    platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="row justify-center mt-90">
  <div className="col-xl-8 col-lg-9 col-md-11">
    <div className="tabs -active-purple-2 js-tabs">
      <div className="tabs__controls d-flex js-tabs-controls flex-wrap">
        <button
          onClick={() => setActiveTab(1)}
          className={`tabs__button js-tabs-button ${
            activeTab == 1 ? "is-active" : ""
          } `}
          data-tab-target=".-tab-item-1"
          type="button"
        >
          Information We Collect
        </button>
        <button
          onClick={() => setActiveTab(2)}
          className={`tabs__button js-tabs-button ml-30 ${
            activeTab == 2 ? "is-active" : ""
          } `}
          data-tab-target=".-tab-item-2"
          type="button"
        >
          Data Security
        </button>
        <button
          onClick={() => setActiveTab(3)}
          className={`tabs__button js-tabs-button ml-30 ${
            activeTab == 3 ? "is-active" : ""
          } `}
          data-tab-target=".-tab-item-3"
          type="button"
        >
          Retention of Information
        </button>
        <button
          onClick={() => setActiveTab(4)}
          className={`tabs__button js-tabs-button ml-30 ${
            activeTab == 4 ? "is-active" : ""
          } `}
          data-tab-target=".-tab-item-4"
          type="button"
        >
          Your Rights
        </button>
        <button
          onClick={() => setActiveTab(5)}
          className={`tabs__button js-tabs-button ml-30 ${
            activeTab == 5 ? "is-active" : ""
          } `}
          data-tab-target=".-tab-item-5"
          type="button"
        >
          Third-Party Links
        </button>
        <button
          onClick={() => setActiveTab(6)}
          className={`tabs__button js-tabs-button ml-30 ${
            activeTab == 6 ? "is-active" : ""
          } `}
          data-tab-target=".-tab-item-6"
          type="button"
        >
          Changes to this Privacy Policy
        </button>
      </div>

      <div className="tabs__content pt-60 lg:pt-40 js-tabs-content">
        <div
          className={`tabs__pane -tab-item-1 ${
            activeTab == 1 ? "is-active" : ""
          } `}
        >
          <p className="text-light-1">
            <strong>1.1. Personal Information</strong>
            <br />
            We may collect personal information such as:
            <br />
            - Full name
            <br />
            - University email address
            <br />
            - Student ID
            <br />
            - Username and password
            <br />
            - Participation data (e.g., scores, challenges attempted)
            <br />
            <br />
            <strong>1.2. Automatically Collected Information</strong>
            <br />
            We may automatically collect technical information when you
            use the platform, including:
            <br />
            - IP address
            <br />
            - Browser type
            <br />
            - Device information
            <br />
            - Time and date of access
            <br />
            <br />
            <strong>1.3. Cookies</strong>
            <br />
            Our platform may use cookies to enhance your experience, keep
            track of your login session, and analyze how you use the
            platform. You may disable cookies through your browser
            settings, but this may affect platform functionality. <br />
            <br />
            <p className="text-light-1">
              <strong>How We Share Your Information</strong>
              <br /> We use your information to:
              <br />
              - Provide and maintain access to the platform.
              <br />
              - Track your progress and participation in the CTF
              challenges.
              <br />
              - Communicate important updates, notifications, and results
              related to the CTF event.
              <br />- Improve platform performance and user experience
              through analytics.
            </p>
          </p>
        </div>
        <div
          className={`tabs__pane -tab-item-2 ${
            activeTab == 2 ? "is-active" : ""
          } `}
        >
          <p className="text-light-1">
            We use your information to:
            <br />
            - Provide and maintain access to the platform.
            <br />
            - Track your progress and participation in the CTF challenges.
            <br />
            - Communicate important updates, notifications, and results
            related to the CTF event.
            <br />- Improve platform performance and user experience
            through analytics.
          </p>
        </div>
        <div
          className={`tabs__pane -tab-item-3 ${
            activeTab == 3 ? "is-active" : ""
          } `}
        >
          <p className="text-light-1">
            We take appropriate technical and organizational measures to
            protect your personal information from unauthorized access,
            alteration, disclosure, or destruction. However, no method of
            transmission over the Internet is completely secure, and we
            cannot guarantee absolute security.
          </p>
        </div>
        <div
          className={`tabs__pane -tab-item-4 ${
            activeTab == 4 ? "is-active" : ""
          } `}
        >
          <p className="text-light-1">
            We will not share, sell, or disclose your personal information
            to third parties, except:
            <br />
            - Access: You can request to know what personal information we
            hold about you.
            <br />
            - Correction: You can request correction of inaccurate or
            incomplete information.
            <br />
            - Deletion: You can request deletion of your personal
            information, subject to our data retention policy.
            <br />
          </p>
        </div>
        <div
          className={`tabs__pane -tab-item-5 ${
            activeTab == 5 ? "is-active" : ""
          } `}
        >
          <p className="text-light-1">
            The CTF platform may contain links to third-party websites or
            resources. We are not responsible for the privacy practices or
            content of these external sites. Please review their privacy
            policies separately. <br />
          </p>
        </div>
        <div
          className={`tabs__pane -tab-item-6 ${
            activeTab == 6 ? "is-active" : ""
          } `}
        >
          <p className="text-light-1">
            We reserve the right to modify this Privacy Policy at any
            time. Changes will be effective immediately upon posting to
            the platform. We encourage you to review this policy
            periodically to stay informed of any updates. <br />
            <br />
          </p>
        </div>
      </div>
    </div>
  </div>
</section>


      <div
          className="flex justify-center items-center mt-30 mx-auto"
          style={{
            minHeight: "50vh",
            marginTop: "200px",
          }}
        ></div>
      <section className="page-header -type-2"></section>
    </>
  );
}
