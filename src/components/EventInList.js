import dayjs from "dayjs";
import { Link } from "react-router-dom";

import "./components-css/Card.css";

export default function EventInList(props) {
  const { event } = props;

  return (
    <Link to={`/events/${event._id}`}>
      <div className="container" key={event._id}>
        <div className="card">
          <div className="card-header">
            <img src={event.image} alt="" />
          </div>
          <div className="card-body">
            <h3>{dayjs(event.date).format("dddd DD MMM")}</h3>
            <span>{event.title}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
