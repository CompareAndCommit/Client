import logoSimple from './logoSimple.svg';
import React, { Component } from 'react';
import Fade from "@material-ui/core/Fade";
import { myToast } from "./component/swal-toast";
import "./Home.css";

class Home extends Component {
    render() {
        return (
            <Fade in={this.props.viewHome}>
            <main>
                <div id="main-container">
                    <div className="header">
                        <img src={ logoSimple } className="simpleLogo" alt="CNC Logo"/>
                        <div className="title">
                            Compare and <br/> Commit
                        </div>
                    </div>
                    <div className="submit">
                        <svg className="star" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0654 0.59375L15.2847 8.991L23.9846 12.0983L15.2847 15.2055L12.0654 23.6028L8.84612 15.2055L0.146179 12.0983L8.84612 8.991L12.0654 0.59375Z" fill="#0EB633"/>
                        </svg>
                        <div className="submitTitle">Input Usernames</div>
                        <hr width="60rem" color="black" size="1" align="left" />
                        <input type="text" placeholder="Your Name" id="me" onChange={e => {this.props.setMyName(e.target.value)}} />
                        <input type="text" placeholder="Other's Name" id="friend" onChange={e => {this.props.setFriendName(e.target.value)}}/>
                        <input type="submit" value="Let's Go!" id="submitBtn"  onClick={
                            (e) => {
                                console.log("letsgo clicked");
                                if(this.props.myName === this.props.friendName) {
                                    myToast("warning", "Type different user")
                                } else if(this.props.myName !== "" && this.props.friendName !== "") {
                                    console.log(`Let's compare ${this.props.myName} and ${this.props.friendName}`)
                                    this.props.setHome(false)
                                    this.props.setCompare(true)
                                } else {
                                    myToast("warning", "Type all usernames")
                                }
                            }
                        }/>
                    </div>
                </div>
            </main>
            </Fade>
        )
    }
}

export default Home;