import dayjs from "dayjs";
import EventInList from "./EventInList";
import "./components-css/FutureEvents.css";

export default function FutureEvents(props) {
  const { eventsList,fromDate } = props;
  

  const afterOneWeekEvents = eventsList?.filter((event) => {
    const eventDate = dayjs(event.date);

    return eventDate.isAfter(fromDate);
  });

  afterOneWeekEvents?.sort((a, b) => {
    let dateA = dayjs(a.date);
    let dateB = dayjs(b.date);
    return dateA.diff(dateB, "day");
  });

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
