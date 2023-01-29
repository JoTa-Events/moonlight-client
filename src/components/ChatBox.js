import axios from "axios";
import { useEffect, useState } from "react";
import authForAPI from "../utils/authForAPI";
import AddMessage from "./AddMessage";
import "./components-css/ChatBox.css"

const API_URL = process.env.REACT_APP_API_URL;

export default function ChatBox(props) {
  const { eventId } = props;
  const [chatObj, setChatObj] = useState(null);

  const getChatFromAPI = () => {
    axios
      .get(`${API_URL}/api/chats/${eventId}`, authForAPI())
      .then((response) => {
        setChatObj(response.data);
      })
      .catch((error) => {
        console.log("something happened getting the chat from API", error);
      });
  };

  useEffect(() => {
    getChatFromAPI();
  }, []);

  const renderChat = () => {
    return (
      <div className="chatbox">
        <div className="chatbox-head"><span>Chat</span></div>
          <div  className="chat-messages messeges-list">
            {chatObj.messages.map((message) => (
                <p className="message" key={message._id}>
                <b>{message.author?.username}:</b> {message.message}
                </p>
            ))}
          </div>
        <div className="chatbox-footer">
            <AddMessage eventId={eventId} getChatFromAPI={getChatFromAPI} />
        </div>
        
      </div>
    );
  };

  return (
    <div className="Chat-container">
      <div className="all-messages-container">
        {!chatObj ? "" : renderChat()}
      </div>
    </div>
  );
}
