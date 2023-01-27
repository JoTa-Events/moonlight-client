import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import FutureEvents from '../components/FutureEvents';
import EventsThisWeek from '../components/EventsThisWeek';
import PastEvents from '../components/PastEvents';

export default function AllEventsList(props) {
  const{eventsList}=props
  const nextWeek =dayjs().add(7,"day")


  return (
    <>
      <h2>What's popping?</h2>
      <hr/>
      <h2>Events of next 7 days</h2>{}
     <EventsThisWeek eventsList={eventsList} />
     <hr/>
     <h2>Events after {dayjs(nextWeek).format("ddd DD MMM")}</h2>
     <FutureEvents eventsList={eventsList}/>      
     <hr/>
     <h2>Past Events {dayjs(nextWeek).format("ddd DD MMM")}</h2>
     <PastEvents eventsList={eventsList}/>  
         
    
    
    </>
  );
}
