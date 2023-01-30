import { useEffect, useState } from "react"
import io from "socket.io-client"



const socket = io.connect("http://localhost:5005")

export default function ChatSocket(){

    const [message,setMessage]=useState("")
    const [messageReceived, setMessageReceived] = useState("")
    const [room,setRoom] = useState("")


    const sendMessage =()=>{

        socket.emit("sendMessage",{message: message,room:room})

    }

    const joinRoom =()=>{
        if(room !==""){
            socket.emit("join-room",room)
        }
    }



    useEffect(()=>{
        socket.on("receiveMessage",(data)=>{
            setMessageReceived(data.message)
        })
    },[socket])


    return(
        <>
            <div>
            <input placeholder="room" onChange={(e)=>{
                setRoom(e.target.value)
            }}/>
            <button onClick={joinRoom}>join</button>
            <hr/>
            <input onChange={(e)=>{setMessage(e.target.value)}}/>
            <button onClick={sendMessage}>send message</button>
            </div>
            <h1> Messages</h1>
            {messageReceived}
        </>
    )

}