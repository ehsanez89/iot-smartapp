import React, { Component } from 'react'
import {connect} from 'react-redux'
import PersonList from './PersonList'
import {allStaff,roomStaff} from '../../redux/store/actions/mqttActions'
import {Redirect} from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import ParticlesBg  from "particles-bg";

class Persons extends Component {
    
    componentDidMount(){
        if(this.props.loginData || this.props.loginData.message === "success")
       {
           if(!this.props.match.params.floor)
                this.props.users()
            else
                this.props.roomStaff(this.props.match.params.floor,this.props.match.params.room)
        }
    }

    render() {
        if(!this.props.loginData || this.props.loginData.message !== "success"){
            return (
            <Redirect to="/signin" />
            )
        }

        const { persons }=this.props
        
        return (
            <div style={{marginTop:"60px",marginBottom:"30px"}}>
            <ParticlesBg type="cobweb" color="#ee82ee" num={50}  bg={true} />
          <div >
                    <Navbar />
            <div className='persons container' style={{textAlign:"center"}}>
                <h3>List of all staff</h3>
                <div className="row">
                    <div className="col s12">
                        <PersonList persons={persons}/>
                    </div>
                </div>

            </div>
            </div>
            </div>
          
        )
    }
}
//dispatcher mapper
const mapDispatchToProps=(dispatch) =>{
    return(
        {
            users : () => dispatch(allStaff()),
            roomStaff : (floor,room) => dispatch(roomStaff(floor,room)) 
        }
    )
}
// state mapper
const mapStateToProps = (state) =>{
    return(
        {
            persons:state.users.allUser,
            loginData:state.auth.login

        }
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(Persons)
