import { useState } from "react";

export default function ResentSolves() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div id="overview" className="pt-60 lg:pt-40 to-over">
      <h4 className="text-18 fw-500">Resent Solvers</h4>

      <div
        className={`show-more  mt-30 js-show-more ${
          showMore ? "is-active" : ""
        } `}
      >
        <div
          className="show-more__content "
          style={showMore ? { maxHeight: "370px" } : {}}
        >
          <p className="">
            This CTF challenge is designed to test your skills in cybersecurity
            and problem-solving. Starting with initial reconnaissance,
            participants must uncover hidden clues and unravel layers of
            cryptographic puzzles. The challenge progresses step by step,
            leading to more complex tasks involving binary exploitation, web
            application vulnerabilities, and reverse engineering.
            <br />
            <br />
            First, identify the differences between red herrings and actionable
            leads. Analyze the given scenario and use your expertise to craft
            low-level exploits or decipher intricate ciphers. Success will
            demand creativity, precision, and a deep understanding of security
            concepts.
          </p>
        </div>

        <button
          onClick={() => setShowMore((pre) => !pre)}
          className="show-more__button text-purple-1 fw-500 underline mt-30"
        >
          Show more
        </button>
      </div>
    </div>
  );
}
