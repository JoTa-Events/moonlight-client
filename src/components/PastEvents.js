import dayjs from "dayjs";
import EventInList from "./EventInList";

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
    <div className="events-container">
      {pastEvents?.map((event) => (
        <div className="event-inweek past-events" key={event._id}>
          <EventInList event={event} />
        </div>
      ))}
    </div>
  );
}
