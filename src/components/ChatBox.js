import axios from "axios";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../context/auth.context";
import authForAPI from "../utils/authForAPI";
import AddMessage from "./AddMessage";
import "./components-css/ChatBox.css"


const API_URL = process.env.REACT_APP_API_URL;
let socket;
export default function ChatBox(props) {
  const { eventId } = props;
  const [chatObj, setChatObj] = useState(null);
  const { user } = useContext(AuthContext)



  /**************socket io****************/

  const [currentMessage, setCurrentMessage] = useState("")
  const [messageList,setMessageList]=useState([])

  //connects when the component is load
  useEffect(()=>{

    // connect to the server
    socket =io.connect(API_URL)
    
    // joins to a room chat with name eventId
    socket.emit("joinChat",(eventId))
  },[])
  
  // useEffect(()=>{
  
  //   socket.on("clientListens",(data)=>{
  //     console.log("receiving a msg from the server",data)
  //     setMessageList((prev)=>{
  //       return([...prev,data])
  //      })
  //   })
  // },[socket])

  const sendMessage = async (e) => {
    e.preventDefault()
    if(currentMessage !== ""){

      const messageData={
        eventId,
        author:user.username,
        message:currentMessage,
        date: dayjs().format("YYYY-MM-DD")
      }
      //send the message to the server
      await socket.emit("serverListens",(messageData))

      console.log("currentMessage",messageData)

      //store the message sent, in a state to display it in the chat
       setMessageList((prev)=>{
        return([...prev,messageData])
       })
    }
  }
  /*************************************/
  
  const getChatFromAPI = () => {

    if(!user) return

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
            {messageList.map((message,index) => (
              <p className="message" key={index}>
                <b>{message.author}:</b> {message.message}
                </p>
            ))}
          </div>
        <div className="chatbox-footer">
            <AddMessage setMessageList={setMessageList} currentMessage={currentMessage} setCurrentMessage={setCurrentMessage} sendMessage={sendMessage} socket={socket} eventId={eventId} getChatFromAPI={getChatFromAPI} />
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
