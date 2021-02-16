import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


var fs = require('fs');

export class UserLog extends Component {
  constructor(props) {
    super(props);
  }
  
 
 
  render() {
    let message;
    const { activitylog } = this.props;
    const prevMsg = localStorage.getItem("message");
   
    //const toastId = React.useRef(null)
    if (activitylog.user) {
      console.log("this is one");
       const entertMsg = " entered the room ";
      const leftMsg = "left the room ";
      let username = activitylog.user.name + " ";
      let showToast;
              if ( activitylog.action === "entertoroom" ) {
                username += entertMsg
       
              }
              else{
                username += leftMsg


       }
      
       var d =
        message = new Date().toJSON().slice(0,10).replace(/-/g,'/') + "   " + new Date().toLocaleTimeString() + " | "  + username + " " + activitylog.room + "\n" 
        console.log("the message is " + message);
        localStorage.setItem("message", prevMsg + " " + message);

         
        
      return (
        <div className="inactive" style={{backgroundColor:"rgb(24, 24, 24)"}}>
            <h6 className="inactive">   
                {message}
            </h6>
        </div>
      );
    } else {
  
      return (
        <div className="inactive" style={{backgroundColor:"rgb(24, 24, 24)"}}>
            <h6  className="inactive" style={{color:"#ddf704"}}>
            _______________ Room is full now _______________ 
            </h6> 
            <br/>
            <h6  className="inactive" style={{color:"rgb(247 195 4)"}}>
            A Notification Email sent to the admin's inbox
            </h6> 
            <br/>
        </div>
      );
    }
  }

}



export default UserLog;
