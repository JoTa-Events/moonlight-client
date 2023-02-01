import "./components-css/Search.css";

export default function SearchInputText(props) {
  const { queryString, setQueryString, eventKey } = props;

  return (
    <div className="search-container">
      <form className="search-form">
        <input
          type="text"
          value={queryString}
          placeholder={`Search by ${eventKey}`}
          onChange={(e) => {
            setQueryString(e.target.value);
          }}
        />
      </form>
    </div>
  );
}
