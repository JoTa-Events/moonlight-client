import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import dayjs from "dayjs";
import ChatBox from "../components/ChatBox";
import { Link } from "react-router-dom";

import "./pages-css/Profile.css";

export default function MyProfile({ eventsList }) {
  const { user } = useContext(AuthContext);

  // my chats list
  const myChatsList = eventsList?.filter((event) => {
    if (event.participants?.includes(user?._id)) {
      return event;
    }
  });

  const renderMyChats = () => {
    return (
      <Tabs className="Tabs">
        <TabList>
          {myChatsList.map((event) => (
            <Tab key={event._id}>{event.title}</Tab>
          ))}
        </TabList>
        {myChatsList.map((event) => (
          <TabPanel key={event._id}>
            <ChatBox eventId={event._id} />
          </TabPanel>
        ))}
      </Tabs>
    );
  };

  // my events list
  const myEventsList = eventsList?.filter((eventDetail) => {
    return eventDetail.author._id === user?._id;
  });

  const renderMyEvents = () => {
    return (
      <>
        {myEventsList.map((event) => (
          <div className="container" key={event._id}>
            <Link to={`/events/${event._id}`}>
              <div className="card">
                <div class="card-header">
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
                </div>
              </div>
            </Link>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="profile">
      <Tabs className="Tabs">
        <TabList>
          <Tab>My events</Tab>
          <Tab>Chats</Tab>
          <Tab>?</Tab>
        </TabList>

        <TabPanel>{!myEventsList ? "Loading..." : renderMyEvents()}</TabPanel>

        <TabPanel>{!myChatsList ? "Loading..." : renderMyChats()}</TabPanel>

        <TabPanel>
          <p>Tab 3 works!</p>
        </TabPanel>
      </Tabs>
    </div>
  );
}
