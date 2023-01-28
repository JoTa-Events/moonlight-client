import { useEffect, useState } from "react";
import EventInList from "./EventInList";
import SearchInputText from "./SearchInputText";
import "./components-css/Search.css"
import SearchInputDate from "./SearchInputDate";
import dayjs from "dayjs";
import converter from "number-to-words"
import capitalize from "../utils/capitalize";
export default function SearchBar(props) {
  const { eventsList } = props;
  
  const [queryStringTitle, setQueryStringTitle] = useState("");
  const [queryStringDescription, setQueryStringDescription] = useState("");
  const [queryStringUsername,setQueryStringUsername] = useState("")
  const [queryStringDate,setQueryStringDate] = useState("")


 

  const searchResultTitle = eventsList.filter((event) =>
    event.title.toLowerCase().includes(queryStringTitle.toLowerCase())
  );

  const searchResultDescription = searchResultTitle.filter((event) =>
    event.description
      .toLowerCase()
      .includes(queryStringDescription.toLowerCase())
  );

  const searchResultUsername = searchResultDescription.filter((event) =>
   
  (event.author.username.toLowerCase().includes(queryStringUsername.toLowerCase()))

  );
    
    const searchResultDate = searchResultUsername.filter((event) => (
                
        dayjs(event.date).format("YYYY-MM-DD").includes(queryStringDate)
        
    ));
 

  const renderList = () => {
    return (
      <>
        <h4 style={{margin:"1rem 0"}}>{capitalize(converter.toWords(searchResultDate.length))} events found</h4>
        <div className="search-result">
          {searchResultDate.map((event) => (
            <div className="event-inweek" key={event._id}>
              <EventInList event={event} />
            </div>
          ))}
        </div>
      </>
    );
  };
  return (
    <>
       <SearchInputText
        eventKey={"title"}
        setQueryString={setQueryStringTitle}
        queryString={queryStringTitle}
      />
       <SearchInputText
        eventKey={"username"}
        setQueryString={setQueryStringUsername}
        queryString={queryStringUsername}
      />
      <SearchInputText
        eventKey={"description"}
        setQueryString={setQueryStringDescription}
        queryString={queryStringDescription}
      />
      <SearchInputDate
        eventKey={"date"}
        setQueryString={setQueryStringDate}
        queryString={queryStringDate}
      />
      
      {(queryStringTitle || queryStringDescription || queryStringUsername ||queryStringDate) && 
      (!eventsList ? "Loading......" : renderList())}
    </>
  );
}