import { Link } from "react-router-dom";

export default function DiscussionForum() {
  return (
    <>
      <section
        className="py-16 bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('assets/img/community/Community-bg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "136vh",
          minHeight: "90vh",
        }}
      >
        <div className="container mx-auto flex flex-col justify-center items-center h-full ">
          <div className="text-center">
            <img
              src="assets/img/community/DiscordCommunity.png"
              alt="Community Icon"
              style={{
                marginTop: "150px",
                width: "90%",
                maxWidth: "380px",
              }}
            />
          </div>

          <div className="text-white mt-6 px-4 text-center max-w-2xl">
            <h4 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
              Connect with Our Cybersecurity Community
            </h4>
            <p className="mt-4 leading-relaxed content-wrapper js-content-wrapper overflow-hidden">
              Connect with like-minded individuals in our all-in-one community!
              Stay updated with learner stories, upcoming events, and join our
              active Discord and forums. <br></br>PWNEU is your go-to place for
              everything you need in the world of cybersecurity education.
            </p>
          </div>
          <div
            className="flex justify-center items-center mt-30 mx-auto"
            style={{
              width: "300px",
              minHeight: "50vh",
              marginTop: "200px",
            }}
          >
            <Link
              to="/signup"
              className="button -sm -white text-dark-1 font-semibold rounded-lg shadow hover:bg-gray-200 "
            >
              Join Now
            </Link>
          </div>
          <div
            className="flex justify-center items-center mt-90 "
            style={{
              minHeight: "50vh",
              marginTop: "200px",
            }}
          ></div>
        </div>
        <div
          className="flex justify-center items-center mt-30 mx-auto"
          style={{
            minHeight: "50vh",
            marginTop: "200px",
          }}
        ></div>
      </section>
    </>
  );
}
