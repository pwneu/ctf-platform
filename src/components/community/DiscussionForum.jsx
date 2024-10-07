import { Link } from "react-router-dom";

export default function DiscussionForum() {
  return (
    <>
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-60 justify-between items-center">
            <div className="col-lg-5">
              <h4 className="text-45 lh-16">
                  Join Our Community
              </h4>
              <p className="text-dark-1 mt-30 text-19">
                Connect with like-minded individuals in our all-in-one community! Stay updated with learner stories, upcoming events, 
                and join our active Discord and forums. PWNEU is your go-to place for everything you need in the world of cybersecurity education.
              </p>
            
              <div className="d-inline-block">
                <Link
                  to="/signup"
                  className="button -md -purple-1 text-white mt-50"
                >
                  Join Now
                </Link>
              </div>
            </div>
            <div className="col-lg-6 pr-50 sm:pr-15">
              <div className="composition -type-8">
               <img
                    className="w-1/1"
                    src="/assets/img/community/Community_Discord.svg"
                    alt="image"
                  />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
