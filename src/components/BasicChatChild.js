import dayjs from "dayjs"
import { useEffect, useState } from "react"
import io from "socket.io-client"



const socket = io.connect("http://localhost:5005")

export default function BasicChatChild(props){

    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList,setMessageList]=useState([])

    const{socket,room, username} = props

    const sendMessage = async () => {
        if(currentMessage !== ""){
            const messageData ={
                room:room,
                author:username,
                message:currentMessage,
                time: dayjs()
            }

            await socket.emit("sendMessage",(messageData))
            setMessageList((prev)=>{
                return ([...prev,messageData])
            })
        }
    }

        useEffect(()=>{
            socket.on("receiveMessage",(data)=>{
                setMessageList((prev)=>{
                    return ([...prev,data])
                })
               console.log(data) 
            })
        },[socket])



    return(
        <><div>
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                {messageList.map((messObj,index)=>(
                    <div key={index}>
                    <h1>{messObj.message}</h1>
                    <span>{messObj.author}</span>

                    </div>


                    
                ))}
            </div>
            <div className="chat-footer">
                <input onKeyUp={(e)=>e.key==="Enter" && sendMessage()} onChange={(e)=>{setCurrentMessage(e.target.value)}} type="text" placeholder="send message"/>
                <button onClick={sendMessage}>send</button>
            </div>
        </div>
           
        </>
    )

}