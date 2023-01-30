
import dayjs from "dayjs";
import { useContext } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import { AuthContext } from "../context/auth.context";
import ChatBox from "./ChatBox";

export default function MyChatsList(props){

    const { eventsList} = props
    const { user } = useContext(AuthContext)
    
    const today = dayjs().startOf("day");

    const eventsUserParticipate = eventsList?.filter((event) => (
        event.participants?.includes(user?._id)
    ));
    
    //future Events 
    const futureEvents = eventsUserParticipate?.filter((event) => {
        const eventDate = dayjs(event.date);
    
        return eventDate.isAfter(today);
      });

    //past Events
    const pastEvents = eventsList?.filter((event) => {
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
    const myChatsToDisplay=[...futureEvents,...pastEvents]


    
    //
    
    
    const renderMyChats = () => {
        return (
          <Tabs className="chat-container">
            <>
              <TabList className="chat-list">

                {futureEvents.map((event) => (
                  <Tab style={{border: ".5px solid #282c34"}} key={event._id}>{event.title}</Tab>
                ))}

                {pastEvents.map((event) => (
                  <Tab style={{border: ".5px solid #282c34",backgroundColor:"DarkGray"}} key={event._id}>{event.title}</Tab>
                ))}
                
              </TabList>
             
            </>
            {myChatsToDisplay.map((event) => (
              <div  key={event._id} className='ChatBox'>
                <TabPanel>
                  <ChatBox eventId={event._id} />
                </TabPanel>
              </div>
            ))}
          </Tabs>
        );
      };

    return(<>
        {!myChatsToDisplay ? "Loading..." : renderMyChats()}
    </>)
}