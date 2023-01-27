import dayjs from "dayjs"
import EventInList from "./EventInList"
import "./FutureEvents.css"

export default function FutureEvents(props){
    const {eventsList} = props
    const nextWeek =dayjs().add(7,"day")

    const afterOneWeekEvents= eventsList?.filter(event=>{
        
        const eventDate = dayjs(event.date)
        
        
        return ((eventDate.isAfter(nextWeek)))
       
        
    })
    
    afterOneWeekEvents?.sort((a,b)=>{
        let dateA = dayjs(a.date)
        let dateB = dayjs(b.date)
        return dateA.diff(dateB,"day")
    })

    return (
      <div className="future-events-list">
        {afterOneWeekEvents.map((event) => (
          <div className="event-inweek" key={event._id}>
            <EventInList event={event} />
          </div>
        ))}
      </div>
    );
}