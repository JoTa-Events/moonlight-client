
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CreateEvent from '../components/CreateEvent';

export default function EventsList({ eventsList }) {
  return (
    <Container>

    {eventsList.map((event) => (
        <Card
          key={event._id}
          style={{ width: "30%", padding: "15px", border: "solid 1px" }}
        >
          <Card.Img
            src={event.image}
            alt=""
            style={{ margin: "auto", width: "auto", height: "250px" }}
          />
          <Card.Body>
            <Link to={"/events/" + event._id}>
              <h2 style={{ marginBottom: "20px" }}>{event.title}</h2>
            </Link>
          </Card.Body>
        </Card>
    ))}
    
    </Container>
  );
}
