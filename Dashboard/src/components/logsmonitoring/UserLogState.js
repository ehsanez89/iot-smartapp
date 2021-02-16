import React, { Component } from "react";
import UserLog from "./UserLog";
import {connect} from 'react-redux'

export class UserLogState extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { activitylog } = this.props;
    return (
      <div>
        {activitylog &&
          activitylog.map((activitylog) => {
            return <UserLog activitylog={activitylog} />;
          })}
      </div>
    );
  }
}

// state mapper
const mapStateToProps = (state) =>{
  return(
      {
          activityLog:state.activity.activityLog,
      }
  )
}

export default connect(mapStateToProps)(UserLogState)

//export default UserLogState;
