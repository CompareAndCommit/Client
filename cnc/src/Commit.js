import logoSimple from './logoSimple.svg';
import React, { Component } from 'react';
import Home from "./Home"
import { myToast } from "./component/swal-toast"

class Commit extends Component {
    state = {
        myName : "",
        friendName : ""
    }
    render() {
        return (
            <main>
                <div className="header2">
                    <div className="title">
                        Compare
                    </div>
                </div>
                <div className="versus">
                    <div className="me"></div>
                    <div className="vs">
                        <div className="v">V</div>
                            <div className="s">S</div>
                        </div>
                    </div>
                    <div className="friend"></div>
                    <div className="Compare">
                        
                    </div>
            </main>
        )
    }
}

export default Commit;