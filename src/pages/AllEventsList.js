import dayjs from "dayjs";
import FutureEvents from "../components/FutureEvents";
import PastEvents from "../components/PastEvents";
import SearchBar from "../components/SearchBar";

export default function AllEventsList(props) {
  const { eventsList } = props;
  const today = dayjs().startOf("day");

  return (
    <>
      <SearchBar eventKey={"title"} eventsList={eventsList} />
      <hr />

      <hr />
      <h2>Future Events</h2>
      <FutureEvents fromDate={today} eventsList={eventsList} />

      <hr />
      <h2>Past Events</h2>
      <PastEvents fromDate={today} eventsList={eventsList} />
    </>
  );
}
