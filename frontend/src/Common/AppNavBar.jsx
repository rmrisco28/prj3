import { Link, NavLink } from "react-router";
import { Container, Nav, Navbar } from "react-bootstrap";

export function AppNavBar() {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand to="/" as={Link}>
            PRJ3
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/*지금 a태그인데, a태그는 페이지를 전체 로딩 시키기 때문에,*/}
              {/*말고 react Route의 링크를 사용*/}
              {/*<Nav.Link href="/">Home</Nav.Link> 이 코드 대신 아래 코드*/}
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/board/add">
                새글
              </Nav.Link>
              <Nav.Link as={NavLink} to="/signup">
                회원가입
              </Nav.Link>
              <Nav.Link as={NavLink} to="/member/list">
                회원목록
              </Nav.Link>
              <Nav.Link as={NavLink} to="/useradd">
                유저 가입
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
