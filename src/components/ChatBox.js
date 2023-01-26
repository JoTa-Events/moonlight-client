/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useEffect, useState } from "react"
import authForAPI from "../utils/authForAPI"
import AddMessage from "./AddMessage"
const API_URL = process.env.REACT_APP_API_URL

export default function ChatBox(props){
    
    const {eventId} = props

    const [chatObj,setChatObj]=useState(null)

    
    const getChatFromAPI = () => {
        
    
        
      axios
        .get(`${API_URL}/api/chats/${eventId}`,authForAPI())
        .then((response) => {
        //   console.log("Chat from API", response.data);
          setChatObj(response.data);
        })
        .catch((error) => {
          console.log("something happened getting the chat from API", error);
        });
    };
    useEffect(()=>{
        getChatFromAPI()
    },[])

   const renderChat = ()=>{
    return(<>
        
        {chatObj.messages.map(message=>(
            <div key= {message._id} className="chat-container">
                <p>
                    <b>{message.author}:</b> {message.message}
                </p>
            </div>
        ))}
    </>)
   } 
    return(
        <div className="Chat-container">
            <div className="all-messages-container">

                {!chatObj ? "loading...." : renderChat() }
            </div>


            <AddMessage eventId={eventId}  getChatFromAPI={getChatFromAPI} />
        </div>
        )
}