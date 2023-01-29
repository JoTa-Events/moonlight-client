import axios from "axios"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import FutureEvents from "../components/FutureEvents"
import PastEvents from "../components/PastEvents"
import capitalize from "../utils/capitalize"

export default function AuthorProfile(){
    const {username} =useParams()
    const API_URL=process.env.REACT_APP_API_URL
    const [authorData,setAuthorData] = useState(null)
    const today = dayjs().startOf("day");
 
    useEffect(()=>{
        axios.get(`${API_URL}/api/profile/${username}`)
            .then((response)=>{
                
                setAuthorData(response.data)
            })
            .catch((error)=>{
                console.log(`Error getting the data from "${username}"`,error)
            })
    },[])
    
    const renderAuthorEvents=()=>{
        
            return (
             <> 
                <h3>Next Events</h3>
                <FutureEvents eventsList={authorData.events} fromDate={today} />

                <h3>Past events</h3>
                <PastEvents eventsList={authorData.events} fromDate={today}/>
             </>
            );
          };
 

    const renderAuthorProfile=()=>{
       return(
         <div className="AuthorProfile" style={{margin:"2rem",padding:"2rem"}}>
            <h2>{capitalize(authorData.author.username)}</h2>
           <div className="avatar-profile-container">
                <img src={authorData.author.avatar} alt="avatar"/>
           </div>
           <h4>A Moonlight member for {dayjs(today).diff(authorData.author.createdAt,"day")} days</h4> 

        </div>
    )}
    return(
        <div className="Author-profile-page">

            {!authorData ? "Loading..." : <> {renderAuthorProfile()}<hr/>{renderAuthorEvents()}</>}
        </div>

    ) 
        
}