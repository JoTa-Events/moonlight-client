import dayjs from "dayjs";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function MyEventsList(props){

   const {deleteCallback , eventsList} = props
    const { user } = useContext(AuthContext)

    const myEventsList = eventsList?.filter((eventDetail) => {
        return eventDetail.author._id === user?._id;
      });

    const renderMyEvents = () => {
        return (
          <div className="container">
            {myEventsList.map((event) => (
              <div key={event._id}>
                <Link to={`/events/${event._id}`}>
                  <div className="card">
                    <div className="card-header">
                      <img src={event.image} alt="" />
                    </div>
                    <div className="card-body">
    
                      <h3>{event.title}</h3>
                      <br />
                      <p>{event.description}</p>
                      <p>{event.location}</p>
    
                      <div className="date">
                        <h5>{dayjs(event.date).format("ddd DD MMM YYYY")}</h5>
                      </div>
    
                      {event.author?.username === user?.username && 
                          <div className='edit-delete'>
                            <Link to={`/events/edit/${event._id}`}>Edit</Link>
                            <Link to="/my-profile" onClick={() => deleteCallback(event._id)}>Delete</Link>
                          </div>
                      }
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        );
      };
    
    return(<>
        {!myEventsList ? "Loading..." : renderMyEvents()}
    </>)
}