import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./pages-css/Register.css";

export default function SignupPage() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      email,
      password,
    };

    axios
      .post(`${API_URL}/auth/signup`, newUser)
      .then((response) => {
        console.log("A new user created");

        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response
          ? error.response.data.message
          : "Error when signing up";

        setErrorMessage(errorDescription);
        console.log("Error when creating a new user", error);
      });
  };

  return (
    <div className="card-wrap">
      <div className="card-wrapper">
        <div className="card-main">
          <div className="center-wrap">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignupSubmit}>
              <input
                className="form-style"
                placeholder="Your Username"
                id="username"
                type="text"
                name="username"
                value={username}
                onChange={handleUsername}
              />

              <input
                className="form-style"
                placeholder="Your Email"
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
              />

              <input
                className="form-style"
                placeholder="Your Password"
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
              />

              <button className="btn" type="submit">
                Sign Up
              </button>
            </form>

            <Link style={{ color: "#f7f9f4", lineHeight: "2.5", display: "inline-block"}} to={"/login"}>
              Already have an account?
            </Link>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
