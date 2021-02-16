import React from "react";
import ReactDOM from "react-dom";
import {
  XYPlot,
  LineSeries,
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  makeVisFlexible,
  makeWidthFlexible,
  makeHeightFlexible,
  VerticalBarSeriesCanvas,
  RadialChart,
  
} from "react-vis";
import "react-vis/dist/style.css";
import UserLogComponent from "../logsmonitoring/UserLogComponent";

const ServerDiagram = ({ totalCount, totalCurrentOccupide }) => {
  let index = 10;
  var handleMenuItemClick = (event) => {
    console.log(event.target.textContent);
    const element = document.createElement("a");
    const file = new Blob([event.target.textContent],    
    {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div style={{borderRadius: "25px", backgroundColor:"rgb(24, 24, 24)" , padding:"20px"}}>
    <div className="card z-depth-2 server-summery">
      <div>
        <div className="card-title">
          <h3 className="card-title gray-text darken-4" style={{textAlign:"center"}}>Live View Chart</h3>
        </div>
        <hr></hr>
        <div className="grey-text text-darker-3">
          <div className="row">
            <div className="col">
              <span className="card-title">
         
                <XYPlot  margin={{ left: 70 }}  xType="ordinal" height={500} width={1020} olor="#12939A" colorType="literal" >
                  <XAxis />
                  <YAxis title="Number of Attendees" />
                  <VerticalBarSeries 
                    color="#00000000"
                    style={{ strokeStyle: "dashed" , stroke: 'violet', strokeWidth: "3" }}
                    height={100}
                    width={100}
                    data={[
                      ...totalCurrentOccupide.map((item) => {
                        return { x: index++, y: item };
                      }),
                    ]}
                  />
                </XYPlot>
              </span>
            </div>
            <div>
          
            <div style={{backgroundColor: "#FF0000"}} className="logdata"  style={{backgroundColor:" rgb(24, 24, 24)"}}>
              <h3 className="card-title gray-text darken-4" style={{textAlign:"center"}}>Staff Log History</h3>
              <hr style={{marginLeft:"20px",marginRight:"20px"}}></hr>
              <h6 style={{textAlign:"center" , color: "white  "}}>The list will updated as soon as we found an activity</h6>
              <button style={{backgroundColor:"#ee82ee05"}} onClick={event => handleMenuItemClick(event)}>
                <UserLogComponent className="activity-log" />
                </button>
            </div>
      
            </div>
            
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

      let downloadTxtFile = () => {
      
    
      }
export default ServerDiagram;
