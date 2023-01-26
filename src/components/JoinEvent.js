import ChatBox from '../components/ChatBox';
import { useParams } from 'react-router-dom';

export default function JoinEvent(props) {

    const {eventId} = useParams();

    return (
      <div style={{ marginTop: "50px" }}>
        <button onClick={props.toggleEventChat}> Leave chat</button>
      <h1>chat it out</h1>
        <ChatBox eventId={eventId} /> 
      </div>
    );
  }
  