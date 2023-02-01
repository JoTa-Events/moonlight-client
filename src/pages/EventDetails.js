import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import ChatBox from "../components/ChatBox";
import authForAPI from "../utils/authForAPI";
import capitalize from "../utils/capitalize";
import Map from "../components/Map";
import dayjs from "dayjs";
import "./pages-css/EventDetails.css";

import { IconTrash, IconEdit, IconUserPlus } from "@tabler/icons-react";

export default function EventDetails(props) {
  const { user } = useContext(AuthContext);
  const { eventId } = useParams();
  
  const [event, setEvent] = useState([]);
  const [toggle, setToggle] = useState(true);

  const [reRender,setReRender] = useState(false)
  
  const today = dayjs().startOf("day");
  const navigate = useNavigate();

  const isUserInEvent = event.participants?.includes(user?._id);
  const isAnOldEvent =
    dayjs(event.date).format("YYYY-MM-DD") < today.format("YYYY-MM-DD");

  const getEvent = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/events/${eventId}`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.log("Error getting event", error)
        navigate("*")
      });
  };

  useEffect(() => {

    getEvent();
    
    setToggle(false)
  }, [reRender]);

  // get participants
  const getParticipants = () => {
    if (!user) {
      navigate(`/login`);

      return;
    }

    const requestBody = { userId: user._id };

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/events/${eventId}/participants`,
        requestBody,
        authForAPI()
      )
      .then((response) => {
        getEvent();
      })
      .catch((error) => console.log("Error getting event", error))
      .finally(() => {
        setToggle(!toggle);
        props.getAllEvents()
      });
  };

  // chat toggle button
  const toggleEventChat = () => {
    setToggle(prevToggle=>!prevToggle);
  };

  const renderChat = () => {
    return <ChatBox getAllEvents={props.getAllEvents} setReRender={setReRender} eventId={eventId} />;
  };

  return (
    <div className="event-details-container">
      <div className="event-details">
        <img src={event.image} alt="" />

        {/* only creator of the event can use the functionality edit/delete */}
        {event.author?.username === user?.username && (
          <div style={{display: "flex", justifyContent: "end"}}>
            <Link to={`/events/edit/${event._id}`}>
              <IconEdit style={{ strokeWidth: "1.5", width: "23" }} />
            </Link>

            <Link to="/events" onClick={() => props.deleteCallback(eventId)}>
              <IconTrash style={{ strokeWidth: "1.5", width: "23" }} />
            </Link>
          </div>
        )}
        
        <div className="event-details-content">
          <h2>{event.title}</h2>
          <p>
            <b>Location: </b>{event.location?.city}
          </p>
          <p>
            <b>Date: </b>{dayjs(event.date).format("ddd DD MMM YYYY")}
          </p>
          <p>
            <b>Description: </b>{event.description}
          </p>

          <Link to={`/profile/${event.author?.username}`}>
            {event.author && capitalize(event.author?.username)} (AVATAR HERE)
          </Link>
        </div>

        <div className="att-event">
          <div>
            {/* join event button */}
            <h3>Attending</h3>
            <h1 style={{ color: "#f56457" }}>{event.participants?.length}</h1>
          </div>

          {isUserInEvent || isAnOldEvent ? ( "" ) : (
            <button onClick={getParticipants}><IconUserPlus width={23} />
            {""}Join Event
            </button>
          )}
        </div>


      </div>
        
      <div className="ChatBox">
      {isUserInEvent ? (
        <button onClick={toggleEventChat}>
          {toggle ? "Hide Chat" : "Show Chat"}
        </button> ) : ( "" )}

        {toggle && renderChat()}

        <div className="map">
          {event.location && <Map coords={event.location.coordinates} />}
        </div>
      </div>
        
    </div>
  );
}
