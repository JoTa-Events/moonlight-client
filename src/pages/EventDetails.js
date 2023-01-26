import axios from 'axios';
import { useState, useEffect } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { useParams, useNavigate, Link } from 'react-router-dom';

import ChatBox from '../components/ChatBox';

export default function EventDetails(props) {

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
            props.editCallback()
          })
          .catch((error) => console.log('Error deleting these details', error));
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
          <h2> Number of participants: {event.participants}</h2>
          <button>Join event</button>
          <p>{event.country}</p>
          <p>{event.city}</p>
          <p>{event.date}</p>
          <p>{event.description}</p>
          <Link to={`/events/edit/${event._id}`}> Edit</Link>
          <button onClick={deleteEvent}>Delete</button>
        </div>
        
        
        <ChatBox eventId={eventId}/>
        
        
       
      </>
    );
  }
  