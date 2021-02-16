import React, { Component } from "react";
import { connect } from "react-redux";
import { addStaff } from "../../redux/store/actions/mqttActions";
import * as actionType from "../../redux/store/actions";
import { Redirect } from "react-router-dom";
import M from "materialize-css";
import { resetResult } from "../../redux/store/actions/resultAction";
import Navbar from '../layout/Navbar'
import ParticlesBg  from "particles-bg";

class AddStaff extends Component {
  state = {
    type: actionType.ADDSTAFF,
    name: "",
    surename: "",
    email: "",
    password: "",
    beaconid: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmite = (e) => {
    e.preventDefault();
    if (
      (this.state &&
        this.state.name &&
        this.state.surename &&
        "notset" &&
        "notset",
      this.state.beaconid)
    ) {
      this.props.addStaff(this.state);
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
      M.toast({ html: "User added" });
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
      <div className="form-adduser container" style={{textAlign:"center"}}>
        <form onSubmit={this.handleSubmite} className="white z-depth-2">
          <h3 className="grey-text grey-darken4">Add New Staff</h3>
          <div className="input-field">
            <input style={{maxWidth:"60%", display: "inline"}} type="text" placeholder="Name" id="name" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <input style={{maxWidth:"60%", display: "inline"}} type="text" placeholder="Surname" id="surename" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <input style={{maxWidth:"60%", display: "inline"}} type="text" placeholder="Beacon ID" id="beaconid" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <button style={{maxWidth:"60%", display: "inline"}} className="btnborder mainlogin ">Submit</button>
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
    addStaff: (person) => dispatch(addStaff(person)),
    resetResult: () => dispatch(resetResult()),
  };
};
// state mapper
const mapStateToProps = (state) => {
  return {
    result: state.result.result,
    loginData: state.auth.login,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStaff);
