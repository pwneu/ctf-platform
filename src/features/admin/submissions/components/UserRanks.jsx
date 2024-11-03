import { ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function UserRanks({ userRanks, requesterRank, isManager }) {
  const renderUserRankItem = (rank, isRequester) => {
    const userLink = `/admin/user/${rank.id}`;

    const listItem = (
      <ListGroup.Item
        className={`d-flex justify-content-between align-items-center ${
          isRequester ? "bg-warning" : ""
        }`}
      >
        <div className="d-flex align-items-center">
          <span className="me-2">{rank.position}.</span>
          <span>{rank.userName}</span>
        </div>
        <span>{rank.points} pts</span>
      </ListGroup.Item>
    );

    return (
      <OverlayTrigger
        key={rank.id}
        placement="right"
        overlay={
          <Tooltip id={`tooltip-${rank.id}`}>
            Latest correct submission:{" "}
            {new Date(rank.latestCorrectSubmission).toLocaleString()}
          </Tooltip>
        }
      >
        {isManager ? (
          <Link to={userLink} className="text-decoration-none">
            {listItem}
          </Link>
        ) : (
          listItem
        )}
      </OverlayTrigger>
    );
  };

  // Check if requesterRank is in userRanks
  const isRequesterInUserRanks =
    requesterRank && userRanks.some((rank) => rank.id === requesterRank.id);

  return (
    <>
      <ListGroup>
        {userRanks.map((rank) =>
          renderUserRankItem(
            rank,
            isRequesterInUserRanks && rank.id === requesterRank.id
          )
        )}
      </ListGroup>

      {requesterRank && !isRequesterInUserRanks && (
        <ListGroup className="mt-4">
          {renderUserRankItem(requesterRank, true)}
        </ListGroup>
      )}
    </>
  );
}
