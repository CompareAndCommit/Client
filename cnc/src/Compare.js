import React, { useEffect, useState } from 'react';
//import Calendar from 'react-calendar';
import { VictoryChart, VictoryLine } from 'victory';
//import swal from 'sweetalert2';
//import 'react-calendar/dist/Calendar.css';
import axios from "axios"
import './Compare.css'

function Compare(props) {
    let [myData, onMyDataChange] = useState({data:[
        {x: "", y: 0},
    ]})
    
    let [frData, onFrDataChange] = useState({data: [
        {x: "", y: 0},
    ]})

    //오늘 날짜 구하기
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let fullDate = '';
    let tmpDate = '';
    let minDate = '';

    if (month < 10) {
         fullDate = year + '-0' + month + '-' + date;
         minDate = (year - 1) + '-0' + month + '-' + date;
         if (month === 1) {
             tmpDate = year + '-12-' + date;
         }
         else {
             tmpDate = year + '-0' + (month - 1) + '-' + date;
         }
    }
    else {
        fullDate = year + '-' + month + '-' + date;
        tmpDate = year + '-' + (month - 1) + '-' + date;
        minDate = (year - 1) + '-' + month + '-' + date;
    }

    let [fDate, onFullDateChange] = useState({date:fullDate});
    let [tDate, onTmpDateChange] = useState({date:tmpDate});

    const switchFullDateHandler = (newDate) => {
        onFullDateChange({date:newDate})
    }

    const switchTmpDateHandler = (newDate) => {
        onTmpDateChange({date:newDate})
    }

    const switchMyDataHandler = (newData) => {
        onMyDataChange({data:newData})
    }

    const switchFrDataHandler = (newData) => {
        onFrDataChange({data:newData})
    }

    //getCommits(props.myName, props.friendName, fullDate, tmpDate)
    useEffect(()=>{
        axios.get(`/compare_commits?MyName=${props.myName}&OtherName=${props.friendName}&StartDate=${tDate.date}&EndDate=${fDate.date}`).then(
            (response) => {
                console.log(response)
                const myDatas = []
                const frDatas = []
                const dates = response.data.my_data.date;
                const mData = response.data.my_data.count;
                const fData = response.data.other_data.count;
                for(let i=0;i<dates.length;i++){
                    myDatas.push({x:dates[i], y:mData[i]})
                    frDatas.push({x:dates[i], y:fData[i]})
                }
                switchMyDataHandler(myDatas)
                switchFrDataHandler(frDatas)
            },
            (error) => {console.log(error)}
            );
    }, [fDate, tDate])
    
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

                    <div className="selectdate">
                        <p className="selectment">Select a period</p>
                        <hr width="60rem" color="black" size="1" align="left" />
                        
                        <div className="calendar">
                            <input type="date" name="enddate" value={fDate.date} min={minDate} max={fullDate} onChange={ev => switchFullDateHandler(ev.target.value)}/>
                            <input type="date" name="startdate" value={tDate.date} min={minDate} max={fullDate} onChange={ev => switchTmpDateHandler(ev.target.value)} />
                        </div>
                    </div>
                    
                    <div className="subdiv">

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
                          width={1200}
                          height={600}
                          >
                            <VictoryLine
                                style={{ data: { stroke: "#B9EFC2", strokeWidth:5, strokeLinecap:"round" } }}
                                data={myData.data}
                                interpolation="natural"
                            />
                            <VictoryLine
                                style={{ data: { stroke: "#2C974B", strokeWidth:5, strokeLinecap:"round" } }}
                                data={frData.data}
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