import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./pages-css/Profile.css";
import MyEventsList from "../components/MyEventsList";
import MyChatsList from "../components/MyChatsList";
import MyProfileDetails from "../components/MyProfileDetails";

export default function MyProfile(props) {
  const { deleteCallback, eventsList } = props;

  return (
    <div className="profile">
      <Tabs className="Tabs">
        <TabList>
          <Tab>My events</Tab>
          <Tab>Chats</Tab>
          <Tab>My Profile</Tab>
        </TabList>

        <TabPanel>
          <MyEventsList
            deleteCallback={deleteCallback}
            eventsList={eventsList}
          />
        </TabPanel>

        <TabPanel>
          <MyChatsList eventsList={eventsList} />
        </TabPanel>

        <TabPanel>
          <MyProfileDetails />
        </TabPanel>
      </Tabs>
    </div>
  );
}
