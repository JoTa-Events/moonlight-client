import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ChatBox from '../components/ChatBox';

export default function EventDetails() {

    const navigate = useNavigate();
    const [event, setEvent] = useState([]);
    const {eventId} = useParams();

    const getEvent = () => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/events/${eventId}`)
          .then((response) => {
              setEvent(response.data);
            })
          .catch((error) => console.log("Error getting event", error));
      };

      useEffect(()=> {
        getEvent();
      }, [] );

    // deleting the event
    const deleteEvent = () => {
        axios
          .delete(`${process.env.REACT_APP_API_URL}/api/events/${eventId}`)
          .then(() => {
            navigate(`/events`)
          })
          .catch((err) => console.log(err));
    };  

    return (
      <>
        <div className='event-details-container'>
          <img
            src={event.image}
            alt=""
            style={{ margin: "auto", width: "auto", height: "350px" }}
          />

          <h1>{event.title}</h1>
          <p>{event.location}</p>
          <p>{event.date}</p>
          <p>{event.description}</p>
          <Link to={`/events/edit/${event._id}`}> Edit</Link>
          <button onClick={deleteEvent}>Delete</button>
        </div>
        
        <ChatBox eventId={eventId}/>
       
        
       
      </>
    );
  }
  