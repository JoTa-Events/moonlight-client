import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


export default function  LoginPage(props){
    const API_URL = process.env.REACT_APP_API_URL

    const [username, setUsername]=useState("")
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    
   

    const navigate = useNavigate()

    const {storeToken,authenticateUser}=useContext(AuthContext)

    const handleUsername = (e)=> setUsername(e.target.value)
    const handlePassword = (e)=> setPassword(e.target.value)



    const handleLoginSubmit = (e)=>{
        e.preventDefault()
        const userToLogin = {username,password}

        axios.post(`${API_URL}/auth/login`,userToLogin)
            .then(response=>{

                storeToken(response.data.authToken)
                authenticateUser()

                console.log(`${username} logged in`)
                
                navigate("/")
            })
            .catch(error=>{
                console.log(`something happened with the login`,error)

                //error.response.data.message
                const errorDescription=error.response.data.message
                setErrorMessage(errorDescription)
            })

    }

    return (
        <div className="LoginPage">
          <h1>Login</h1>
     
          <form onSubmit={handleLoginSubmit}>
            <label htmlFor="username">Username:</label>
            <input 
            id="username"
              type="text"
              name="username"
              value={username}
              placeholder="your Username"
              onChange={handleUsername}
            />
     
            <label htmlFor="password">Password:</label>
            <input id="password"
        
              type="password"
              name="password"
              placeholder="**********"
              value={password}
              autoComplete="on"
              onChange={handlePassword}
            />
     
            <button type="submit">Login</button>
          </form>
          { errorMessage && <p className="error-message">{errorMessage}</p> }
     
          <p>Don't have an account yet?</p>
          <Link to={"/signup"}> Sign Up</Link>
        </div>
      )
    }
     
  