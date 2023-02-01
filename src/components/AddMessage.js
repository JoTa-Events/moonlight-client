import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import authForAPI from "../utils/authForAPI";
import "./components-css/ChatBox.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function AddMessage(props) {
  const {
    eventId,
    socket,
    sendMessage,
    setCurrentMessage,
    currentMessage,
    setMessageList,
  } = props;
  const { user } = useContext(AuthContext);

  //************socket.io********************* */
  
  useEffect(() => {
    // listens to the server
    socket.on("clientListens", (data) => {
      setMessageList((prev) => {
        return [...prev, data];
      });
    });
  }, [socket]);

  //********************************* */

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      message: currentMessage,
      userId: user._id,
    };

    axios
      .put(`${API_URL}/api/chats/${eventId}`, newMessage, authForAPI())
      .then((response) => {})
      .catch((error) => {
        console.log(
          "there has being an error saving the message in the DB",
          error
        );
      });

    setCurrentMessage("");
  };

  return (
    <>
      <form
        className="form-chat"
        onSubmit={(e) => {
          handleSubmit(e);
          sendMessage(e);
        }}
      >
        <input
          required
          type="text"
          placeholder="Type here..."
          name="currentMessage"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button className="red-btn">Send</button>
      </form>
    </>
  );
}
