import React, { useState } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);

  const history = useNavigate();

  const submitHandeler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Password did not Match !!");
    } else {
      setloading(true);
      setMessage(null);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      try {
        const response = await axios.post(
          "/user/registerUser",
          { name, email, password, pic },
          config
        );
        const data = response.data;
        localStorage.setItem("userInfo", JSON.stringify(data));
        setloading(false);
        history("/mynotes");
      } catch (error) {
        seterror(error.response.data.message);
      }
    }
  };

  const postPIC = (pics) => {
    if (!pics) {
      return setPicMessage("Please select an Image !!");
    }
    setPicMessage(null);

    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/jpg" ||
      pics.type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "noteTaker");
      data.append("cloud_name", "dml2y7ewh");
      fetch(
        "CLOUDINARY_URL=cloudinary:157349584494288:3q4biP9MbHVDhfu29zon79SQj3A@dml2y7ewh",
        {
          method: "post",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((error) => {
          console.log(error);
          setPicMessage("Error in Uploading Image !!");
        });
    } else {
      return setPicMessage("Please select an Image in (jpg/png) format !!");
    }
  };

  return (
    <>
      <MainScreen title={"REGISTER"}>
        <div className="loginContainer">
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
          {loading && <Loading />}
          <Form onSubmit={submitHandeler}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmpassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </Form.Group>
            {picMessage && (
              <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
            )}
            {/* <Form.Group controlId="pic" className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" accept=".png,.jpg,.jpeg" onChange={(e)=>postPIC(e.target.value)} />
            </Form.Group> */}

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              Have an Account ? <Link to="/login">Login</Link>
            </Col>
          </Row>
        </div>
      </MainScreen>
    </>
  );
};

export default RegisterScreen;
