import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import {Card ,CardColumns} from 'react-bootstrap'
import CardDeck from 'react-bootstrap/CardDeck'
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/Button';
import {Row,Col,Container} from 'react-bootstrap'
import { useEffect } from 'react'

const RoomSummery = ({room}) => {
        console.log(room.counter)
 
    return(
        <div>
            <Card
     
              style={{ backgroundColor: "rgb(51 51 51)" , marginTop: "0",   marginRight: "auto",
              marginBottom: "80px",borderRadius: "25px",
              marginLeft: "auto", maxWidth: "900px" , maxHeight:"400px"}}
              className="mb-2"
            >
                                {/* <Card.Img style={{borderTopLeftRadius: "25px",borderTopRightRadius: "25px"}} variant="top" src="https://globaladvisors.biz/wp-content/uploads/2019/12/20160731_062514.jpg" /> */}
                                <Card.Body>
                                    <Card.Title style={{ paddingTop:"30px", color: '#fff', fontSize: "20px" , color: "#ee82ee"}}>{room.name}</Card.Title>
                                    <hr></hr>
                                    <Card.Text style={{ color: '#fff' }}>
                                    <h5 style={{color:"white"}}>Floor Number<h5>{room.floor}</h5></h5>
                                    <h5 style={{color:"white"}}>Room Number<h5>{room.room}</h5></h5>
                                    {room.counter ? <h5 style={{color:"white"}}>Available Staff <h5>{room.counter}</h5></h5> : ''}
                                    <h5 style={{color:"white"}}>Total Capacity <h5>{room.capacity}</h5></h5>
      
                                    </Card.Text>
                                    <NavLink to={`/person/${room.floor}/${room.room}`}>
                                    <Button  style={{ width: '100%',borderBottomLeftRadius: "10px" ,backgroundColor :"#ee82ee",color :"white" ,borderBottomRightRadius: "10px"}}variant="primary">See Room</Button>
                                    </NavLink> 
                                </Card.Body>
                               
                                <br/>
                        
                       
                                </Card>
                                </div>
      
    )
}

export default RoomSummery