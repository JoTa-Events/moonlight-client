import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

export default function CreateEvent(props) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEventDetails = { title, date, location, description };

    axios
        .post(`${process.env.REACT_APP_API_URL}/api/events`, newEventDetails)
        .then((response) => {
            navigate("/events");
        })
        .catch((error) => console.log(error));
    
    props.createCallback(newEventDetails);
    
    // Resetting the states
    setTitle("");
    setDate("");
    setLocation("");
    setDescription("");

  };

  return (
    <div className="CreateEvent">
      <h1>Submit an event</h1>

        <Form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", width: "40%", margin: "auto" }} >
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            required={true}
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />

          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />

          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

            <Button type="submit">Create</Button>
        </Form>

    </div>
  );
}
