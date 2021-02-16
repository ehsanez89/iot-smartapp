import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import store from "../../redux/store/store";
import { login } from "../../redux/store/actions/authAction";
import { connect } from "react-redux";

class SignedIn extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmite = (e) => {
    e.preventDefault();
    this.props.login(this.state);
  };

  render() {
    if (this.props.loginData && this.props.loginData.message === "success") {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div>
      <div className="banner-text">
        <h1 className="responsive-headline">Login to system</h1>

        <hr />
        <ul className="social">
          
      <div className="form-login container">
      <h2 style={{padding:"50px"}}>Login to system</h2>
        <form onSubmit={this.handleSubmite} className="white z-depth-2">
         
          <div className="input-field">
            
            <input type="email" placeholder="Email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <input type="password" placeholder="Password" id="password" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button  disabled={!this.state.email} className="btnborder mainlogin">Login</button>
          </div>
        </form>
      </div>
      </ul>
      </div>
      </div>
    
    );
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    login: (state) => dispatch(login(state)),
  };
};

const mapStateToProps = (state) => {
  return {
    loginData: state.auth.login,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignedIn);
