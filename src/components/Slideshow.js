import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import getStringUntilComa from "../utils/getStringUntilComa";
import "./components-css/Slideshow.css";

const delay = 3500;

export default function Slideshow(props) {
  const { eventsList, untilDate } = props;
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const today = dayjs().startOf("day");

  const eventsToDisplay = eventsList?.filter((event) => {
    const eventDate = dayjs(event.date);

    return eventDate.isAfter(today) && eventDate.isBefore(untilDate);
  });

  eventsToDisplay?.sort((a, b) => {
    let dateA = dayjs(a.date);
    let dateB = dayjs(b.date);
    return dateA.diff(dateB, "day");
  });

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === eventsToDisplay.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshow-slider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {eventsToDisplay.map((event) => (
          <div className="slide" key={event._id}>
            <Link to={`/events/${event._id}`}>
              <img src={event.image} alt="event" />
              <div className="slide-event-info">
                <h1>{event.title}</h1>
                <p className="city">
                  {getStringUntilComa(event.location.city)}
                </p>
                <p>{dayjs(event.date).format("dddd")}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {eventsToDisplay.map((event, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
