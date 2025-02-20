import { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import VerifyUserButton from "./VerifyUserButton";
import GenerateUserStatsButton from "./GenerateUserStatsButton";
import AddCertificateButton from "./AddCertificateButton";
import ResetCertificateButton from "./ResetCertificateButton";
import GeneratePasswordResetLinkButton from "./GeneratePasswordResetLinkButton";
import DeleteUserButton from "./DeleteUserButton";
import DownloadCertificateButton from "./DownloadCertificateButton";
import HideUserOnLeaderboardsButton from "./HideUserOnLeaderboardsButton";
import ShowUserOnLeaderboardsButton from "./ShowUserOnLeaderboardsButton";

export default function UserDetails({
  userDetails,
  userEmail,
  userRank,
  isAdmin,
  cannotBeDeleted,
  getUserDetails,
  getUserRank,
}) {
  const [showEmail, setShowEmail] = useState(false);
  const userIsMember = userDetails?.roles?.includes("Member");
  const userIsAdmin = userDetails?.roles?.includes("Admin");

  return (
    <Card className="mb-4">
      <Card.Header>
        <h2>User Details</h2>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6} className="mb-3">
            <h5>ID</h5>
            <p>{userDetails.id}</p>
          </Col>
          <Col md={6} className="mb-3">
            <h5>Username</h5>
            <p>{userDetails.userName}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <h5>Full Name</h5>
            <p>{userDetails.fullName}</p>
          </Col>
          <Col md={6} className="mb-3">
            <h5>Created At</h5>
            <p>{new Date(userDetails.createdAt).toLocaleString()}</p>
          </Col>
        </Row>
        {userIsMember && (
          <Row>
            <Col md={6} className="mb-3">
              <h5>Position</h5>
              <p>
                {userRank === undefined
                  ? "Loading..."
                  : userRank?.position || "Unranked"}
              </p>
            </Col>
            <Col md={6} className="mb-3">
              <h5>Points</h5>
              <p>
                {userRank === undefined
                  ? "Loading..."
                  : userRank?.points || "0"}
              </p>
            </Col>
          </Row>
        )}
        <Row>
          <Col md={6} className="mb-3">
            <h5>Verification Status</h5>
            <p>{userDetails.emailConfirmed ? "Verified" : "Not Verified"}</p>
          </Col>
          <Col md={6} className="mb-3">
            <h5>Visible On Leaderboards</h5>
            <p>{userDetails.isVisibleOnLeaderboards ? "Yes" : "No"}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <h5>Email</h5>
            <p>{showEmail ? userEmail : "••••••••••"}</p>
            <Button
              variant="secondary"
              onClick={() => setShowEmail((prev) => !prev)}
            >
              <FontAwesomeIcon icon={showEmail ? faEyeSlash : faEye} />{" "}
              {showEmail ? "Hide Email" : "Show Email"}
            </Button>
          </Col>
          <Col md={6} className="mb-3">
            <h5>Roles</h5>
            <p>
              {userDetails?.roles && userDetails.roles.length > 0
                ? userDetails.roles.join(", ")
                : "No roles assigned"}
            </p>
          </Col>
        </Row>
        {!userIsAdmin && (
          <>
            <VerifyUserButton
              userDetailsEmailConfirmed={userDetails.emailConfirmed}
              getUserDetails={getUserDetails}
              userDetailsId={userDetails.id}
            />
            {userIsMember && (
              <>
                <GenerateUserStatsButton userDetailsId={userDetails.id} />
                <AddCertificateButton userDetailsId={userDetails.id} />
                <DownloadCertificateButton userDetailsId={userDetails.id} />
                <ResetCertificateButton userDetailsId={userDetails.id} />
              </>
            )}
            {isAdmin && (
              <>
                <HideUserOnLeaderboardsButton
                  userDetailsId={userDetails.id}
                  getUserDetails={getUserDetails}
                  getUserRank={getUserRank}
                />
                <ShowUserOnLeaderboardsButton
                  userDetailsId={userDetails.id}
                  getUserDetails={getUserDetails}
                  getUserRank={getUserRank}
                />
                <GeneratePasswordResetLinkButton
                  userDetailsId={userDetails.id}
                />
                <DeleteUserButton
                  userDetailsId={userDetails.id}
                  cannotBeDeleted={cannotBeDeleted}
                />
              </>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
}
