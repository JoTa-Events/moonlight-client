import dayjs from "dayjs";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import ChatBox from "./ChatBox";
import "../pages/pages-css/Profile.css";

export default function MyChatsList(props) {

  const { eventsList,setReRender,getAllEvents } = props;
  const { user } = useContext(AuthContext);
 
  
  const today = dayjs().startOf("day");
  
  const eventsUserParticipate = eventsList?.filter((event) =>
    event.participants?.includes(user?._id)
  );
  
  //future Events
  const futureEvents = eventsUserParticipate?.filter((event) => {
    const eventDate = dayjs(event.date);

    return eventDate.isAfter(today);
  });

  //past Events
  const pastEvents = eventsUserParticipate?.filter((event) => {
    const eventDate = dayjs(event.date);

    return eventDate.isBefore(today);
  });

  // sort events
  futureEvents.sort((a, b) => {
    let dateA = dayjs(a.date);
    let dateB = dayjs(b.date);
    return dateA.diff(dateB, "day");
  });

  pastEvents?.sort((a, b) => {
    let dateA = dayjs(a.date);
    let dateB = dayjs(b.date);
    return dateB.diff(dateA, "day");
  });

  // combine the two arrays in an  array
  const myChatsToDisplay = [...futureEvents, ...pastEvents];

  //

  const renderMyChats = () => {
    return (
      <Tabs className="chat-container">

          <TabList className="chat-list">
            {futureEvents.map((event) => (
              <Tab key={event._id}
                style={{width: "100%"}}
              >{event.title}</Tab>
            ))}

            {pastEvents.map((event) => (
              <Tab
                style={{backgroundColor: "DarkGray", width: "100%"}}
                key={event._id}
              >
                {event.title}
              </Tab>
            ))}
          </TabList>

          {myChatsToDisplay.map((event) => (
            <TabPanel key={event._id}>
              <ChatBox getAllEvents={getAllEvents} setReRender={setReRender} eventId={event._id} />
            </TabPanel>
          ))}
      </Tabs>
    );
  };

  return (
    <>
      {!myChatsToDisplay 
        ? (<div className="loader">Loading...</div>) 
        : renderMyChats()}
    </>
  );
}
