import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./components-css/Nav.css"

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
                  <input className="dropdown" type="checkbox" id="dropdown" name="dropdown" />
                  {/* dropdown */}
                  <label className="for-dropdown" htmlFor="dropdown">
                  <svg  style={{marginRight: "10px"}}
                    xmlns="http://www.w3.org/2000/svg" 
                    className="icon icon-tabler icon-tabler-home" 
                    idth={25}
                    height={25}
                    viewBox="0 0 24 24" 
                    strokeWidth="1" 
                    stroke="currentColor" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                  </svg>
                  {user.username}
                  </label>
                  <div className="section-dropdown">
                    <input className="dropdown-sub" type="checkbox" id="dropdown-sub" name="dropdown-sub" />
                    {/* profile link */}
                    <NavLink to="/my-profile">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-user-circle"
                      width={25}
                      height={25}
                      viewBox="0 0 24 24"
                      strokeWidth="1"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                      <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                      <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
                    </svg>
                    Profile
                    </NavLink>
                    {/* create event link */}
                    <NavLink to="/events/create">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="icon icon-tabler icon-tabler-circle-plus" 
                      width={25}
                      height={25} 
                      viewBox="0 0 24 24" 
                      strokeWidth="1" 
                      stroke="currentColor" 
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                      <path d="M9 12l6 0"></path>
                      <path d="M12 9l0 6"></path>
                    </svg>
                    Submit event
                    </NavLink>
                    {/* Logout */}
                    <NavLink to="/" onClick={logOutUser} >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="icon icon-tabler icon-tabler-logout" 
                      width={25}
                      height={25} 
                      viewBox="0 0 24 24" 
                      strokeWidth="1" 
                      stroke="currentColor" 
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                      <path d="M7 12h14l-3 -3m0 6l3 -3"></path>
                    </svg>
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
                  <input className="dropdown" type="checkbox" id="dropdown" name="dropdown" />
                  {/* dropdown */}
                  <label className="for-dropdown" htmlFor="dropdown">
                  <svg  style={{marginRight: "10px"}}
                    xmlns="http://www.w3.org/2000/svg" 
                    className="icon icon-tabler icon-tabler-home-plus" 
                    width={25}
                    height={25}  
                    viewBox="0 0 24 24" 
                    strokeWidth="1" 
                    stroke="currentColor" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M19 12h2l-9 -9l-9 9h2v7a2 2 0 0 0 2 2h5.5"></path>
                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2"></path>
                    <path d="M16 19h6"></path>
                    <path d="M19 16v6"></path>
                  </svg>
                  Register
                  </label>
                  <div className="section-dropdown">
                    {/* signup */}
                    <NavLink to="/signup">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="icon icon-tabler icon-tabler-user-plus" 
                      width={25}
                      height={25}  
                      viewBox="0 0 24 24" 
                      strokeWidth="1" 
                      stroke="currentColor" 
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                      <path d="M16 11h6m-3 -3v6"></path>
                    </svg>
                    Signup
                    </NavLink>
                    {/* login */}
                    <NavLink to="/login">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="icon icon-tabler icon-tabler-login" 
                      width={25}
                      height={25}  
                      viewBox="0 0 24 24" 
                      strokeWidth="1" 
                      stroke="currentColor" 
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                      <path d="M20 12h-13l3 -3m0 6l-3 -3"></path>
                    </svg>
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