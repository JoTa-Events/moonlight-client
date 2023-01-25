import { useState } from "react";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";

export default function CreateEvent() {

      const [title, setTitle] = useState("");
      const [date, setDate] = useState("");
      const [location, setLocation] = useState("");
      const [description, setDescription] = useState("");
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        const requestBody = {title, date, location, description};
        
        axios
          .post(`${process.env.REACT_APP_API_URL}/api/events`, requestBody)
          .then((response) => {

            // Reset the state
            setTitle(""); setDate(""); setLocation(""); setDescription("");
            // props.refreshProjects();
          })
          .catch((error) => console.log(error));
      };
    
    
      return (
        <div className="AddProject">
          <h3>Submit an event</h3>

          <Card border="light" style={{ width: "30%", margin: "auto", marginTop: "50px", padding: "5px" }} >
            <Form onSubmit={handleSubmit}>
                <Form.Label >Title</Form.Label>   
                <Form.Control type="text"
                    required={true}
                    name="title"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }} 
                />

                <Form.Label>Date</Form.Label>   
                <Form.Control type="date" 
                    name="date"
                    value={date}
                    onChange={(e) => { setDate(e.target.value) }} 
                />

                <Form.Label>Location</Form.Label>   
                <Form.Control type="text"
                    name="location"
                    value={location}
                    onChange={(e) => { setLocation(e.target.value) }} 
                />

                <Form.Label>Description</Form.Label>   
                <Form.Control as="textarea" rows={5} 
                    name="description"
                    value={description}
                    onChange={(e) => { setDescription(e.target.value) }} 
                />
                
                <Button type="submit" variant="dark" style={{marginTop: "15px"}} >Create</Button>

            </Form>
        </Card>
    
        </div>
      );
    }

