import dayjs from "dayjs";
import EventInList from "./EventInList";
import "./components-css/Card.css";
import "./components-css/EventsThisWeek.css";
export default function EventsListWeek(props) {
  const { eventsList } = props;
  const today = dayjs().startOf("day");
  const nextWeek = dayjs().add(7, "day");

  const thisWeekEvents = eventsList?.filter((event) => {
    const eventDate = dayjs(event.date);

    return eventDate.isAfter(today) && eventDate.isBefore(nextWeek);
  });

  thisWeekEvents?.sort((a, b) => {
    let dateA = dayjs(a.date);
    let dateB = dayjs(b.date);
    return dateA.diff(dateB, "day");
  });

  return (
    <>
      <h2>Events of the Week</h2>
      <div className="container-scroll">
        {thisWeekEvents?.map((event) => (
          <div key={event._id}>
            <EventInList event={event} />
          </div>
        ))}
      </div>
    </>
  );
}
