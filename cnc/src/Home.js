import logoSimple from './logoSimple.svg';
import React, { Component } from 'react';
import { myToast } from "./component/swal-toast"

class Home extends Component {
    state = {
        myName : "",
        friendName : ""
    }
    render() {
        return (
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
                        <input type="text" placeholder="Your Name" id="me" onChange={
                            (e) => {
                                this.setState({myName:e.target.value})
                            }
                        } />
                        <input type="text" placeholder="Other's Name" id="friend" onChange={
                            (e) => {
                                this.setState({friendName:e.target.value})
                            }
                        }/>
                        <input type="submit" value="Let's Go!" id="submitBtn"  onClick={
                            (e) => {
                                console.log("letsgo clicked");
                                if(this.state.myName !== "" && this.state.friendName !== "") {
                                    console.log(`Let's compare ${this.state.myName} and ${this.state.friendName}`)
                                } else {
                                    myToast("warning", "Type all usernames")
                                }
                            }
                        }/>
                    </div>
                </div>
            </main>
        )
    }
}

export default Home;