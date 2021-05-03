import React, { useEffect, useState } from 'react';
import { VictoryPie } from 'victory';
import Slide from '@material-ui/core/Slide';
import SimpleSlider from "./slider"
import './Commit.css'
import './Compare.css'
import axios from 'axios';
import { myToast } from './component/swal-toast';

function Commit(props) {

    let [langDatas, onLangDataChange] = useState(
        {
            colors : [],
            langs : []
        }
    );
    
    const switchLangDataHandler = (data) => {
        onLangDataChange(data)
    }

    // const langDatas = {
    //     colors : ["#3572A5", "#DA5B0B", "#2C3E50", "#F1E05A", "#F18E33" ],
    //     langs : [
    //         { x: "Python", y: 45 },
    //         { x: "Jupyter Notebook", y: 25 },
    //         { x: "Vue", y: 15 },
    //         { x: "Javascript", y: 10 },
    //         { x: "Kotlin", y: 5 }
    //     ]
    // }



    const langList = []

    for(let i=0;i<langDatas.langs.length; i++){
        let color=langDatas.colors[i]
        langList.push(<li key={i}><div className="chart-lang-box" style={{backgroundColor:color}}></div><div className="chart-lang-str">{langDatas.langs[i].x}</div></li>)
    }


    useEffect(()=>{
        async function getTopFiveLangData() {
            console.log(`/top-five-languages?MyName=${props.myName}`);
            axios.get(`/top-five-languages?MyName=${props.myName}`).then(
            
                (response) => {
                    if (response.data.code === 400) {
                        myToast("warning", "Cannot Get Data")
                        setTimeout(()=>{
                            props.setCommit(false)
                            props.setCompare(true)
                        })
                    }
                    else {
                        const topFiveLang = response.data.top_five_langs;
                        const langPercent = response.data.top_five_pct;

                        console.log('Top 5 Lang >>', topFiveLang);
                        
                        const langData = {
                            colors : ["#3572A5", "#DA5B0B", "#2C3E50", "#F1E05A", "#F18E33" ],
                            langs : [
                                { x: topFiveLang[0], y: langPercent[0] },
                                { x: topFiveLang[1], y: langPercent[1] },
                                { x: topFiveLang[2], y: langPercent[2] },
                                { x: topFiveLang[3], y: langPercent[3] },
                                { x: topFiveLang[4], y: langPercent[4] }
                            ]
                        }

                        var langList = []
                        
                        for(let i=0;i<langData.langs.length; i++){
                            let color=langData.colors[i]
                            langList.push(<li key={i}><div className="chart-lang-box" style={{backgroundColor:color}}></div><div className="chart-lang-str">{langData.langs[i].x}</div></li>)
                        }

                        switchLangDataHandler(langData);
                    }
                },
                (error) => {console.log(error)}
            );
        }
        getTopFiveLangData();
        console.log('langDatas', langDatas);
    }, [])

    return (
        <main>
            <Slide direction="right" in={props.viewCommit}>
            <div id="main-container2">
                <div className="header2">
                    <div className="title title2">
                        Commit
                    </div>
                </div>
                <div className="subdiv2">
                    <div className="title-commit-sub">{props.myName}'s Top 5 Commits</div>
                    <div id="chart-container">
                        <div id="chart-pie">
                            <VictoryPie
                                startAngle={-90}
                                endAngle={270}
                                colorScale={langDatas.colors}
                                data={langDatas.langs}
                                labels={({ l }) => ""}
                            />
                        </div>
                        <div id="chart-pie-description">
                            <ul>{langList}</ul>
                        </div>
                    </div>
                </div>
                <div className="subdiv2">
                    <div className="title-commit-sub">{props.friendName} Commit More</div>
                    <div className="carousel-container">
                        <SimpleSlider/>
                    </div>
                </div>
            </div>
            </Slide>
        </main>
    )

}

export default Commit;