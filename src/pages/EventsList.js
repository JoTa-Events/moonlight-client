import { Link } from 'react-router-dom';

export default function EventsList({eventsList}) {

  return (
    <>
      <h2>What's popping?</h2>

      {eventsList.map((event) => (
        <div className="card" key={event._id} style={{display: "inline-block", margin: "10px", border: "1px solid"}} >
          <div className="card-content">
            <img src={event.image} alt="" style={{ width: "300px", margin: "10px"}} />
            <Link to={`/events/${event._id}`}>
              <span className="title" style={{margin: "10px", color: "#282c34", fontSize: "25px"}} >{event.title}</span>
            </Link>
          </div>
        </div>
      ))}
      
    </>
  );
}
