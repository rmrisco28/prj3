import { Link, NavLink, useNavigate, useSearchParams } from "react-router";
import {
  Button,
  Container,
  FormControl,
  InputGroup,
  Nav,
  Navbar,
  Form,
} from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "./AuthenticationContextProvider.jsx";

export function AppNavBar() {
  const { user, isAdmin } = useContext(AuthenticationContext);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setKeyword(q);
    } else {
      setKeyword("");
    }
  }, [searchParams]);

  function handleSearchFormSubmit(e) {
    e.preventDefault();
    // console.log("조회 폼 서브밋");
    navigate("/?q=" + keyword);
  }

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand to="/" as={Link}>
            프로젝트
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              {/*지금 a태그인데, a태그는 페이지를 전체 로딩 시키기 때문에,*/}
              {/*말고 react Route의 링크를 사용*/}
              {/*<Nav.Link href="/">Home</Nav.Link> 이 코드 대신 아래 코드*/}
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              {user !== null && (
                <Nav.Link as={NavLink} to="/board/add">
                  새글
                </Nav.Link>
              )}
            </Nav>
            <Nav className="order-lg-3">
              {user === null && (
                <Nav.Link as={NavLink} to="/signup">
                  회원가입
                </Nav.Link>
              )}
              {isAdmin() && (
                <Nav.Link as={NavLink} to="/member/list">
                  회원목록
                </Nav.Link>
              )}
              {user === null && (
                <Nav.Link as={NavLink} to="/login">
                  로그인
                </Nav.Link>
              )}
              {user !== null && (
                <Nav.Link as={NavLink} to="/logout">
                  로그아웃
                </Nav.Link>
              )}
              {user !== null && (
                <Nav.Link as={NavLink} to={`/member?email=${user.email}`}>
                  {user.nickName}
                </Nav.Link>
              )}
            </Nav>
            <Form
              inline="true"
              onSubmit={handleSearchFormSubmit}
              className="order-lg-2 mx-lg-auto "
            >
              <InputGroup>
                <FormControl
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                ></FormControl>
                <Button type="submit">검색</Button>
              </InputGroup>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
