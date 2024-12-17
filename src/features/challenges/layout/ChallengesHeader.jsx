
export default function ChallengesHeader() {
    return (
 <section className="leaderboard-section">
        <div className="container">
          <div className="leaderbordrow">
          <div className=" leaderbordrow y-gap-30 justify-between items-center col-lg-4">
              <img
                className="leaderboardlogo mx-auto image-section-leaderboard"
                src="assets/img/community/neu-logo.png"
                alt="NEU Logo"
              />
            </div>
            <div className=" col-xl-7 col-lg-5 col-md-9">
            
              <h3 className="text-30 lh-15">CTF Challenges</h3>
              <p className="description ">
                    Explore a diverse range of cybersecurity challenges designed
                    to test your skills and knowledge across various domains.
                    Whether you’re a beginner looking to get started or an
                    experienced professional seeking to sharpen your expertise,
                    our challenges cater to all levels and interests. Filter by
                    difficulty or category to find the perfect challenge for you,
                    or browse through events to see the latest and past
                    competitions.
              </p>
              
            </div>
            
          </div>
        </div>
      </section>
    );
  }