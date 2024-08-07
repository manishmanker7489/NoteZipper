import React from "react";
import {
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Container,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const history = useNavigate();

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">Note Taker </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-1"
              />
            </Form>
          </Nav>
          <Nav>
            <Nav.Link style={{ color: "#ffff", fontSize: "16px" }}>
              <Link to={"/mynotes"}>My Note's</Link>
            </Nav.Link>

            <NavDropdown
              style={{ color: "#ffff", fontSize: "16px" }}
              title={userInfo ? userInfo.name : "Login/Signup"}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item>
                <Link to={'/profile'} >My Profile</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  localStorage.removeItem("userInfo");
                  localStorage.removeItem("userToken");
                  localStorage.removeItem("noteData");
                  history("/");
                }}
              >
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
