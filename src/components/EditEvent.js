import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form } from "react-bootstrap";
import authForAPI from "../utils/authForAPI";

// import arrays for countries and capital cities
import cityArr from "../data/capitalCity"
import countryArr from "../data/countries"

export default function EditEvent() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [description, setDescription] = useState("");
  
    const { eventId } = useParams();
  
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/events/${eventId}`)
      .then((response) => {
        const event = response.data;

        setTitle(event.title);
        setDate(event.date);
        setCountry(event.country);
        setCity(event.city);
        setDescription(event.description);
      })
      .catch((error) => console.log(error));
    
  }, [eventId]);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, date, country, city, description };

    axios
      .put(`${process.env.REACT_APP_API_URL}/api/events/${eventId}`, requestBody, authForAPI() )
      .then((response) => {
        navigate(`/events/${eventId}`)
      });
  };
  
  return (
    <div className="EditEvent">
      <h3>Edit this Event</h3>

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
          <Form.Select name="country" value={country} onChange={(e) => {setCountry(e.target.value); }}>
            <option value="">Select one</option>
            {countryArr.map(country => 
              <option value={country}>{country}</option>
            )}
          </Form.Select>

          <Form.Label>City</Form.Label>
          <Form.Select name="city" value={city} onChange={(e) => {setCity(e.target.value); }}>
            <option value="">Select one</option>
            {cityArr.map(city =>
              <option value={city}>{city}</option>
            )}
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

            <Button type="submit">Update</Button>
        </Form>

    </div>
  );
}