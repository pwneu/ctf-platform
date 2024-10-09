import { Table } from "react-bootstrap";

export default function UsersList({ users, showEmail, onUserClick }) {
  return (
    <Table striped bordered hover className="mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Email Confirmed</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {users === undefined ? (
          <tr>
            <td colSpan={6} className="text-center">
              Click the search button to view users.
            </td>
          </tr>
        ) : users.length > 0 ? (
          users.map((user) => (
            <tr
              key={user.id}
              onClick={() => onUserClick(user.id)}
              style={{ cursor: "pointer" }}
            >
              <td>{user.id}</td>
              <td>{user.userName}</td>
              <td>{user.fullName}</td>
              <td>{showEmail ? user.email : "••••••••••"}</td>
              <td>{user.emailConfirmed ? "Yes" : "No"}</td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} className="text-center">
              No users found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
