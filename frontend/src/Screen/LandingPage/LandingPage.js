import React, { useEffect } from "react";
import "./LandingPage.css";
import { Button, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {

    const history = useNavigate();

    const userInfo = localStorage.getItem("userInfo");
    useEffect(() => {
      if (userInfo) {
        history("/mynotes");
      }
    }, [userInfo,history]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Note Taker</h1>
              <p className="subtitle">One Safe place for all your notes.</p>
            </div>
            <div className="buttonContainer">
              <Link to={"/login"}>
                <Button size="lg" className="landingbutton">
                  Log In
                </Button>
              </Link>
              <Link to={"/register"}>
                <Button
                  size="lg"
                  className="landingbutton"
                  variant="outline-primary"
                >
                  Sing Up
                </Button>
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
