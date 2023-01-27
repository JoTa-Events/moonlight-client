import { Link } from 'react-router-dom';
import EventsListWeek from '../components/EventsListWeek';

export default function EventsList(props) {
  const{eventsList}=props
  
  return (
    <>
      <h2>What's popping?</h2>
     <EventsListWeek eventsList={eventsList} />
           
    </>
  );
}
