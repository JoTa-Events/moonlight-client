export default function authForAPI(){
    const storedToken = localStorage.getItem("authToken")
    const headers = { headers: { Authorization: `Bearer ${storedToken}` } }
       return headers
        
}