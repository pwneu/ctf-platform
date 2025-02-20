import { Row, Col, Form, Button } from "react-bootstrap";

export default function UsersQueryInput({
  searchTermInput,
  setSearchTermInput,
  pageInput,
  setPageInput,
  pageSizeInput,
  setPageSizeInput,
  sortByInput,
  setSortByInput,
  sortOrderInput,
  setSortOrderInput,
  excludeVerifiedInput,
  setExcludeVerifiedInput,
  excludeVisibleOnLeaderboardsInput,
  setExcludeVisibleOnLeaderboardsInput,
  handleSearch,
  isBusy,
}) {
  const selectAll = (e) => {
    e.target.select();
  };

  return (
    <Form>
      <Row>
        <Col md={3}>
          <Form.Group controlId="formSearchTerm">
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter search term"
              value={searchTermInput}
              onChange={(e) => setSearchTermInput(e.target.value)}
              onFocus={selectAll}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="formExcludeVerified">
            <Form.Check
              type="checkbox"
              label="Exclude Visible on Leaderboards"
              checked={excludeVisibleOnLeaderboardsInput}
              onChange={(e) =>
                setExcludeVisibleOnLeaderboardsInput(e.target.checked)
              }
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="formExcludeVerified">
            <Form.Check
              type="checkbox"
              label="Exclude Verified Users"
              checked={excludeVerifiedInput}
              onChange={(e) => setExcludeVerifiedInput(e.target.checked)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="formSortColumn">
            <Form.Label>Sort By</Form.Label>
            <Form.Select
              value={sortByInput}
              onChange={(e) => setSortByInput(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="username">Username</option>
              <option value="fullname">Full Name</option>
              <option value="email">Email</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={3}>
          <Form.Group controlId="formSortOrder">
            <Form.Label>Sort Order</Form.Label>
            <Form.Select
              value={sortOrderInput}
              onChange={(e) => setSortOrderInput(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="formPage">
            <Form.Label>Page</Form.Label>
            <Form.Control
              type="number"
              value={pageInput}
              onChange={(e) =>
                setPageInput(
                  e.target.value ? Math.max(1, Number(e.target.value)) : ""
                )
              }
              placeholder="1"
              min={1}
              onFocus={selectAll}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="formPageSize">
            <Form.Label>Page Size</Form.Label>
            <Form.Control
              type="number"
              value={pageSizeInput}
              onChange={(e) =>
                setPageSizeInput(
                  e.target.value ? Math.max(1, Number(e.target.value)) : ""
                )
              }
              placeholder="10"
              min={1}
              onFocus={selectAll}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Button
            variant="primary"
            onClick={handleSearch}
            className="mt-4 w-100"
            disabled={isBusy}
          >
            {isBusy ? "Searching..." : "Search"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
