import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const history = useNavigate();
  const noteData = JSON.parse(localStorage.getItem("noteData"));

  useEffect(() => {
    if (!userInfo) {
      history("/");
    }
    if (noteData) {
      setTitle(noteData.title);
      setCategory(noteData.category);
      setContent(noteData.content);
    }
  }, []);

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title || !content || !category) {
      alert("Please Fill All the field");
      return;
    }

    try {
      setloading(true);
      const response = await axios.post(
        "notes/createNotes",
        { title, content, category },
        config
      );

      if (response.status === 200) {
        const data = response.data;
        alert("data save successfully");
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
      history("/mynotes");
      resetHandler();
    }
  };

  const updateNote = async () => {
    if (!title || !content || !category) {
      alert("Please Fill All the field");
      return;
    }
    try {
      setloading(true);
      const response = await axios.put(
        `notes/${noteData.id}`,
        { title, content, category },
        config
      );

      if (response.status === 200) {
        const data = response.data;
        alert("data updated successfully");
        seterror(false);
      } else {
        seterror("Unexpected response status: " + response.status);
      }
    } catch (err) {
      console.error("update notes error:", err);
      const errorMessage =
        err.response?.data?.message ||
        "Failed to update notes. Please try again.";
      seterror(errorMessage);
    } finally {
      setloading(false);
      localStorage.removeItem("noteData");
      history("/mynotes");
    }
  };

  return (
    <MainScreen title={`${noteData ? "Update Note" : "Create a new Note"} `}>
      <Card>
        <Card.Header>{`${
          noteData ? "Update Note" : "Create a new Note"
        } `}</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <div style={{ marginTop: "10px" }}>
              {noteData ? (
                <Button onClick={() => updateNote()} variant="primary">
                  Update Note
                </Button>
              ) : (
                <Button type="submit" variant="primary">
                  Create Note
                </Button>
              )}

              <Button className="mx-2" onClick={resetHandler} variant="danger">
                Reset Feilds
              </Button>
            </div>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateNote;
