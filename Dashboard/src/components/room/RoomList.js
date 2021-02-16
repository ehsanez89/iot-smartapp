import React from 'react'
import RoomSummery from './RoomSummery'
import Navbar from '../../components/layout/Navbar'
import {Row,Col,Container} from 'react-bootstrap'

const RoomList = ({rooms}) => {
    return(
        <div>
            {
                rooms && rooms.map(room => {
                    return(
                    <Row>
                        <Col>
                        <RoomSummery room={room} key={room._id}/>
                         </Col>
                         </Row>
                    )
                         
                })
            }
        </div>
    )
}

export default RoomList