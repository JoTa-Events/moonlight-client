import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import "./components-css/Nav.css";
import {
  IconHome,
  IconHomePlus,
  IconCirclePlus,
  IconUserPlus,
  IconUserCircle,
  IconLogout,
  IconLogin,
} from "@tabler/icons-react";

export default function Nav() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="wrapper">
      <nav>
        <div className="navbar-left">
          <NavLink to="/">Moonlight</NavLink>
          <NavLink to="/events">Events</NavLink>
        </div>

        <div className="navbar-right">
          <ul>
            {isLoggedIn && (
              <>
                <input type="checkbox" />
                <div className="sec-center">
                  <input
                    className="dropdown"
                    type="checkbox"
                    id="dropdown"
                    name="dropdown"
                  />
                  {/* dropdown */}
                  <label className="for-dropdown" htmlFor="dropdown">
                    <IconHome
                      style={{ marginRight: "10px", strokeWidth: "1" }}
                    />
                    {user.username}
                  </label>
                  <div className="section-dropdown">
                    <input
                      className="dropdown-sub"
                      type="checkbox"
                      id="dropdown-sub"
                      name="dropdown-sub"
                    />
                    {/* profile link */}
                    <NavLink to="/my-profile">
                      <IconUserCircle style={{ strokeWidth: "1" }} />
                      Profile
                    </NavLink>
                    {/* create event link */}
                    <NavLink to="/events/create">
                      <IconCirclePlus style={{ strokeWidth: "1" }} />
                      Submit event
                    </NavLink>
                    {/* Logout */}
                    <NavLink to="/" onClick={logOutUser}>
                      <IconLogout style={{ strokeWidth: "1" }} />
                      Logout
                    </NavLink>
                  </div>
                </div>
              </>
            )}

            {!isLoggedIn && (
              <>
                <input type="checkbox" />
                <div className="sec-center">
                  <input
                    className="dropdown"
                    type="checkbox"
                    id="dropdown"
                    name="dropdown"
                  />
                  {/* dropdown */}
                  <label className="for-dropdown" htmlFor="dropdown">
                    <IconHomePlus
                      style={{ marginRight: "10px", strokeWidth: "1" }}
                    />
                    Register
                  </label>
                  <div className="section-dropdown">
                    {/* signup */}
                    <NavLink to="/signup">
                      <IconUserPlus style={{ strokeWidth: "1" }} />
                      Signup
                    </NavLink>
                    {/* login */}
                    <NavLink to="/login">
                      <IconLogin style={{ strokeWidth: "1" }} />
                      Login
                    </NavLink>
                  </div>
                </div>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
