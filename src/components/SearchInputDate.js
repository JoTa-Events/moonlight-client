export default function SearchInputDate(props){
    const {queryString,setQueryString,eventKey}=props

    return(
        <div className="search-container">
        <form>
          <label>
            <input
              type="date"
              value={queryString}
              placeholder={`search by ${eventKey}`}
              onChange={(e) => {
                setQueryString(e.target.value);
              }}
            />
          </label>
        </form>
      </div>
    )
}