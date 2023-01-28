import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import FutureEvents from '../components/FutureEvents';
import EventsThisWeek from '../components/EventsThisWeek';
import PastEvents from '../components/PastEvents';
import SearchBar from '../components/SearchBar';

export default function AllEventsList(props) {
  const{eventsList}=props
  const today = dayjs().startOf("day");
  

  return (
    <>
      <SearchBar eventKey={"title"} eventsList={eventsList}/>
      <hr />
      
      
    
     <FutureEvents fromDate={today} eventsList={eventsList} />
         
     <hr/>
     <h2>Past Events</h2>
     <PastEvents fromDate={today} eventsList={eventsList}/>  
         
    
    
    </>
  );
}
