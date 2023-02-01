import "./components-css/AreYouSure.css"
export default function AreYouSure(props){
    const {handleYes,setDisplayAreYouSure,confirmMessage}= props
    const closeWindow = ()=>{
        setDisplayAreYouSure(false)
    }
    return(<>
        <div className="are-you-sure-container">
            <button className="click-close-window" onClick={closeWindow}>x</button>
            <p>{confirmMessage? confirmMessage : "are you sure?" }</p>
            
            <button className="click-yes" onClick={handleYes}><b>Yes</b></button>
            <button className="click-no" onClick={closeWindow}><b>No</b></button>
        </div>
    </>)
}