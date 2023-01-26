import { Link } from 'react-router-dom';

export default function EventsList({eventsList}) {

  return (
    <>
      <h2>What's popping?</h2>

      {eventsList.map((event) => (
        <div className="card" key={event._id}>
          <div className="card-content">
            <img src={event.image} alt="" style={{ width: "300px" }} />
            <Link to={`/events/${event._id}`}>
              <h2 className="title">{event.title}</h2>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
