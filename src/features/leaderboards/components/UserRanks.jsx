import { Link } from "react-router-dom";

export default function UserRanks({ userRanks, requesterRank, isManager }) {
  const renderUserRankItem = (rank, isRequester) => {
    const userLink = `/admin/user?userId=${rank.id}`;
    const style = isRequester ? { backgroundColor: "yellow" } : {};

    return (
      <tr key={rank.id} style={style}>
        <td>
          {isManager ? (
            <Link to={userLink}>{rank.userName}</Link>
          ) : (
            rank.userName
          )}
        </td>
        <td>{rank.position}</td>
        <td>{new Date(rank.latestCorrectSubmission).toLocaleString()}</td>
      </tr>
    );
  };

  // Check if requesterRank is in userRanks
  const isRequesterInUserRanks =
    requesterRank && userRanks.some((rank) => rank.id === requesterRank.id);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Rank</th>
              <th>Latest Correct Submission</th>
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
                  <td colSpan={1} style={{ height: "20px" }}></td>{" "}
                </tr>
                {renderUserRankItem(requesterRank, true)}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
