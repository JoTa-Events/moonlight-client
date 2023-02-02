import dayjs from "dayjs";
import { useState } from "react";
import FutureEvents from "../components/FutureEvents";
import PastEvents from "../components/PastEvents";
import EventsListWeek from "../components/EventsThisWeek";
import SearchBar from "../components/SearchBar";
import "./pages-css/AllEvents.css";

export default function AllEventsList(props) {

  const today = dayjs().startOf("day");
  const nextWeek = dayjs().add(7, "day");
  const { eventsList } = props;
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div className="all-events-container">
      <SearchBar className="search-bar"
        eventKey={"title"}
        setIsSearching={setIsSearching}
        eventsList={eventsList}
      />

      {!isSearching && (
        <>
          <h2>Events of the Week</h2>
          <EventsListWeek  eventsList={eventsList} />

          <h2>Future Events</h2>
          <FutureEvents fromDate={nextWeek} eventsList={eventsList} />

          <h2>Past Events</h2>
          <PastEvents fromDate={today} eventsList={eventsList} />
        </>
      )}
    </div>
  );
}
