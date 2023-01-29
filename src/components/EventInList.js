import dayjs from "dayjs";
import { Link } from "react-router-dom";
import "../pages/pages-css/EventDetails.css"

export default function EventInList(props) {
  const { event } = props;

  return (
    <Link to={`/events/${event._id}`}>
      <div className="events-list-container" key={event._id} >
        <div className="card-events-list">
          <div className="card-events-header">
            <img src={event.image} alt="" />
          </div>
          <div className="card-events-body" style={{backgroundColor: "#282c34"}} >
            <h4 style={{letterSpacing: "4px", color: "#f56457"}}>{dayjs(event.date).format("dddd DD MMM")}</h4>
            <span style={{color: "#f7f9f4"}} >{event.title}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
