import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function Nav() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <div className="custom-navbar">
        <div className="navbar-links-logo">
          <ul>
            <li><span>Moonlight</span></li>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/events">Events</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-links">
          <ul>
            {isLoggedIn && (
              <>
                <li>
                  <div className="sec-center navbar-links ">
                    <input className="dropdown" type="checkbox" id="dropdown" name="dropdown" />
                    <label className="for-dropdown" htmlFor="dropdown">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-circle" width={25} height={25} viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                      <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                      <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
                    </svg>
                    
                    {user.username}
                    
                    </label>
                    <div className="section-dropdown">
                      <NavLink to="/events/create">Submit event</NavLink>
                      <button onClick={logOutUser}>Logout</button>
                    </div>
                  </div>
                </li>
              </>
            )}
          </ul>
          <ul>
            {!isLoggedIn && (
              <>
                <li>
                  <div className="sec-center">
                    <input
                      className="dropdown"
                      type="checkbox"
                      id="dropdown"
                      name="dropdown"
                    />
                    <label className="for-dropdown" htmlFor="dropdown">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-circle" width={25} height={25} viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                        <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                        <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
                      </svg>

                      My account
                    </label>
                    <div className="section-dropdown dropdown-links">
                      <NavLink to="/signup">Signup</NavLink>
                      <NavLink to="/login">Login</NavLink>
                    </div>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}