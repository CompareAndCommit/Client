import React, { useEffect, useState } from 'react';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';
import Grow from '@material-ui/core/Grow';
import { myToast } from "./component/swal-toast";
import axios from "axios"
import './Compare.css'

function Compare(props) {

    //오늘 날짜 구하기
    let minDate = '', fullDate='', tmpDate="";
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();

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

    let [fDate, onFullDateChange] = useState(fullDate);
    let [tDate, onTmpDateChange] = useState(tmpDate);

    const switchFullDateHandler = (newDate) => {
        onFullDateChange(newDate)
    }

    const switchTmpDateHandler = (newDate) => {
        onTmpDateChange(newDate)
    }
    /*
    myData는 내 커밋 데이터
    frData는 내 친구 커밋 데이터
    days는 비교 날짜 일수
    */
    let [myData, onMyDataChange] = useState({data:[
        {x: "", y: 0},
    ], total:0})
    
    let [frData, onFrDataChange] = useState({data: [
        {x: "", y: 0},
    ], total:0})

    let [compareDays, onCompareDaysChange] = useState({days: [
        {me: 0, y: 0, total:0},
    ]})

    const switchHandler = (myData, myTotalData, frData, frTotalData, compDays) => {
        onMyDataChange({data:myData, total:myTotalData})
        onFrDataChange({data:frData, total:frTotalData})
        onCompareDaysChange({days:compDays})
    }

    /*
    useEffect 함수에는 두 개의 인자가 담기는데
    첫번째 인자는 호출될 함수를
    두번째 인자는 함수를 호출하는 트리거(?)를 담는다.
    
    첫번째 인자로 담긴 함수는 axios로 요청 받아서 열심히 그래프에 데이터를 넣는 부분!!
    console.log()된 값이나 post맨에서 받은 값으로 어떻게 구성되었는지 볼 수 있다.

    지금 두번째 인자로 [fDate, tDate]가 담겨있는데,
    위에 state로 정의된
    fDate가 바뀔 때마다, 혹은 tDate가 바뀔 때마다 위의 함수가 호출된다.
    아래의 date input하는 부분에서 변화가 생길 때마다 state에 있는 fDate나 tDate를 바꿔줘~ 라고 코드를 짰는데, ( onChange={ev => switchFullDateHandler(ev.target.value)} )
    그게 실행될 때마다, 즉 사용자가 date를 새로 선택할 때마다 위의 함수가 호출된다.
    */
    useEffect(()=>{
        async function fetchData(){ 
            axios.get(`/compare_commits?MyName=${props.myName}&OtherName=${props.friendName}&StartDate=${tDate}&EndDate=${fDate}`).then(
                (response) => {
                    if(response.data.code === 400) {
                        myToast("warning", "Invalid Username")
                        setTimeout(()=>{
                            props.setCompare(false)
                            props.setHome(true)
                        }, 3000)
                    }
                    else {
                        const myDatas = []
                        const frDatas = []
                        const dates = response.data.my_data.date;
                        const mData = response.data.my_data.count;
                        const fData = response.data.other_data.count;
                        let mAllCommits = 0;
                        let fAllCommits = 0;
                        let myDays = 0; //내가 더 많이 커밋한 날
                        let frDays = 0; //친구가 더 많이 커밋한 날
                        for(let i=0;i<dates.length;i++){
                            myDatas.push({x:dates[i], y:mData[i]})
                            frDatas.push({x:dates[i], y:fData[i]})
                            mAllCommits += mData[i]
                            fAllCommits += fData[i]
                            if (mData[i] > fData[i]) {
                                myDays += 1;
                            }
                            else if (mData[i] < fData[i]) {
                                frDays += 1;
                            }
                        }
                        switchHandler(myDatas, mAllCommits, frDatas, fAllCommits, {me:myDays, y:frDays, total:myDatas.length})
                    }
                },
                (error) => {console.log(error)}
            );
        }
        fetchData();
    }, [fDate, tDate, props])
    
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
                            <div className="vs-sub" id="v">V</div>
                            <div className="vs-sub" id="s">S</div>
                        </div>
                        <span className="friend">{ props.friendName }</span>
                    </div>
                    </div>
                    <Grow in={props.viewCompare} style={{transformOrigin: "0 -10 0"}} {...(props.viewCompare? { timeout: 1000 } : {})}>
                    <div className="selectdate">
                        <p className="selectment">Select a period</p>
                        <hr width="60rem" color="black" size="1" align="left" />
                        
                        <div className="calendar">
                            <input type="date" name="startdate" value={tDate} min={minDate} max={fDate} onChange={ev => switchTmpDateHandler(ev.target.value)} />
                            <input type="date" name="enddate" value={fDate} min={tDate} max={fullDate} onChange={ev => switchFullDateHandler(ev.target.value)}/>
                        </div>
                    </div>
                    </Grow>
                    <Grow in={props.viewCompare} style={{transformOrigin: "0 0 0"}}>
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
                                <VictoryAxis
                                    style={{ axis: { stroke: '#1b5c2d' },
                                    tickLabels: { fontSize: 25, fill: '#1b5c2d'},
                                    grid: { stroke: '#1b5c2d', strokeWidth: 0.25 }
                                    }} dependentAxis
                                />
                                <VictoryAxis
                                    style={{ axis: { stroke: '#1b5c2d' },
                                    ticks: { stroke: '#1b5c2d' },
                                    }}
                                    tickFormat={(x)=>''}
                                />
                                <VictoryLine
                                    style={{ data: { stroke: "#B9EFC2", strokeWidth:5, strokeLinecap:"round" }}}
                                    data={myData.data}
                                    interpolation="natural"
                                />
                                <VictoryLine
                                    style={{ data: { stroke: "#2C974B", strokeWidth:5, strokeLinecap:"round" }}}
                                    data={frData.data}
                                    interpolation="natural"
                                    />
                            </VictoryChart>
                            <div className="userClassify">
                                <div className="users">
                                    <div className="box" id="box1"></div>
                                    <div className="usernames">{ props.myName }</div>
                                </div>
                                <div className="users">
                                    <div className="box" id="box2"></div>
                                    <div className="usernames">{ props.friendName }</div>
                                </div>
                            </div>
                        </div>
                       
                        <div className="analysis">
                            <div className="rectangle">
                                <div id="rect-total-title">Total Commits</div>
                                <div className="rect-total-sub">
                                    <span className="rect-total-num">{myData.total} </span> by {props.myName}
                                </div>
                                <div className="rect-total-sub">
                                    <span className="rect-total-num">{frData.total} </span> by {props.friendName}
                                </div>
                            </div>
                            <div className="rectangle">
                                <div className="rect-container">
                                    <div className="rect-names">{ props.myName } commited more in</div> 
                                    <div className="rect-days">{compareDays.days.me} / {compareDays.days.total} Days</div>
                                </div>
                                <div className="rect-container">
                                    <div className="rect-names">{ props.friendName } commited more in</div> 
                                    <div className="rect-days">{compareDays.days.y} / {compareDays.days.total} Days</div></div>
                                </div>
                            </div>
                        </div>
                        </Grow>
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