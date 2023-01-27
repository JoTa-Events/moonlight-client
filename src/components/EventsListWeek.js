import dayjs from "dayjs"
import { Link } from "react-router-dom"
import "./EventsListWeek.css"

export default function EventsListWeek(props){
    const {eventsList}=props
    const today = dayjs()
    const nextWeek =dayjs().add(7,"day")
   
    const thisWeekEvents=eventsList?.filter(event=>{
        const eventDate = dayjs(event.date)
        
        
        return ((eventDate.isAfter(today) && eventDate.isBefore(nextWeek)))
            
        
    })
    console.log(eventsList)
    thisWeekEvents?.sort((a,b)=>{
        let dateA = dayjs(a.date)
        let dateB = dayjs(b.date)
        return dateA.diff(dateB,"day")
    })

    
    return (
      <div className="week-events-container">
        {thisWeekEvents?.map((event) => (
          <div className="event-inweek" key={event._id}>
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
                  {dayjs(event.date).format("ddd DD MMM") }
                </span>
                <Link to={`/events/${event._id}`}>
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
                </Link>
                <span
                  className="title"
                  style={{ margin: "10px", color: "#282c34", fontSize: "15px" }}
                >
                  {event.author?.username}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );

}