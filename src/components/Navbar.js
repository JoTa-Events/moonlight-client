import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Nav() {

  return (
    <Navbar  bg="dark" style={{ justifyContent: "center", marginTop: "50px" }} >
        <NavLink to="/">Home /</NavLink>
        <NavLink to="/events">Events</NavLink>
    </Navbar>
  );
}