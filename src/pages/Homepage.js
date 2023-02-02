
import EventsThisWeek from "../components/EventsThisWeek"


export default function Homepage(props) {

  const { eventsList } = props;


  return (
    <div className="Homepage">

      <h1>What's on this week</h1>      
      <EventsThisWeek eventsList={eventsList} />
    
    </div>
  );
}
