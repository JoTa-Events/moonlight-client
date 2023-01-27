import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

import authForAPI from '../utils/authForAPI';
import ChatBox from '../components/ChatBox';

export default function EventDetails(props) {

    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    const {eventId} = useParams();

    const [event, setEvent] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [toggle, setToggle] = useState(true);

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
      const requestBody = { userId: user._id };

      axios
        .put(`${process.env.REACT_APP_API_URL}/api/events/${eventId}/participants`, requestBody, authForAPI())
        .then((response) => {
            setParticipants(response.data);
            getEvent()
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
        <div className='event-details-container' style={{width: "50%", border: "1px solid"}} >
          <img src={event.image} alt="" style={{ margin: "auto", width: "auto", height: "350px" }} />

          <h1>{event.title}</h1>
          <h3>by: {event.author?.username}</h3>
          <p><b>Location:</b> {event.country} / {event.city}</p>
          <p><b>Date:</b> {event.date}</p>
          <p><b>Description: </b>{event.description}</p>

          {/* only creator of the event can use the functionality edit/delete */}
          {event.author?.username === user?.username && 
              <>
                <Link to={`/events/edit/${event._id}`}>Edit</Link>
                <button onClick={deleteEvent}>Delete</button>
              </>
          }

        </div>
        <div style={{width: "50%", textAlign: "start", border: "1px solid"}}>

          <h1>Attending (<b style={{color: "#f56457"}}>{event.participants?.length}</b>)</h1>
          
          <button onClick={getParticipants}>Join Event</button>
          <ChatBox eventId={eventId} />

          {/* <button onClick={toggleEventChat}>{toggle ? 'Hide Chat' : "Show Chat" }</button> 
          {toggle && <JoinEvent eventId={eventId} />} */}

        </div>

      </div>
    );
  }
  