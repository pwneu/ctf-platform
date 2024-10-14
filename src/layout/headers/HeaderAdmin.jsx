import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { api } from "@/api";
import { toast } from "react-toastify";

export default function HeaderAdmin() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/identity/logout");
      setAuth(null);
      navigate("/");
      toast.success("Logged out successfully");
    } catch {
      toast.error("Error logging out");
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">PWNEU</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/admin/keys">Access Keys</Nav.Link>
            <Nav.Link href="/admin/categories">Categories</Nav.Link>
            <Nav.Link href="/admin/challenges">Challenges</Nav.Link>{" "}
            <Nav.Link href="/admin/users">Users</Nav.Link>
            <Nav.Link href="/admin/configurations">Configurations</Nav.Link>
            <Nav.Link href="/admin/leaderboards">Leaderboards</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {auth?.userName ? (
              <>
                <Nav.Item>
                  <Nav.Link href="/admin">{auth.userName}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
