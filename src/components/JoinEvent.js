import ChatBox from '../components/ChatBox';
import { useParams } from 'react-router-dom';

export default function JoinEvent(props) {

    const {eventId} = useParams();

    return (
      <div className='chat-container' style={{ marginTop: "50px" }}>
       
       <h1>chat it out</h1>
        <ChatBox eventId={eventId} /> 
      </div>
    );
  }
  