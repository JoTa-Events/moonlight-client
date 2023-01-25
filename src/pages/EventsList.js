import axios from 'axios';
import { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function EventsList() {

  const [eventsList, setEventsList] = useState([]);

  const getAllEvents = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/events`)
      .then((response) => setEventsList(response.data))
      .catch((error) => console.log("Error getting events from API", error));
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  // creating a new event
  const createEvent = (newEventObject) => {
    setEventsList((prevEvents) => {
      const newEventList = [newEventObject, ...prevEvents];
      return newEventList;
    })
  }

  return (
    <Container>

    {eventsList.map((event) => (
        <Card
          key={event._id}
          style={{ width: "30%", padding: "15px", border: "solid 1px" }}
        >
          <Card.Img
            src={event.image}
            alt=""
            style={{ margin: "auto", width: "auto", height: "250px" }}
          />
          <Card.Body>
          <Link to={`/events/${event._id}`}>
              <h2>{event.title}</h2>
            </Link>
          </Card.Body>
        </Card>
    ))}
    
    </Container>
  );
}
