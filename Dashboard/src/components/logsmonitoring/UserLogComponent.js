import React, { Component } from 'react'
import {connect} from 'react-redux'
import UserLogState from './UserLogState'

export class UserLogComponent extends Component {
    render() {
        const { activityLog }=this.props

        return (
            <div style={{borderRadius: "25px", backgroundColor:"rgb(24, 24, 24)" , padding:"20px"}}>
            <div className="row">
                    <div className="col" style={{textAlign:"center"}}>
                        <UserLogState  activitylog={activityLog}/>
                    </div>
                </div>
                </div>
        )
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

export default connect(mapStateToProps)(UserLogComponent)