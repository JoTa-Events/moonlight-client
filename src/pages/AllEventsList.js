import dayjs from "dayjs";
import { useState } from "react";
import FutureEvents from "../components/FutureEvents";
import PastEvents from "../components/PastEvents";
import SearchBar from "../components/SearchBar";
import "./pages-css/EventDetails.css"

export default function AllEventsList(props) {
  const { eventsList } = props;
  const today = dayjs().startOf("day");
  const [ isSearching, setIsSearching ] = useState(false)
  
  return (
    <div className="allEvents">
      <SearchBar
        eventKey={"title"}
        setIsSearching={setIsSearching}
        eventsList={eventsList}
      />
      <hr />

      {!isSearching && (
        <>
          <h2>Future Events</h2>
          <FutureEvents fromDate={today} eventsList={eventsList} />

          <h2>Past Events</h2>
          <PastEvents fromDate={today} eventsList={eventsList} />
        </>
      )}
    </div>
  );
}
