import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import ChatBox from "../components/ChatBox";
import authForAPI from "../utils/authForAPI";
import dayjs from "dayjs";
import "./pages-css/EventDetails.css";
import Map from "../components/Map";
import capitalize from "../utils/capitalize";

export default function EventDetails(props) {
  const { user } = useContext(AuthContext);
  const { eventId } = useParams();

  const [event, setEvent] = useState([]);
  const [toggle, setToggle] = useState(true);
  
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
  }, []);

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
    setToggle(!toggle);
  };

  const renderChat = () => {
    return <ChatBox eventId={eventId} />;
  };

  return (
    <>
      <div className="event-details-container">
        <div className="event-details">
          <img
            src={event.image}
            alt=""
            style={{ margin: "auto", width: "auto", height: "350px" }}
          />
          <h1>{event.title}</h1>
          
          <Link
            style={{ margin: "auto", display: "inline-block" }}
            to={`/profile/${event.author?.username}`}
          >
            <b>By:</b> {event.author && capitalize(event.author?.username)}
          </Link>

          <p>
            <b>Location:</b> {event.location?.city}
          </p>
          <p>
            <b>Date:</b> {dayjs(event.date).format("ddd DD MMM YYYY")}
          </p>
          <p>
            <b>Description: </b>
            {event.description}
          </p>
          <br />
          {/* join event button */}
          <h3>
            Attending (
            <b style={{ color: "#f56457" }}>{event.participants?.length}</b>)
          </h3>
          {isUserInEvent || isAnOldEvent ? (
            ""
          ) : (
            <button onClick={getParticipants}>Join Event</button>
          )}

          {/* only creator of the event can use the functionality edit/delete */}
          {event.author?.username === user?.username && (
            <div className="edit-delete">
              <Link to={`/events/edit/${event._id}`}>Edit</Link>
              <Link to="/events" onClick={() => props.deleteCallback(eventId)}>
                Delete
              </Link>
            </div>
          )}
        </div>
        
        <div className="ChatBox">
          {isUserInEvent ? (
            <button onClick={toggleEventChat}>
              {toggle ? "Hide Chat" : "Show Chat"}
            </button>
          ) : (
            ""
          )}

          {toggle && renderChat()}

          <div className="map">
            {event.location && <Map coords={event.location.coordinates} />}
          </div>

        </div>

        
      </div>
    </>
  );
}
