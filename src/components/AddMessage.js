import axios from "axios"
import { useContext, useState } from "react"
import { AuthContext } from "../context/auth.context"
const API_URL=process.env.REACT_APP_API_URL
export default function AddMessage(props){

    const {eventId, getChatFromAPI} = props
    const {user}  = useContext(AuthContext)
    const [message, setMessage] = useState("")

    const handleSubmit=(e)=>{
        e.preventDefault()
        const newMessage = {
            message
           
        }
        axios.put(`${API_URL}/api/chats/${eventId}`,newMessage)
            .then(response=>{
                console.log(`new message created`,response.data.messages.slice(-1)[0].message)
                getChatFromAPI()
            })
    }
    return(
        <div className="form-message-container">
            <form onSubmit={handleSubmit}>
                <textarea
                    type="text"
                    name="message"
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}
                />
                <button>Add message</button>
            </form>

        </div>
    )

}