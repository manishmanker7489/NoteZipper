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
              title="Manish Manker"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item> My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  localStorage.removeItem("userInfo");
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
