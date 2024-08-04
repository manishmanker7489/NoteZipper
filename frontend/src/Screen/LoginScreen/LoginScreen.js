import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import "./LoginScreen.css";
import axios from "axios";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const LoginScreen = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);

  const history = useNavigate();

  const userInfo = localStorage.getItem("userInfo");
  useEffect(() => {
    if (userInfo) {
      history("/mynotes");
    }
  }, [userInfo,history]);

  const submithandeler = async (e) => {
    e.preventDefault();
    // console.log(email, password);
    if (!email || !password) {
      alert("enter email or password");
      return;
    }

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      setloading(true);

      const response = await axios.post(
        "/user/login",
        { email, password },
        config
      );
      const data = response.data;
      // console.log("++++++++++++++++++++++++++++++", data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setloading(false);
      seterror(false);
      setemail("");
      setpassword("");
    } catch (error) {
      seterror(error.response.data.message);
      setloading(false);
    }
  };

  return (
    <>
      <MainScreen title={"LOG IN"}>
        <div className="loginContainer">
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading />}
          <Form onSubmit={submithandeler}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="my-4">
              Submit
            </Button>
          </Form>
          <Row>
            <Col>
              New Customer ? <Link to="/register">Register Here</Link>
            </Col>
          </Row>
        </div>
      </MainScreen>
    </>
  );
};

export default LoginScreen;
