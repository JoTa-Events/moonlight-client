
import { Card } from 'react-bootstrap';

export default function EventsList({eventsList}) {

  return (
    <>
      {eventsList.map((event) => (
        <Card key={event._id} style={{ padding: "15px", border: "solid 1px" }}>
          <Card.Body>
            <h2>{event.title}</h2>
            <h5>{event.location}</h5>
            <p>{event.description}</p>
          </Card.Body>
        </Card>
      ))}
    </>

  );
}
