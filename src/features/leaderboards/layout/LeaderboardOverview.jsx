export default function LeaderboardOverview() {
    return (
      <section className="leaderboard-section mt-90">
        <div className="container">
          <div className="leaderbordrow">
            <div className=" col-xl-7 col-lg-5 col-md-9">
              <h3 className="text-30 lh-15">PWNEU CTF Leaderboard</h3>
              <p className="description ">
                The CTF (Capture the Flag) Leaderboard displays the rankings of
                participants based on their performance in solving challenges.
                Each participant earns points for completing tasks of varying
                difficulty, with higher points awarded for more complex or unique
                challenges.
              </p>
              <p className="additional-info">
                The leaderboard reflects real-time standings, showcasing the top
                scorers and encouraging a competitive and engaging environment.
              </p>
            </div>
            <div className=" leaderbordrow y-gap-30 justify-between items-center col-lg-4">
              <img
                className="leaderboardlogo mx-auto image-section-leaderboard"
                src="assets/img/community/neu-logo.png"
                alt="NEU Logo"
              />
            </div>
          </div>
        </div>
      </section>
      
    );
  }
  