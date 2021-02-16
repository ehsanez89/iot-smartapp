import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { addRoom, result } from "../../redux/store/actions/mqttActions";
import { resetResult } from "../../redux/store/actions/resultAction";
import * as actionType from "../../redux/store/actions";
import { Redirect } from "react-router-dom";
import Loading from "../layout/Loading";
import Navbar from '../../components/layout/Navbar'
import ParticlesBg  from "particles-bg";

import M from "materialize-css";

class AddRoom extends Component {
  state = {
    type: actionType.ADDROOM,
    name: "",
    floor: "",
    room: "",
    capacity: "",
    sensorid: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmite = (e) => {
    e.preventDefault();
    if (
      this.state &&
      this.state.name &&
      this.state.room &&
      this.state.floor &&
      this.state.sensorid &&
      this.state.capacity
    ) {
      this.props.createRoom(this.state);
      e.target.reset();
    }
  };

  render() {
    if (!this.props.loginData || this.props.loginData.message !== "success") {
      return <Redirect to="/signin" />;
    }
    const { result } = this.props;
    const { command } = this.props;
    if (result && result === "done") {
      M.toast({ html: "Room added" });
      this.props.resetResult();
    } else if (result && result === "fail") {
      M.toast({ html: "An error Occure" });
      this.props.resetResult();
    }
    return (
      <div style={{marginTop:"60px",marginBottom:"30px"}}>
      <ParticlesBg type="cobweb" color="#ee82ee" num={50}  bg={true} />
    <div >
              <Navbar />
      {/* <div className="container" > */}
      <div className="form-addroom container" style={{textAlign:"center"}}>
        <form onSubmit={this.handleSubmite} className="white z-depth-2">
          <h3 className="grey-text grey-darken4">Add Room</h3>
          <div className="input-field">
            <input  style={{maxWidth:"60%", display: "inline"}} type="text"  placeholder="Name" id="name" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <input  style={{maxWidth:"60%", display: "inline"}} type="text" placeholder="Floor" id="floor" onChange={this.handleChange} />
          </div>
            <input  style={{maxWidth:"60%", display: "inline"}} type="text" placeholder="Room" id="room" onChange={this.handleChange} />
          <div className="input-field">
            <input  style={{maxWidth:"60%", display: "inline"}} type="text" placeholder="Capacity" id="capacity" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <input  style={{maxWidth:"60%", display: "inline"}} type="text" placeholder="Scanner" id="sensorid" onChange={this.handleChange} />
          </div>

          <div className="row">
            <div className=" col input-field">
              <button  style={{maxWidth:"70%", display: "inline"}} className="btnborder mainlogin">Submit</button>
            </div>
          </div>
        </form>
      </div>
      </div>
      </div>
   
    );
  }
}
//dispatcher mapper
const mapDispatchToProps = (dispatch) => {
  return {
    createRoom: (room) => dispatch(addRoom(room)),
    resetResult: () => dispatch(resetResult()),
  };
};
// state mapper
const mapStateToProps = (state) => {
  return {
    result: state.result.result,
    loginData: state.auth.login,
    command: state.command,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRoom);
