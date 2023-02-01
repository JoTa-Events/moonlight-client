import { useEffect, useState } from "react";
import EventInList from "./EventInList";
import SearchInputText from "./SearchInputText";
import SearchInputDate from "./SearchInputDate";
import converter from "number-to-words";
import capitalize from "../utils/capitalize";

import "./components-css/Search.css";
import dayjs from "dayjs";

export default function SearchBar(props) {
  const { eventsList, setIsSearching } = props;

  const [queryStringTitle, setQueryStringTitle] = useState("");
  const [queryStringDescription, setQueryStringDescription] = useState("");
  const [queryStringUsername, setQueryStringUsername] = useState("");
  const [queryStringDate, setQueryStringDate] = useState("");
  const [isSearchHidden, setIsSearchHidden] = useState(true);

  const searchResultTitle = eventsList.filter((event) =>
    event.title.toLowerCase().includes(queryStringTitle.toLowerCase())
  );

  const searchResultDescription = searchResultTitle.filter((event) =>
    event.description
      .toLowerCase()
      .includes(queryStringDescription.toLowerCase())
  );

  const searchResultUsername = searchResultDescription.filter((event) =>
    event.author?.username
      .toLowerCase()
      .includes(queryStringUsername.toLowerCase())
  );

  const searchResultDate = searchResultUsername.filter((event) =>
    dayjs(event.date).format("YYYY-MM-DD").includes(queryStringDate)
  );

  const clearSearch = () => {
    setQueryStringTitle("");
    setQueryStringDescription("");
    setQueryStringUsername("");
    setQueryStringDate("");
  };

  const ShowHideSearch = () => {
    setIsSearchHidden((prevValue) => !prevValue);
  };

  useEffect(() => {
    if (searchResultDate.length < eventsList.length) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [
    queryStringTitle,
    queryStringDescription,
    queryStringUsername,
    queryStringDate,
  ]);

  const renderList = () => {
    return (
      <>
        <h3>
          {capitalize(converter.toWords(searchResultDate.length))} event(s)
          found
        </h3>

        <div className="container">
          {searchResultDate.map((event) => (
            <div key={event._id}>
              <EventInList event={event} />
            </div>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="search-container">
      <h2> Search</h2>

      <div className="search-form">
        <button hidden={!isSearchHidden} type="submit" onClick={ShowHideSearch}>
          Search
        </button>

        <div hidden={isSearchHidden}>
          <div className="search-bar">
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

            <button onClick={clearSearch}>Clear search</button>

            <button
              onClick={() => {
                ShowHideSearch();
                clearSearch();
              }}
            >
              X
            </button>
          </div>
        </div>

        {(queryStringTitle ||
          queryStringDescription ||
          queryStringUsername ||
          queryStringDate) &&
          (!eventsList ? "Loading......" : renderList())}
      </div>
    </div>
  );
}
