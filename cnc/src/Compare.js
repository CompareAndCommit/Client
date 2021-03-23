import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { VictoryChart, VictoryLine } from 'victory';
import swal from 'sweetalert2';
import 'react-calendar/dist/Calendar.css';
import './Compare.css'

function Compare(props) {
    const [value, onChange] = useState(new Date());
    const data1 = [
        {x: "10/24", y: 2},
        {x: "10/25", y: 5},
        {x: "10/26", y: 4},
        {x: "10/27", y: 1},
        {x: "10/28", y: 2},
        {x: "10/29", y: 3},
        {x: "10/30", y: 4}
    ], data2 = [
        {x: "10/24", y: 3},
        {x: "10/25", y: 4},
        {x: "10/26", y: 2},
        {x: "10/27", y: 3},
        {x: "10/28", y: 1},
        {x: "10/29", y: 2},
        {x: "10/30", y: 4}
    ]

    //오늘 날짜 구하기
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let fullDate = '';

    if (month < 10) {
         fullDate = year + '-0' + month + '-' + date;
    }
    else {
        fullDate = year + '-' + month + '-' + date;
    }

    return (
        <main>
                <div id="main-container2">
                    <div className="header2">
                        <div className="title title2">
                            Compare
                        </div>
                    <div className="versus">
                        <span className="me">{ props.myName }</span>
                        <div className="vs">
                            <div className="v">V</div>
                            <div className="s">S</div>
                        </div>
                        <span className="friend">{ props.friendName }</span>
                    </div>
                    </div>
                    
                    <div className="subdiv">
                        <p className="selectment">Select a period</p>
                        <div className="calendar">
                            <div className="start">
                                <p>Start Date</p>
                                <input type="date" name="startdate" value={fullDate} min="2019-01-01" max={fullDate} />
                            </div>
                            <div className="end">
                                <p>End Date</p>
                                <input type="date" name="enddate" value={fullDate} min="2019-01-01" max={fullDate} />
                            </div>
                            {/* <Calendar
                                onChange = { onChange }
                                value = { value }
                            /> */}
                        </div>

                        <div className="chart">
                        <VictoryChart
                          animate={{
                            duration: 500,
                            onLoad: { duration: 500 }
                          }}
                          minDomain={
                              {y:0}
                          }
                          domainPadding={{x: [10, -10], y: 20}}
                          width={800}
                          height={500}
                          >
                            <VictoryLine
                                style={{ data: { stroke: "#B9EFC2", strokeWidth:5, strokeLinecap:"round" } }}
                                data={data2}
                                interpolation="natural"
                            />
                            <VictoryLine
                                style={{ data: { stroke: "#2C974B", strokeWidth:5, strokeLinecap:"round" } }}
                                data={data1}
                                interpolation="natural"
                                />
                        </VictoryChart>
                        </div>
                    </div>
                </div>
            </main>
    )

}

// class Commit extends Component {
//     state = {
//         myName : "nicolas serano",
//         friendName : "Serin-Yoon"
//     }
//     render() {
//         return (
//             <main>
//                 <div id="main-container2">
//                     <div className="header2">
//                         <div className="title">
//                             Compare
//                         </div>
//                     <div className="versus">
//                         <span className="me">{this.state.myName}</span>
//                         <div className="vs">
//                             <div className="v">V</div>
//                             <div className="s">S</div>
//                         </div>
//                         <span className="friend">{this.state.friendName}</span>
//                     </div>
//                     </div>
//                     <div className="chart"></div>
//                 </div>
//             </main>
//         )
//     }
// }

export default Compare;