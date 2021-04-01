import React, { useEffect, useState } from 'react';
import { VictoryPie } from 'victory';
import './Commit.css'
import './Compare.css'

function Commit(props) {
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

    const languageDatas = {
        colors : ["#3572A5", "#DA5B0B", "#2C3E50", "#F1E05A", "#F18E33" ],
        langs : [
            { x: "Python", y: 45 },
            { x: "Jupyter Notebook", y: 25 },
            { x: "Vue", y: 15 },
            { x: "Javascript", y: 10 },
            { x: "Kotlin", y: 5 }
        ]
    }

    const langDescriptionList = []

    for(let i=0;i<languageDatas.langs.length; i++){
        let color=languageDatas.colors[i]
        langDescriptionList.push(<li><div className="chart-lang-box" style={{backgroundColor:color}}></div><div className="chart-lang-str">{languageDatas.langs[i].x}</div></li>)
    }

    return (
        <main>
            <div id="main-container2">
                <div className="header2">
                    <div className="title title2">
                        Commit
                    </div>
                </div>
                <div className="selectdate">
                    <p className="selectment">Select a period</p>
                    <hr width="60rem" color="black" size="1" align="left" />
                    <div className="calendar">
                        <input type="date" name="startdate" value={tDate} min={minDate} max={fDate} onChange={ev => switchTmpDateHandler(ev.target.value)}/>
                        <input type="date" name="enddate" value={fDate} min={tDate} max={fullDate} onChange={ev => switchFullDateHandler(ev.target.value)}/>
                    </div>
                </div>
                <div className="subdiv">
                    <div id="title-commit-sub">{props.myName}'s Top 5 Commits</div>
                    <div id="chart-pie">
                        <VictoryPie
                            startAngle={-90}
                            endAngle={270}
                            colorScale={languageDatas.colors}
                            data={languageDatas.langs}
                            labels={({ l }) => ""}
                        />
                    </div>
                    <div id="chart-pie-description">
                        <ul>{langDescriptionList}</ul>
                    </div>
                </div>
            </div>
        </main>
    )

}

export default Commit;