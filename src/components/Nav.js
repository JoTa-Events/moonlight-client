// import logo from '../logo.svg'
import { useContext } from "react";
import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function Nav() {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <Navbar>
      <div className="custom-navbar">
        <div className="logo">
          {/* <img src={logo} width="50px" /> */}
        </div>
        <div className="navbar-links">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/events">Events</NavLink>
            </li>
            <ul>
              {isLoggedIn && (
                <>
                  <li>
                    <NavLink to="/events/create">create</NavLink>
                  </li>
                  <li>
                    <button onClick={logOutUser}>Logout</button>
                  </li>
                </>
              )}
            </ul>
            <ul>
              {!isLoggedIn && (
                <>
                  <li>
                    <NavLink to="/signup">Signup</NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </>
              )}
            </ul>
          </ul>
        </div>
      </div>
    </Navbar>
  );
}