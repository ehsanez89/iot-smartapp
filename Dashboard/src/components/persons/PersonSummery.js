import React from "react";
import { NavLink } from "react-router-dom";
import {Card ,CardColumns} from 'react-bootstrap'

const personSummery = ({ person }) => {
  return (
    <div style={{textAlign:"center" , marginTop:"20px"}}>
        <Card
     
     style={{ backgroundColor: "rgb(51 51 51)" , marginTop: "0",   marginRight: "auto",
     marginBottom: "80px",borderRadius: "25px",
     marginLeft: "auto", maxWidth: "900px" , maxHeight:"300px"}}
     className="mb-2"
   >
                       <Card.Body>
                           <Card.Title  style={{ paddingTop:"30px", color: '#fff', fontSize: "20px" , color: "#ee82ee"}}> {person.user ? person.user.name : person.name}</Card.Title>
                           <hr></hr>

                           <Card.Text style={{ color: '#fff'}}>
                           <h5 style={{color:"white"}}>User ID: <h5>{person.user ? person.user.uid : person.uid}</h5></h5>
                           <h5 style={{color:"white"}}>User Surname: <h5>{person.user ? person.user.surename : person.surename}</h5></h5>
                           <h5 style={{color:"white"}}>User MQTT Topic: <h5>{person.user ? person.user.beaconid : person.beaconid}</h5></h5>
                          
                           </Card.Text>
                
                       </Card.Body>
                      
                       <br/>
               
        </Card>      
  
    </div>
  
  );
};

export default personSummery;
