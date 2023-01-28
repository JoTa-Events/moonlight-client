import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import FutureEvents from '../components/FutureEvents';
import EventsThisWeek from '../components/EventsThisWeek';
import PastEvents from '../components/PastEvents';
import SearchBar from '../components/SearchBar';

export default function AllEventsList(props) {
  const{eventsList}=props
  const nextWeek =dayjs().add(7,"day")


  return (
    <>
      <SearchBar eventKey={"title"} eventsList={eventsList}/>
      <hr />
      
      
    
     
         
     <hr/>
     <h2>Past Events {dayjs(nextWeek).format("ddd DD MMM")}</h2>
     <PastEvents eventsList={eventsList}/>  
         
    
    
    </>
  );
}
