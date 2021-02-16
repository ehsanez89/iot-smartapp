import React from 'react'
import { Link } from 'react-router-dom'
import  SignedInLink from './SignedInLink'
import  SignedOutLink from './SignedOutLink'
import {connect} from 'react-redux'
import M from 'materialize-css';
import options from 'materialize-css';

const Navbar =(props) => {
    const link = (props.loginData && props.loginData.message === "success") ?<SignedInLink /> :<SignedOutLink />
    const handleClick=(e)=>{
        e.preventDefault();
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, options);
        instances[0].open()

    }
    return(
        <div>
            <nav id="nav-wrap">
                <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
                <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

                <div className="containerNav">
                    <ul id="nav" className="nav">
                        <li><Link to='/dashboard' className='brand-logo'>Live View</Link></li>
                        <li>{link}</li>
                
                
            {/* <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
            <li><a className="smoothscroll" href="https://github.com/ehsanez89">Github</a></li>
            <li><a className="smoothscroll" href="#login">{loggedin}</a></li> */}
            {/* <li><a className="smoothscroll" href="#contact">Contact</a></li> */}
         </ul>
         </div>
         {/* <a onClick={handleClick} href="#" data-target="mobile-demo" className="sidenav-trigger"><i class="material-icons">menu</i></a> */}
      </nav>
      </div>
           

    
    
    )
}


const mapStateToProps = (state) =>{
    return({
        loginData:state.auth.login
    })
}

export default connect(mapStateToProps)(Navbar)