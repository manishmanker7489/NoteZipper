import React, { useEffect, useState } from "react";

import MainScreen from "../../components/MainScreen/MainScreen";
import { Badge, Button, Card } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
// import notes from "../../data/notes";
import axios from 'axios';

const MyNotes = () => {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    // fetch data from API or database
    const { data } = await axios.get("/notes");
    setNotes(data);
    console.log(data);
    
  }

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure..")) {
      // delete note logic here
    }
  };

  return (
    <div>
      <MainScreen title={"My Screen"}>
        <Link to={"/createnote"}>
          <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
            Create New Note
          </Button>
        </Link>

        {notes.map((n, index) => (
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
                      <Button href={`/notes/${n._id}`}>Edit</Button>
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
                        Created at - date
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
