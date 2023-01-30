import { useEffect, useState } from "react"
import io from "socket.io-client"
import BasicChatChild from "./BasicChatChild"



let socket;

export default function BasicChat(){
 
    useEffect(()=>{
       socket = io.connect("http://localhost:5005")
    },[])
        

    const [username,setUsername] = useState("")
    const [room,setRoom] = useState("")
    const [showChat,setShowChat] = useState(false)
    
    const joinRoom =()=>{
        if(username !== "" && room !== ""){
            socket.emit("joinChat",(room))
            setShowChat(true)
        }
    }
    console.log("room",room);
    
    
    return (
      <>
        <button onClick={()=>{socket.disconnect()}}>disconnect</button>
        {!showChat ? (
          <>
            {" "}
            <h3>join chat</h3>
            <input
              type="text"
              placeholder="join..."
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Room ID..."
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
            <button onClick={joinRoom}>Join a Room</button>
          </>
        ) : (
          <BasicChatChild username={username} socket={socket} room={room} />
        )}
      </>
    );

}