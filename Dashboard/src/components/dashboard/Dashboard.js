import React, { Component } from "react";
import RoomList from "../room/RoomList";
import TotalStatus from "../monitoring/TotalStatus";
import ServerDiagram from "../monitoring/ServerDiagram";
import { NavLink, Redirect } from "react-router-dom";
import Navbar from '../../components/layout/Navbar'
import {Row,Col,Container} from 'react-bootstrap'
import { connect } from "react-redux";
import ParticlesBg  from "particles-bg";
import './Dashboard.css'
import { ToastContainer, toast } from 'react-toastify';
import {
  Count_Room,
  All_Room,
  Start_Mqtt,
} from "../../redux/store/actions/mqttActions";
let temp = 0;
let config = {
  num: [4, 7],
  rps: 0.1,
  radius: [5, 40],
  life: [1.5, 3],
  v: [2, 3],
  tha: [-40, 40],
  // body: "./img/icon.png", // Whether to render pictures
  // rotate: [0, 20],
  alpha: [0.6, 0],
  scale: [1, 0.1],
  position: "center", // all or center or {x:1,y:1,width:100,height:100}
  color: ["random", "#ff0000"],
  cross: "dead", // cross or bround
  random: 15,  // or null,
  g: 5,    // gravity
  // f: [2, -1], // force
  onParticleUpdate: (ctx, particle) => {
      ctx.beginPath();
      ctx.rect(particle.p.x, particle.p.y, particle.radius * 2, particle.radius * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      ctx.closePath();
  }
}
class Dashboard extends Component {
  componentDidMount() {
    if (this.props.loginData && this.props.loginData.message === "success") {
      this.props.Start_Mqtt();
      this.props.All_Room();
    }
  }

  render() {
    
    if (!this.props.loginData || this.props.loginData.message !== "success") {
      return <Redirect to="/signin" />;
    }
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
      {/* <div className="container" > */}

      <Container>

      <Row>
          <Col>
            <ServerDiagram
              totalCount={rooms.totalCount}
              totalCurrentOccupide={rooms.totalCurrentOccupide}
            />
          </Col>
      </Row>
       

        <Row>
        <Col>
             <TotalStatus
              totalCount={rooms.totalCount}
              totalCurrentOccupide={rooms.totalCurrentOccupide[4]}
            />
          </Col>
          </Row>
       
           

          </Container>
          
         

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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
