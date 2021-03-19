import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Compare(props) {
    const [value, onChange] = useState(new Date());

    return (
        <main>
                <div id="main-container2">
                    <div className="header2">
                        <div className="title">
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
                        <div className="calendar">
                        <Calendar
                            onChange = { onChange }
                            value = { value }
                        />
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