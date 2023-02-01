import axios from "axios";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { io } from "socket.io-client";
import { AuthContext } from "../context/auth.context";
import authForAPI from "../utils/authForAPI";
import capitalize from "../utils/capitalize";
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
      
        <div className="chatbox-head"><span>Live-Chat</span></div>
         
           <ScrollToBottom className="scroll-to-bottom-chat" >

            {chatObj.messages.map((message) => {
              let leftOrRight =""
                if(user.username===message.author.username){
                    leftOrRight="message-right"
                }         
              return(
                <div className="message-container" id={leftOrRight} key={message._id}>
                  <p className="message-author"><b>{capitalize(message.author?.username)}</b></p>
                  <p className="message-text">
                  {message.message}
                  </p>
               
              </div>
            )})}
       
            {messageList.map((message,index) => {
              let leftOrRight =""
                if(user.username===message.author){
                    leftOrRight="message-right"
                }         
              return(
                <div className="message-container" id={leftOrRight} key={index}>
                  <p className="message-author"><b>{capitalize(message.author)}</b></p>
                  <p className="message-text">
                  {message.message}
                  </p>
               
              </div>
            )})}
           </ScrollToBottom>
         
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
