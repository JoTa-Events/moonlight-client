import ChatBox from '../components/ChatBox';

export default function JoinEvent(props) {

    const {eventId} = props;

    return (
        <div className='chat-container' style={{ marginTop: "50px" }}>
            <h1>chat it out</h1>
            <ChatBox eventId={eventId} /> 
        </div>
    );
  }
  