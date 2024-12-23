import { useNavigate } from "react-router-dom";
import "./leaderboards.css";

export default function UserRanks({
  userRanks,
  requesterRank,
  isManager,
  totalLeaderboardCount,
}) {
  const navigate = useNavigate();

  const renderUserRankItem = (rank, isRequester) => {
    const userLink = `/admin/user/${rank.id}`;
    const className = isRequester ? "rank-item requester" : "rank-item";

    const handleRowClick = () => {
      if (isRequester) {
        navigate("/profile");
      } else if (isManager) {
        navigate(userLink);
      }
    };

    return (
      <div
        key={rank.id}
        // TODO -- make leaderboards.css class inline (kahit yung .container class lang baka kasi nagcaclash sa styling)
        className={`${className} hoverable-row`}
        onClick={handleRowClick}
      >
        <div className="rank-column center">{rank.position}</div>
        <div className="rank-column center hoverable">
          {rank.userName}
          <div className="tooltip">
            {`${rank.userName} latest solve time: ${new Date(
              rank.latestSolve
            ).toLocaleString()}`}
          </div>
        </div>
        <div className="rank-column center">{rank.points}</div>
      </div>
    );
  };

  // Check if requesterRank is in userRanks
  const isRequesterInUserRanks =
    requesterRank && userRanks.some((rank) => rank.id === requesterRank.id);

  return (
    <div
      className="user-ranks-container"
      data-aos="fade-up"
      data-aos-offset="80"
      data-aos-duration={900}
    >
      <p className="text-black rank-column center  text-sm">
        {`There are currently (${totalLeaderboardCount}) participant(s).`}
      </p>
      <div className="leaderboard-wrapper text-black">
        <div className="leaderboard-header text-white">
          <div className="rank-column center">Rank</div>
          <div className="rank-column center">Username</div>
          <div className="rank-column center">Points</div>
        </div>
        <div>
          {userRanks.map((rank) =>
            renderUserRankItem(
              rank,
              isRequesterInUserRanks && rank.id === requesterRank.id
            )
          )}
          {requesterRank && !isRequesterInUserRanks && (
            <>
              <div className="spacer"></div>
              {renderUserRankItem(requesterRank, true)}
            </>
          )}
        </div>
        <div className="mt-90"></div>
        <div className="mt-90"></div>
        <div className="mt-90"></div>
        <div className="mt-90"></div>
      </div>
    </div>
  );
}
