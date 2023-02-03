import dayjs from "dayjs";
import EventInList from "./EventInList";
import "./components-css/Card.css"

export default function PastEvents(props) {
  const { eventsList, fromDate } = props;

  const pastEvents = eventsList?.filter((event) => {
    const eventDate = dayjs(event.date);

    return eventDate.isBefore(fromDate);
  });

  pastEvents?.sort((a, b) => {
    let dateA = dayjs(a.date);
    let dateB = dayjs(b.date);
    return dateB.diff(dateA, "day");
  });

  return (
    <>
      <h2>Past Events</h2>
      <div className="container-scroll">
        {pastEvents?.map((event) => (
          <div className="past-events" key={event._id}>
            <EventInList event={event} />
          </div>
        ))}
      </div>
    </>
  );
}
