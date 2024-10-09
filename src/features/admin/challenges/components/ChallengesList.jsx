import { Table } from "react-bootstrap";

export default function ChallengesList({ challenges, handleChallengeClick }) {
  return (
    <Table striped bordered hover className="mt-4">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Points</th>
          <th>Deadline</th>
          <th>Solve Count</th>
        </tr>
      </thead>
      <tbody>
        {challenges === undefined ? (
          <tr>
            <td colSpan={5} className="text-center">
              Click the search button to view challenges.
            </td>
          </tr>
        ) : challenges.length > 0 ? (
          challenges.map((challenge) => (
            <tr
              key={challenge.id}
              onClick={() => handleChallengeClick(challenge.id)}
              style={{ cursor: "pointer" }}
            >
              <td>{challenge.name}</td>
              <td>{challenge.description}</td>
              <td>{challenge.points}</td>
              <td>{challenge.deadline}</td>
              <td>{challenge.solveCount}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="text-center">
              No challenges found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
