import React,{Component} from 'react'
import { NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {logOut} from '../../redux/store/actions/authAction'
import SideNavHeader from './SideNavHeader'
class SignedInLink extends Component {
    constructor(props){
        super(props)
        this.state = { screenWidth: null };
      
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }
    
    resize() {
        this.setState({hideNav: window.innerWidth <= 990});
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.resize.bind(this));
    }

    render(){   
        const level= (this.props.loginData && this.props.loginData.message === "success")?1:0
        const cssClassName=this.state.hideNav?"sidenav":"right"
    return(
        <ul  id="slide-out" className={cssClassName}>
            
            |{ this.state.hideNav? <li><SideNavHeader /></li>:null}
            { level === 1 ? <li><NavLink to='/person'>{this.state.hideNav?<i class="material-icons">Staff List</i>:null}Staff List</NavLink></li>:null}
            |
            { level === 1 ? <li><NavLink to='/roomstatus'>{this.state.hideNav?<i class="material-icons">Rooms Status</i>:null}Rooms Status</NavLink></li>:null}
            |
            { level === 1 ? <li><NavLink to='/addroom'>{this.state.hideNav?<i class="material-icons">Add Room</i>:null}Add Room</NavLink></li>:null}
            |
            { level === 1 ? <li><NavLink to='/addstaff'>{this.state.hideNav?<i class="material-icons">Add Staff</i>:null}Add Staff</NavLink></li>:null}
            |<li><a onClick={this.props.logOut}>{this.state.hideNav?<i class="material-icons">exit_to_app</i>:null}Logout</a></li>
          
            
            {/* <li>
                {!this.state.hideNav?<NavLink to='/' className='btn btn-floating orange accent-4'>NN</NavLink>:null}
            </li> */}
 
        </ul>
    )
    }

}

const mapDispatchToProps = (dispatch) =>{
    return({
        logOut :  () => dispatch(logOut()) 
    })
}

const mapStateToProps = (state) =>{
    return({
        loginData:state.auth.login
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(SignedInLink)