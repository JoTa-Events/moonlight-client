import { useState } from 'react';
import ChatBox from '../components/ChatBox';

export default function JoinEvent(props) {

    const {eventId} = props;

    return (
        <div className='chat-container' style={{ marginTop: "50px" }}>
            
            <ChatBox eventId={eventId} />

        </div>
    );
  }
  