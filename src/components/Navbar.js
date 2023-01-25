import { useContext } from "react";
import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function Nav() {

  const {user,logOutUser}=useContext(AuthContext)
  return (
    <Navbar  bg="dark" style={{ justifyContent: "center", marginTop: "50px" }} >
        <NavLink to="/">Home /</NavLink>
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/logout">logout</NavLink>
        <button onClick={logOutUser}>Logout</button><span>{user && user.username}</span>
    </Navbar>
  );
}