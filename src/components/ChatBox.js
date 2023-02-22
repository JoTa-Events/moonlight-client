import axios from "axios";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { io } from "socket.io-client";
import { AuthContext } from "../context/auth.context";
import ScrollToBottom from "react-scroll-to-bottom";
import authForAPI from "../utils/authForAPI";
import capitalize from "../utils/capitalize";
import AddMessage from "./AddMessage";

import "./components-css/ChatBox.css";
import AreYouSure from "./AreYouSure";

const API_URL = process.env.REACT_APP_API_URL;
let socket;

export default function ChatBox(props) {
  const { eventId, setReRender, getAllEvents } = props;
  const [chatObj, setChatObj] = useState(null);
  const [displayAreYouSure, setDisplayAreYouSure] = useState(false);

  const { user } = useContext(AuthContext);

  const confirmMessage = "Ready to leave this event and its chat?";

  const navigate = useNavigate();
  const location = useLocation();

  /**************socket io****************/
  const [isConnected, setIsConnected] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  //connects when the component is mounted
  useEffect(() => {
    // connect to the server
    socket = io.connect(API_URL);

    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("joinChat", eventId);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    //clean up
    return () => {
      socket.emit("leaveChat", eventId);
      socket.disconnect();
    };
  }, []);
  console.log("isConnected", isConnected);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage !== "") {
      const messageData = {
        eventId,
        author: user.username,
        message: currentMessage,
        date: dayjs().format("YYYY-MM-DD"),
      };
      //send the message to the server
      await socket.emit("serverListens", messageData);

      console.log("currentMessage", messageData);

      //store the message sent, in a state to display it in the chat
      setMessageList((prev) => {
        return [...prev, messageData];
      });
    }
  };

  /*************************************/

  const getChatFromAPI = () => {
    if (!user) return;
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

  const leaveEvent = () => {
    if (!user) {
      navigate(`/login`);

      return;
    }

    axios
      .delete(`${API_URL}/api/events/${eventId}/participants`, authForAPI())
      .then((response) => {
        console.log(user.username, "Leave the event");
        getAllEvents();
      })
      .catch((error) => {
        console.log("Error leaving the event", error);
      })
      .finally(() => {
        setReRender((prevState) => !prevState);
        navigate(location.pathname);
      });
  };

  const renderChat = () => {
    return (
      <div className="chatbox">
        <div className="chatbox-head">
          <span>
            <b>Live-Chat</b>
          </span>
          <button
            className="leave-event"
            onClick={() => setDisplayAreYouSure(true)}
          >
            Leave Event
          </button>
        </div>

        <ScrollToBottom className="scroll-to-bottom-chat">
          {chatObj.messages.map((message) => {
            let leftOrRight = "";
            if (user.username === message.author.username) {
              leftOrRight = "message-right";
            }
            return (
              <div
                className="message-container"
                id={leftOrRight}
                key={message._id}
              >
                <p className="message-author">
                  <b>{capitalize(message.author?.username)}</b>
                </p>
                <p className="message-text">{message.message}</p>
              </div>
            );
          })}

          {messageList.map((message, index) => {
            let leftOrRight = "";
            if (user.username === message.author) {
              leftOrRight = "message-right";
            }
            return (
              <div className="message-container" id={leftOrRight} key={index}>
                <p className="message-author">
                  <b>{capitalize(message.author)}</b>
                </p>
                <p className="message-text">{message.message}</p>
              </div>
            );
          })}
        </ScrollToBottom>

        <div className="chatbox-footer">
          <AddMessage
            setMessageList={setMessageList}
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
            sendMessage={sendMessage}
            socket={socket}
            eventId={eventId}
            getChatFromAPI={getChatFromAPI}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      {!chatObj ? "" : renderChat()}
      {displayAreYouSure && (
        <AreYouSure
          setDisplayAreYouSure={setDisplayAreYouSure}
          handleYes={leaveEvent}
          confirmMessage={confirmMessage}
        />
      )}
    </div>
  );
}
