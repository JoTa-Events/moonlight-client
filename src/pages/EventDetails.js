import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import JoinEvent from '../components/JoinEvent';
import { AuthContext } from '../context/auth.context';
import authForAPI from '../utils/authForAPI';

export default function EventDetails(props) {

    const navigate = useNavigate();
    const [event, setEvent] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [toggle, setToggle] = useState(true);
    const {eventId} = useParams();
    
    const {user} = useContext(AuthContext)

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

      // get participants
      const getParticipants = () => {
        const requestBody = { userId:user._id };
        
        axios
        .put(`${process.env.REACT_APP_API_URL}/api/events/${eventId}/participants`, requestBody, authForAPI())
        .then((response) => {
            setParticipants(response.data);
          })
        .catch((error) => console.log("Error getting event", error));
      }

    // deleting the event
    const deleteEvent = () => {
        axios
          .delete(`${process.env.REACT_APP_API_URL}/api/events/${eventId}`,authForAPI())
          .then(() => {
            navigate(`/events`)
            props.editCallback()
          })
          .catch((error) => console.log('Error deleting these details', error));
    };

    // join event toggle button
    const toggleEventChat = () => {
      setToggle(!toggle)
    };

    return (
      <div style={{display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <div className='event-details-container' style={{width: "50%"}} >
          <img
            src={event.image}
            alt=""
            style={{ margin: "auto", width: "auto", height: "350px" }}
          />

          <h1>{event.title}</h1>

          <p>Location: {event.country} / {event.city}</p>
          <p>Date: {event.date}</p>
          <p>{event.description}</p>
          <Link to={`/events/edit/${event._id}`}>Edit</Link>
          <button onClick={deleteEvent}>Delete</button>
        </div>
        
       
        
        <div style={{width: "50%", textAlign: "start"}}>

        <button onClick={getParticipants}> Join Event</button>
          <button onClick={toggleEventChat}>{toggle ? 'Show Chat' : "Hide Chat" }</button>
          {toggle && <JoinEvent />}
        </div>
        
        
       
      </div>
    );
  }
  