import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default  function SignupPage(){

  const API_URL = process.env.REACT_APP_API_URL

  const [username,setUsername]=useState("")
  const [email,setEmail]= useState("")
  const [password,setPassword]= useState("")
  const navigate=useNavigate()

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleSignupSubmit = (e) => {
    e.preventDefault()
    const newUser={
      username,email,password
    }

    axios
      .post(`${API_URL}/auth/signup`, newUser)
      .then((response) => {
        console.log("A new user created");

        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response ? error.response.data.message:"Error when signing up"

        setErrorMessage(errorDescription);
        console.log("Error when creating a new user", error);
      });    
    };

  return (
    <div className="Signup-page">

      <form onSubmit={handleSignupSubmit}>
        <label htmlFor="email">Email:</label>
        <input 
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />
 
        <label htmlFor="password">Password:</label>
        <input 
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
 
        <label htmlFor="username">Username:</label>
        <input 
          id="username"
          type="text"
          name="username"
          value={username}
          onChange={handleUsername}
        />
 
        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}>Login</Link>

    </div>
  )
}