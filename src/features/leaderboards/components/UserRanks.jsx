import { useNavigate } from "react-router-dom";

export default function UserRanks({
  userRanks,
  requesterRank,
  isManager,
  totalLeaderboardCount,
}) {
  const navigate = useNavigate();

  const renderUserRankItem = (rank, isRequester) => {
    const userLink = `/admin/user/${rank.id}`;
    const style = isRequester ? { backgroundColor: "yellow" } : {};

    const handleRowClick = () => {
      if (isRequester) {
        navigate("/profile");
      } else if (isManager) {
        navigate(userLink);
      }
    };

    return (
      <tr
        key={rank.id}
        style={{
          ...style,
          cursor: isRequester || isManager ? "pointer" : "default",
        }}
        onClick={handleRowClick}
      >
        <td style={{ textAlign: "center" }}>{rank.userName}</td>
        <td style={{ textAlign: "center" }}>{rank.position}</td>
        <td style={{ textAlign: "center" }}>{rank.points}</td>
        <td style={{ textAlign: "center" }}>
          {new Date(rank.latestCorrectSubmission).toLocaleString()}
        </td>
      </tr>
    );
  };

  // Check if requesterRank is in userRanks
  const isRequesterInUserRanks =
    requesterRank && userRanks.some((rank) => rank.id === requesterRank.id);

  return (
    <div style={{ minHeight: "500px" }}>
      <p
        style={{ textAlign: "center" }}
      >{`There are currently ${totalLeaderboardCount} participant(s).`}</p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Username</th>
            <th style={{ textAlign: "center" }}>Rank</th>
            <th style={{ textAlign: "center" }}>Points</th>
            <th style={{ textAlign: "center" }}>Latest Correct Submission</th>
          </tr>
        </thead>
        <tbody>
          {userRanks.map((rank) =>
            renderUserRankItem(
              rank,
              isRequesterInUserRanks && rank.id === requesterRank.id
            )
          )}
          {requesterRank && !isRequesterInUserRanks && (
            <>
              <tr>
                <td colSpan={4} style={{ height: "20px" }}></td>
              </tr>
              {renderUserRankItem(requesterRank, true)}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
