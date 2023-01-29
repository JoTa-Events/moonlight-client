import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

import ChatBox from '../components/ChatBox';
import authForAPI from '../utils/authForAPI';
import dayjs from 'dayjs';
import "./pages-css/EventDetails.css"

export default function EventDetails(props) {

  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const {eventId} = useParams();
  
  const [event, setEvent] = useState([]);
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
        getEvent();
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
  
  // chat toggle button
  const toggleEventChat = () => {
    setToggle(!toggle)
  };

  const renderChat=()=>{
    return <ChatBox  eventId={eventId} /> 
  }

  return (
    <>
      <div className='event-details-container' style={{display: "flex", marginTop: "50px" }}>
        <div className='event-details'>
          <img src={event.image} alt="" style={{ margin: "auto", width: "auto", height: "350px" }} />
          <h1>{event.title}</h1>

          <p><b>Location:</b> {event.country} / {event.city}</p>
          <p><b>Date:</b> {dayjs(event.date).format("ddd DD MMM YYYY")}</p>
          <p><b>Description: </b>{event.description}</p>
          <p><b>By:</b> {event.author?.username}</p>

          {/* only creator of the event can use the functionality edit/delete */}
          {event.author?.username === user?.username && 
              <div className='edit-delete'>
                <Link to={`/events/edit/${event._id}`}>Edit</Link>
                <button onClick={deleteEvent}>Delete</button>
              </div>
          }

        </div>
        <div className='ChatBox'>
          <h1>Attending (<b style={{color: "#f56457"}}>{event.participants?.length}</b>)</h1>


          {user 
            ? event.participants?.includes(user._id) 
              ?(<button onClick={toggleEventChat}>{toggle
                  ? 'Hide Chat' : "Show Chat"}</button>) 
                    : <button onClick={getParticipants}>Join Event</button> 
                      : ""}
          
            {toggle && renderChat()}

        </div>

      </div>
    </>
  );
}
  