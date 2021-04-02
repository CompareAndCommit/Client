import React from 'react';
import { VictoryPie } from 'victory';
import Slide from '@material-ui/core/Slide';
import SimpleSlider from "./slider"
import './Commit.css'
import './Compare.css'

function Commit(props) {

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
        langDescriptionList.push(<li key={i}><div className="chart-lang-box" style={{backgroundColor:color}}></div><div className="chart-lang-str">{languageDatas.langs[i].x}</div></li>)
    }

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