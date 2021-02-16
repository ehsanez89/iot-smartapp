import React, { Component } from 'react';
import ParticlesBg  from "particles-bg";
import SignedIn from '../../src/components/auth/SignedIn'
import {Row,Col, Container} from 'react-bootstrap'
class Header extends Component {
  render() {
   
    if(this.props){
      //  var project = this.props.data.project;
      //  var github = this.props.data.github;


 
       var loggedin = this.props.loggedin;
      var name = "Smart App";
      var description= "An application to follow each staff that equiped with a beacon id. when they entered to the building, how much time they spent there and when they left the building.";
      // var city= this.props.data.address.city;
      // var networks= this.props.data.social.map(function(network){
      //   return <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
      // })
    }

    return (
      <div>
      <div className="App">
      <header id="home">
      <ParticlesBg type="lines" bg={true} />
      <nav id="nav-wrap">
         <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
	      <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

         <ul id="nav" className="nav">
            <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
            <li><a className="smoothscroll" href="https://github.com/ehsanez89">Github</a></li>
            <li><a className="smoothscroll" href="#login">Login</a></li>
            {/* <li><a className="smoothscroll" href="#contact">Contact</a></li> */}
         </ul>
      </nav>

      <div className="row banner">
      
         <div className="banner-text">
            <h1 className="responsive-headline">{name}</h1>
            <h3>{description}.</h3>
            <hr />
            <ul className="social" style={{display:"inline-block"}}>
          
               <a href="#login" className=" smoothscroll btnborder project-btn"><i className="fa fa-book"></i>Presentation</a>
               
               <a href="https://github.com/ehsanez89" className="btnborder github-btn"><i className="fa fa-github"></i>Github</a>
           
            </ul>
         </div>
      </div>

   

   </header>



</div>



<header id="login">
<ParticlesBg type="cobweb" color="#ee82ee" num={50}  bg={true} />


<div className="row loginBanner">



    <SignedIn />



</div>
</header>
<div>


</div>
</div>


   
    );
  }
}

export default Header;
