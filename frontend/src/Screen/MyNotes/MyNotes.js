import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import { Badge, Button, Card } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);
  const history = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (userInfo) {
      localStorage.removeItem("noteData");
      fetchNotes();
    } else {
      history("/");
    }
  }, []);

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userInfo?.token}`,
    },
  };
  const fetchNotes = async () => {
    setloading(true);
    try {
      const response = await axios.get("notes/allNotes", config);

      if (response.status === 200) {
        const data = response.data;
        setNotes(data);
        seterror(false);
      } else {
        seterror("Unexpected response status: " + response.status);
      }
    } catch (err) {
      console.error("Fetch notes error:", err);
      const errorMessage =
        err.response?.data?.message ||
        "Failed to fetch notes. Please try again.";
      seterror(errorMessage);
    } finally {
      setloading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure..")) {
      // delete note logic here
      try {
        const response = await axios.delete(`notes/${id}`, config);

        if (response.status === 200) {
          const data = response.data;
          alert("data deleted successfully");
          seterror(false);
          setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
        } else {
          seterror("Unexpected response status: " + response.status);
        }
      } catch (err) {
        console.error("Delete notes error:", err);
        const errorMessage =
          err.response?.data?.message ||
          "Failed to Delete notes. Please try again.";
        seterror(errorMessage);
      } finally {
        setloading(false);
      }
    }
  };

  const editNote = async (n) => {
    // edit note logic here
    const noteData = {
      id: n._id,
      title: n.title,
      content: n.content,
      category: n.category,
    };
    localStorage.setItem("noteData", JSON.stringify(noteData));
    history("/createnote");
  };

  return (
    <div>
      <MainScreen title={`Welcome Back ${userInfo?.name}`}>
        <Link to={"/createnote"}>
          <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
            Create New Note
          </Button>
        </Link>
        {error && <ErrorMessage variant="">{error}</ErrorMessage>}
        {loading && <Loading />}

        {notes?.map((n, index) => (
          <Accordion key={n._id || index}>
            <Card style={{ margin: 10 }}>
              <Accordion.Item eventKey={String(index)}>
                <Accordion.Header style={{ border: "none" }}>
                  <Card.Header
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      width: "151vh",
                      border: "none",
                    }}
                  >
                    <span
                      style={{
                        color: "black",
                        textDecoration: "none",
                        fontSize: 18,
                      }}
                    >
                      {n.title}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "10px",
                      }}
                    >
                      <Button onClick={() => editNote(n)}>Edit</Button>
                      <Button
                        variant="danger"
                        onClick={() => deleteHandler(n._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Header>
                </Accordion.Header>
                <Accordion.Body>
                  <Card.Body>
                    <h4>
                      <Badge bg="success">Category - {n.category}</Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <p>{n.content}</p>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {n.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Body>
              </Accordion.Item>
            </Card>
          </Accordion>
        ))}
      </MainScreen>
    </div>
  );
};

export default MyNotes;
