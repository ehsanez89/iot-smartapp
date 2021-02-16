import React, { Component } from "react";
import RoomList from "../room/RoomList";
import TotalStatus from "../monitoring/TotalStatus";
import ServerDiagram from "../monitoring/ServerDiagram";
import { NavLink, Redirect } from "react-router-dom";
import Navbar from '../layout/Navbar'
import {Row,Col,Container} from 'react-bootstrap'
import { connect } from "react-redux";
import ParticlesBg  from "particles-bg";

import {
  Count_Room,
  All_Room,
  Start_Mqtt,
} from "../../redux/store/actions/mqttActions";
let temp = 0;

class RoomStatus extends Component {
  componentDidMount() {
      this.props.Start_Mqtt();
      this.props.All_Room();

  }

  render() {

    const { rooms } = this.props;
    if (temp === 0) {
      {
        rooms.roomList &&
          rooms.roomList.forEach((item) =>
            this.props.Count_Room(item.floor, item.room)
          );
      }
      if (rooms.roomList.length > 0) temp = 1;
    }
   
    return (
            
      <div style={{marginTop:"60px",marginBottom:"30px"}}>
        <ParticlesBg type="cobweb" color="#ee82ee" num={50}  bg={true} />
      <div >

      <div className="dashboard container" style={{ borderRadius: "10px"}}>
              <Navbar />
     
      <div style={{textAlign:"center" , marginTop:"20px"}}>
        <h3 style={{marginBottom:"40px"}}>List of all available rooms</h3>
          <RoomList rooms={rooms.roomList} />
</div>
      </div>
      </div>
      </div>
    );
  }
}
//dispatcher mapper
const mapDispatchToProps = (dispatch) => {
  return {
    All_Room: () => dispatch(All_Room()),
    Count_Room: (floor, room) => dispatch(Count_Room(floor, room)),
    Start_Mqtt: () => dispatch(Start_Mqtt()),
  };
};

const mapStateToProps = (state) => {
  return {
    rooms: state.room,
    loginData: state.auth.login,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomStatus);
