import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen/MainScreen";
import "./profile.css";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setpic] = useState();

  const [update, setupdate] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const history = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      history("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setpic(userInfo.pic);
    }
  }, [update]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password did not Match !!");
      return;
    } else {
      setloading(true);
      seterror(null);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      try {
        const response = await axios.post(
          "/user/update",
          { name, email, password },
          config
        );
        const data = response.data;
          localStorage.removeItem("userInfo");
          alert("data updated ..")
        localStorage.setItem("userInfo", JSON.stringify(data));
        setloading(false);
        history("/mynotes");
      } catch (error) {
        seterror(error.response.data.message);
      }
    }
  };

  const updateFormPermition = () => {
    setupdate(true);
  };

  return (
    <MainScreen title="EDIT PROFILE">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  disabled={!update}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  disabled={!update}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {update ? (
                <>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    style={{ marginTop: "10px" }}
                    type="submit"
                    varient="primary"
                  >
                    Update
                  </Button>
                </>
              ) : (
                <Button
                  style={{ marginTop: "10px" }}
                  variant="primary"
                  onClick={() => updateFormPermition()}
                >
                  Update Profile
                </Button>
              )}
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default Profile;
