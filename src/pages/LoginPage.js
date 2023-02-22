import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./pages-css/Register.css";

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
    <div className="card-wrap">
      <div className="card-wrapper">
        <div className="card-main">
          <div className="center-wrap">
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <input
                className="form-style"
                autoComplete="off"
                placeholder="Your Username"
                id="username"
                type="text"
                name="username"
                value={username}
                onChange={handleUsername}
              />

              <input
                className="form-style"
                placeholder="Your Password"
                id="password"
                type="password"
                name="password"
                value={password}
                autoComplete="on"
                onChange={handlePassword}
              />

              <button className="btn" type="submit">
                Login
              </button>
            </form>

            <Link
              style={{
                color: "#fafafa",
                lineHeight: "2.5",
                display: "inline-block",
              }}
              to={"/signup"}
            >
              New to Moonlight? Sign up
            </Link>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
