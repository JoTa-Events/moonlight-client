import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./pages-css/Register.css"

export default function LoginPage(props) {
  const API_URL = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const userToLogin = { username, password };

    axios
      .post(`${API_URL}/auth/login`, userToLogin)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");

        console.log(`${username} logged in`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleLoginSubmit}>
        <h2>Login</h2>

        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          name="username"
          value={username}
          placeholder="Your username"
          onChange={handleUsername}
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="**********"
          value={password}
          autoComplete="on"
          onChange={handlePassword}
        />

        <button type="submit">Login</button>

        <p>Don't have an account yet?</p>
        <Link to={"/signup"}>Sign up</Link>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
