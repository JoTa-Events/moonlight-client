import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import dayjs from 'dayjs';
import ChatBox from '../components/ChatBox';
import { NavLink } from 'react-router-dom';

export default function MyProfile({eventsList}) {

const { user } = useContext(AuthContext);
const [eventId, setEventId] = useState(null)

// my chats list
const myChatsList = eventsList?.filter((event) => {
    if(event.participants?.includes(user?._id)){
        return event
    }
    
})
console.log(myChatsList);

const renderMyChats = () => {
  return (
    <Tabs className="Tabs">
      <TabList>
        {myChatsList.map((event) => (
          <Tab key={event._id}>
            {/* <NavLink onClick={setEventId}>{event.title}</NavLink> */}
            {event.title}
          </Tab>
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
    <div style={{display: "flex", margin: "30px" }}>
      {myEventsList.map((event) => (
        <div key={event._id} style={{ border: "1px solid", width: "20%", wordWrap: "break-word", margin: "0 10px"}}>
          <h1>{event.title}</h1>
          <img src={event.image} alt='' style={{width: "300px"}} />
          <p>{dayjs(event.date).format("ddd DD MMM YYYY")}</p>
          <p>{event.location}</p>
          <p>
            <i>{event.description}</i>
          </p>
        </div>
      ))}
    </div>
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

        <TabPanel>{!myChatsList ? "Loading..." : renderMyChats()}
        </TabPanel>

        <TabPanel>
          <p>Tab 3 works!</p>
        </TabPanel>
      </Tabs>
    </div>
  );
}
