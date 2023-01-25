import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function EventDetails({eventsList}) {

    const navigate = useNavigate();

    const {eventId} = useParams();

    const event = eventsList.find(EventDetails => {
        return EventDetails._id === eventId
    })

    // deleting the event
    const deleteEvent = () => {
        axios
          .delete(`${process.env.REACT_APP_API_URL}/api/events/${eventId}`)
          .then(() => {
            navigate("/events");
          })
          .catch((err) => console.log(err));
    };  

    return (
      <>
        <img
          src={event.image}
          alt=""
          style={{ margin: "auto", width: "auto", height: "350px" }}
        />

        <h1>{event.title}</h1>
        <p>{event.location}</p>
        <p>{event.date}</p>
        <p>{event.description}</p>
        <Link href={'/events/' + event.eventId}> Edit</Link>
        <button onClick={deleteEvent}>Delete</button>
      </>
    );
  }
  