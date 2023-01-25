import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form } from "react-bootstrap";

export default function EditEvent(props) {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
  
    const { eventId } = useParams();
  
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/events/${eventId}`)
      .then((response) => {
        const oneProject = response.data;
        setTitle(oneProject.title);
        setDescription(oneProject.description);
      })
      .catch((error) => console.log(error));
    
  }, [eventId]);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEventDetails = { title, date, location, description };

    axios
      .put(`${process.env.REACT_APP_API_URL}/api/projects/${eventId}`, newEventDetails)
      .then((response) => {
        navigate(`/events/${eventId}`)
      });
  };
  
  return (
    <div className="EditEvent">
      <h3>Edit the Project</h3>

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