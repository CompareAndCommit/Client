import React, { useEffect, useState } from 'react';
//import Calendar from 'react-calendar';
import { VictoryChart, VictoryLine } from 'victory';
//import swal from 'sweetalert2';
//import 'react-calendar/dist/Calendar.css';
import axios from "axios"
import './Compare.css'

function Compare(props) {
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

    /*
    fDate는 끝날짜, tDate는 시작날짜. 
    위에서 잘 구해놓은 fullDate(오늘)을 fDate로, tmpDate(한달전)을 tDate로 초기화함 
    구글링 했을 때 많은 분들이 저렇게 객체로 담으셔서 나도 객체로 담았다..
    fDate.date를 해야 진짜 그 날짜 문자열 값에 접근 가능
    */
    let [fDate, onFullDateChange] = useState({date:fullDate});
    let [tDate, onTmpDateChange] = useState({date:tmpDate});

    /*
    switchFullDateHandler(새로운날짜) 라고 함수 호출하면 fdate의 date를 바꾸어준다.
    switchTmpDateHandler도 마찬가지!
    */
    const switchFullDateHandler = (newDate) => {
        onFullDateChange({date:newDate})
    }

    const switchTmpDateHandler = (newDate) => {
        onTmpDateChange({date:newDate})
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

    let [days, onDaysChange] = useState({days: ""})

    let [compareDays, onCompareDaysChange] = useState({days: [
        {me: "", y: ""},
    ]})
    /*
    위에 있는 switchTmpDateHandler 친구들과 비슷한 로직이다
    */
    const switchMyDataHandler = (newData, newTDate) => {
        onMyDataChange({data:newData, total:newTDate})
    }

    const switchFrDataHandler = (newData, newTDate) => {
        onFrDataChange({data:newData, total:newTDate})
    }

    const switchDaysHandler = (days) => {
        onDaysChange({days:days})
    }

    const switchCompareHandler = (days) => {
        onCompareDaysChange({days:days})
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
        axios.get(`/compare_commits?MyName=${props.myName}&OtherName=${props.friendName}&StartDate=${tDate.date}&EndDate=${fDate.date}`).then(
            (response) => {
                console.log(response)
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
                    if (myDatas[i].y > frDatas[i].y) {
                        myDays += 1;
                    }
                    else if (myDatas[i].y < frDatas[i].y) {
                        frDays += 1;
                    }
                }
                switchMyDataHandler(myDatas, mAllCommits)
                switchFrDataHandler(frDatas, fAllCommits)
                switchDaysHandler(myDatas.length);
                switchCompareHandler({me:myDays, y:frDays});
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
                            <div className="vs-sub" id="v">V</div>
                            <div className="vs-sub" id="s">S</div>
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
                                <div className="rect-total-sub">{myData.total} by {props.myName}</div>
                                <div className="rect-total-sub">{frData.total} by {props.friendName}</div>
                            </div>
                            <div className="rectangle">
                                <div className="rect-container">
                                    <div className="rect-names">{ props.myName } commited more in</div> 
                                    <div className="rect-days">{compareDays.days.me} / {days.days} Days</div>
                                </div>
                                <div className="rect-container">
                                    <div className="rect-names">{ props.friendName } commited more in</div> 
                                    <div className="rect-days">{compareDays.days.y} / {days.days} Days</div></div>
                                </div>
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