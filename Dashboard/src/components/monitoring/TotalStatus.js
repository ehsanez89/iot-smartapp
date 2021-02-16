import React from 'react'
import {Row,Col,Container} from 'react-bootstrap'

const TotalStatus = ({totalCount,totalCurrentOccupide}) =>{
 
    return(
        <div style={{borderRadius: "25px", backgroundColor:"rgb(24, 24, 24)" , padding:"20px"}}>

        <div className="card z-depth-2 server-summery">
            <div >
                <div className="card-title">
                <h3 className="card-title gray-text darken-4" style={{textAlign:"center"}}>Status</h3>
                </div>
                <hr></hr>
                <div style={{textAlign:"center", marginTop: "0", marginRight: "auto",marginBottom: "0", marginLeft: "auto"}}>
                    <Row>
                    
                                {/* <Col>Totall Staff </Col> */}
                                <Col><h6 style={{color:"white"}} >Current Registered Staff in Building <br/><h5 style={{color:"#ee82ee"}}>{totalCurrentOccupide}</h5></h6></Col>

                           </Row>
      

                           
                            <Row>
                            <Col> <h6 style={{color:"white"}} >Current Registered Available Room Capacity <br/><h5 style={{color:"#ee82ee"}}> {totalCount}</h5></h6></Col>
                         
                            </Row>
                            
                   
                        </div>
             

            </div>
        </div>
        </div>
    )
}

export default TotalStatus