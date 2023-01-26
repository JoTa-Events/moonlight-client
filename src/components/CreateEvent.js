import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

export default function CreateEvent(props) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEventDetails = { title, date, country, city, description };

    axios
        .post(`${process.env.REACT_APP_API_URL}/api/events`, newEventDetails)
        .then((response) => {
            navigate("/events");

            setTitle("");
            setDate("");
            setCountry("");
            setCity("")
            setDescription("");
            props.createCallback(newEventDetails);
        })
        .catch((error) => console.log(error));
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

          <Form.Label>Country</Form.Label>
          <Form.Select
            name="country"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />

          <Form.Label>City</Form.Label>
          <Form.Select name="city">
            <option value={city} onChange={(e) => {setCity(e.target.value); }}>City</option>
          </Form.Select>

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

