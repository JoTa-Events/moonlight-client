export default function SearchInputText(props){
    const {queryString,setQueryString,eventKey}=props

    return(
        <div className="search-container">
        <form>
          <label>
            <input
              type="text"
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