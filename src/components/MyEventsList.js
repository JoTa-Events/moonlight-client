import dayjs from "dayjs";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { IconTrash, IconEdit, IconDots } from "@tabler/icons-react";

import "../pages/pages-css/Profile.css"
import "./components-css/Card.css";
import getStringUntilComa from "../utils/getStringUntilComa";

export default function MyEventsList(props) {
  const { deleteCallback, eventsList } = props;
  const { user } = useContext(AuthContext);

  const myEventsList = eventsList?.filter((eventDetail) => {
    return eventDetail.author._id === user?._id;
  });

  const renderMyEvents = () => {
    return (
      <div className="my-events">
        <div className="container">
          {myEventsList.map((event) => (
            <div key={event._id} className="card">
              <div className="card-header">
                <img src={event.image} alt="" />
              </div>
              <div className="card-body">
                <h3>{event.title}</h3>
                <h5>{dayjs(event.date).format("ddd DD MMM YYYY")}</h5>
                <h4 className="city">{getStringUntilComa(event.location.city)}</h4>

                {event.author?.username === user?.username && (
                  <div className="edit">
                    <Link to={`/events/${event._id}`}>
                      <IconDots style={{ strokeWidth: "1.5", width: "23" }} />
                    </Link>

                    <Link to={`/events/edit/${event._id}`}>
                      <IconEdit style={{ strokeWidth: "1.5", width: "23" }} />
                    </Link>

                    <Link
                      to="/my-profile"
                      onClick={() => deleteCallback(event._id)}
                    >
                      <IconTrash style={{ strokeWidth: "1.5", width: "23" }} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return <>{!myEventsList 
    ? <div class="loader">Loading...</div>
    : renderMyEvents()}</>;
}
