import dayjs from "dayjs";
import EventsThisWeek from "../components/EventsThisWeek"
import FutureEvents from "../components/FutureEvents";


export default function Homepage(props) {

  const { eventsList } = props;
  const nextWeek = dayjs().add(7, "day");

  return (
    <div className="Homepage">
      <h1>Homepage</h1>
      <hr/>
      <h2>What's popping?</h2>

      <h2>Events of next 7 days</h2>      
      <EventsThisWeek eventsList={eventsList} />
      <hr />
      <h2>Events after {dayjs(nextWeek).format("ddd DD MMM")}</h2>
      <FutureEvents  fromDate={nextWeek} eventsList={eventsList} />
    </div>
  );
}
