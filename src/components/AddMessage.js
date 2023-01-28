import axios from "axios"
import { useContext, useState } from "react"
import { AuthContext } from "../context/auth.context"
import authForAPI from "../utils/authForAPI"
import "./components-css/ChatBox.css"

const API_URL = process.env.REACT_APP_API_URL;

export default function AddMessage(props){

    const {eventId, getChatFromAPI} = props;
    const {user}  = useContext(AuthContext);
    const [message, setMessage] = useState("");
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        const newMessage = {
            message,
            userId: user._id
        }
        
        axios.put(`${API_URL}/api/chats/${eventId}`, newMessage, authForAPI())
            .then(response=>{
                console.log('New message created', response.data.messages.slice(-1)[0].message)
                getChatFromAPI();
            })

        setMessage("");
    }

    return(
        <>
            <form className="form-chat" onSubmit={handleSubmit}>
                <input 
                    required
                    type="text"
                    placeholder="Type here..."
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button>Send</button>
            </form>
        </>
    )
}