import axios from "axios"
import { useEffect, useState } from "react"
const API_URL = process.env.REACT_APP_API_URL

export default function ChatBox(props){
    
    const {eventId} = props

    const [chatObj,setChatObj]=useState(null)


    useEffect(()=>{
        axios.get(`${API_URL}/api/chats/${eventId}`)
            .then(response=>{
                console.log("Chat from API",response.data)
                setChatObj(response.data)
            })
            .catch(error=>{
                console.log("something happened getting the chat from API",error);
            })
    },[])

   const renderChat = ()=>{
    return(<>
        {chatObj.messages.map(message=>(
            <div key= {message._id} className="chat-container">
                <h4>{message.message}</h4>    
                

            </div>
        ))}
    </>)
   } 
    return(
        <div className="Chat-container">
            {!chatObj ? "loading...." : renderChat() }



        </div>
        )
}