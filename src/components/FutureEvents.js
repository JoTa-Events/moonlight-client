import dayjs from "dayjs";
import EventInList from "./EventInList";
import "./components-css/Card.css";

export default function FutureEvents(props) {
  const { eventsList, fromDate } = props;

  const futureEvents = eventsList?.filter((event) => {
    const eventDate = dayjs(event.date);

    return eventDate.isAfter(fromDate);
  });

  futureEvents?.sort((a, b) => {
    let dateA = dayjs(a.date);
    let dateB = dayjs(b.date);
    return dateA.diff(dateB, "day");
  });

  return (
    <div className="container-scroll">
      {futureEvents.map((event) => (
        <div key={event._id}>
          <EventInList event={event} />
        </div>
      ))}
    </div>
  );
}
