import dayjs from "dayjs"
import { Link } from "react-router-dom"

export default function EventInList(props){
    
    const {event}=props

    return <Link to={`/events/${event._id}`}>
        <div
              className="card"
              key={event._id}
              style={{
                display: "inline-block",
                margin: "10px",
                border: "1px solid",
              }}
            >
              <div className="card-content">
                <img
                  src={event.image}
                  alt=""
                  style={{ width: "300px", margin: "10px" }}
                />
                <span
                  className="title"
                  style={{ margin: "8px", color: "#282c34", fontSize: "15px" }}
                >
                  {dayjs(event.date).format("dddd DD MMM") }
                </span>
                
                  <span
                    className="title"
                    style={{
                      margin: "10px",
                      color: "#282c34",
                      fontSize: "25px",
                    }}
                  >
                    {event.title}
                  </span>
                
                <span
                  className="title"
                  style={{ margin: "10px", color: "#282c34", fontSize: "15px" }}
                >
                  {event.author?.username}
                </span>
              </div>
            </div>
            </Link>
}