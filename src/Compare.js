import React, { useEffect, useState } from "react";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";
import Grow from "@material-ui/core/Grow";
import { myToast } from "./component/swal-toast";
import axios from "axios";
import "./Compare.css";

function Compare(props) {
  //오늘 날짜 구하기
  let minDate = "",
    fullDate = "",
    tmpDate = "";
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();

  date = date < 10 ? "0" + date : date; // date도 예외처리
  date = date > 29 ? 28 : date;

  if (month < 10) {
    fullDate = year + "-0" + month + "-" + date;
    minDate = year - 1 + "-0" + month + "-" + date;
    if (month === 1) {
      tmpDate = year + "-12-" + date;
    } else {
      tmpDate = year + "-0" + (month - 1) + "-" + date;
    }
  } else {
    fullDate = year + "-" + month + "-" + date;
    tmpDate = year + "-" + (month - 1) + "-" + date;
    minDate = year - 1 + "-" + month + "-" + date;
  }
  let [fDate, onFullDateChange] = useState(fullDate);
  let [tDate, onTmpDateChange] = useState(tmpDate);

  const switchFullDateHandler = (newDate) => {
    onFullDateChange(newDate);
  };

  const switchTmpDateHandler = (newDate) => {
    onTmpDateChange(newDate);
  };
  /*
    myData는 내 커밋 데이터
    frData는 내 친구 커밋 데이터
    days는 비교 날짜 일수
    */
  let [myData, onMyDataChange] = useState({
    data: [{ x: "", y: 0 }],
    total: 0,
  });

  let [frData, onFrDataChange] = useState({
    data: [{ x: "", y: 0 }],
    total: 0,
  });

  let [compareDays, onCompareDaysChange] = useState({
    days: [{ me: 0, y: 0, total: 0 }],
  });

  const switchHandler = (
    myData,
    myTotalData,
    frData,
    frTotalData,
    compDays
  ) => {
    onMyDataChange({ data: myData, total: myTotalData });
    onFrDataChange({ data: frData, total: frTotalData });
    onCompareDaysChange({ days: compDays });
  };

  useEffect(() => {
    async function fetchData() {
      axios
        .get(
          `/compare-commits?MyName=${props.myName}&OtherName=${props.friendName}&StartDate=${tDate}&EndDate=${fDate}`
        )
        .then(
          (response) => {
            if (response.data.code === 400) {
              myToast("warning", "Invalid Username");
              setTimeout(() => {
                props.setCompare(false);
                props.setHome(true);
              }, 3000);
            } else {
              const myDatas = [];
              const frDatas = [];
              const dates = response.data.my_data.date;
              const mData = response.data.my_data.count;
              const fData = response.data.other_data.count;
              let mAllCommits = 0;
              let fAllCommits = 0;
              let myDays = 0; //내가 더 많이 커밋한 날
              let frDays = 0; //친구가 더 많이 커밋한 날
              for (let i = 0; i < dates.length; i++) {
                myDatas.push({ x: dates[i], y: mData[i] });
                frDatas.push({ x: dates[i], y: fData[i] });
                mAllCommits += mData[i];
                fAllCommits += fData[i];
                if (mData[i] > fData[i]) {
                  myDays += 1;
                } else if (mData[i] < fData[i]) {
                  frDays += 1;
                }
              }
              switchHandler(myDatas, mAllCommits, frDatas, fAllCommits, {
                me: myDays,
                y: frDays,
                total: myDatas.length,
              });
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
    fetchData();
  }, [fDate, tDate, props]);

  return (
    <main>
      <div id="main-container2">
        <div className="header2">
          <div className="title title2">Compare</div>
          <div className="versus">
            <span className="me">{props.myName}</span>
            <div className="vs">
              <div className="vs-sub" id="v">
                V
              </div>
              <div className="vs-sub" id="s">
                S
              </div>
            </div>
            <span className="friend">{props.friendName}</span>
          </div>
        </div>
        <Grow
          in={props.viewCompare}
          style={{ transformOrigin: "0 -10 0" }}
          {...(props.viewCompare ? { timeout: 1000 } : {})}
        >
          <div className="selectdate">
            <p className="selectment">Select a period</p>
            <hr width="60rem" color="black" size="1" align="left" />

            <div className="calendar">
              <input
                type="date"
                name="startdate"
                value={tDate}
                min={minDate}
                max={fDate}
                onChange={(ev) => switchTmpDateHandler(ev.target.value)}
              />
              <input
                type="date"
                name="enddate"
                value={fDate}
                min={tDate}
                max={fullDate}
                onChange={(ev) => switchFullDateHandler(ev.target.value)}
              />
            </div>
          </div>
        </Grow>

        <div className="subdiv">
          <div className="chart">
            <VictoryChart
              animate={{
                duration: 500,
                onLoad: { duration: 500 },
              }}
              minDomain={{ y: 0 }}
              domainPadding={{ x: [10, -10], y: 20 }}
              width={1200}
              height={600}
            >
              <VictoryAxis
                style={{
                  axis: { stroke: "#1b5c2d" },
                  tickLabels: { fontSize: 25, fill: "#1b5c2d" },
                  grid: { stroke: "#1b5c2d", strokeWidth: 0.25 },
                }}
                dependentAxis
              />
              <VictoryAxis
                style={{
                  axis: { stroke: "#1b5c2d" },
                  ticks: { stroke: "#1b5c2d" },
                }}
                tickFormat={(x) => ""}
              />
              <VictoryLine
                style={{
                  data: {
                    stroke: "#B9EFC2",
                    strokeWidth: 5,
                    strokeLinecap: "round",
                  },
                }}
                data={myData.data}
                interpolation="natural"
              />
              <VictoryLine
                style={{
                  data: {
                    stroke: "#2C974B",
                    strokeWidth: 5,
                    strokeLinecap: "round",
                  },
                }}
                data={frData.data}
                interpolation="natural"
              />
            </VictoryChart>
            <div className="userClassify">
              <div className="users">
                <div className="box" id="box1"></div>
                <div className="usernames">{props.myName}</div>
              </div>
              <div className="users">
                <div className="box" id="box2"></div>
                <div className="usernames">{props.friendName}</div>
              </div>
            </div>
          </div>

          <div className="analysis">
            <div className="rectangle">
              <div id="rect-total-title">Total Commits</div>
              <div className="rect-total-sub">
                <span className="rect-total-num">{myData.total} </span> by{" "}
                {props.myName}
              </div>
              <div className="rect-total-sub">
                <span className="rect-total-num">{frData.total} </span> by{" "}
                {props.friendName}
              </div>
            </div>
            <div className="rectangle">
              <div className="rect-container">
                <div className="rect-names">
                  {props.myName} commited more in
                </div>
                <div className="rect-days">
                  {compareDays.days.me} / {compareDays.days.total} Days
                </div>
              </div>
              <div className="rect-container">
                <div className="rect-names">
                  {props.friendName} commited more in
                </div>
                <div className="rect-days">
                  {compareDays.days.y} / {compareDays.days.total} Days
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="wrapper">
          <div className="arrow-div" id="prevArrow">
            <svg
              className="arrowSVG"
              width="18px"
              height="17px"
              viewBox="0 0 18 17"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              onClick={() => {
                props.setHome(true);
                props.setCompare(false);
                window.scrollTo(0, 0);
              }}
            >
              <g
                id="prev"
                transform="translate(8.500000, 8.500000) scale(-1, 1) translate(-8.500000, -8.500000)"
              >
                <polygon
                  className="arrow"
                  points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"
                ></polygon>
                <polygon
                  className="arrow-fixed"
                  points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"
                ></polygon>
                <path d="M-1.48029737e-15,0.56157424 L-1.48029737e-15,16.1929159 L9.708,8.33860465 L-2.66453526e-15,0.56157424 L-1.48029737e-15,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z"></path>
              </g>
            </svg>
            <span>go back to main</span>
          </div>

          <div className="arrow-div" id="nextArrow">
            <span>go to commit page</span>
            <svg
              className="arrowSVG"
              width="18px"
              height="17px"
              viewBox="-1 0 18 17"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnXlink="http://www.w3.org/1999/xlink"
              onClick={() => {
                props.setCompare(false);
                props.setCommit(true);
                window.scrollTo(0, 0);
              }}
            >
              <g>
                <polygon
                  className="arrow"
                  points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"
                ></polygon>
                <polygon
                  className="arrow-fixed"
                  points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"
                ></polygon>
                <path d="M-4.58892184e-16,0.56157424 L-4.58892184e-16,16.1929159 L9.708,8.33860465 L-1.64313008e-15,0.56157424 L-4.58892184e-16,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z"></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Compare;
