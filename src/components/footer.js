import React, { Component } from "react";
import "./footer.css";
import LogoImage from "./logo-image";

class Footer extends Component {
  render() {
    return (
      <footer>
        <div id="footer-container">
          <div>
            <LogoImage dimen="4rem" isDay={this.props.isDay} />
            <p>Compare and Commit</p>
            <p>Fill your Commits</p>
            <p>Find Programming Languages for You</p>
            <p id="footer-first-div-last-p">
              ©2021 SKKU COMEDU CMD CNC. All rights reserved
            </p>
          </div>
          <div>
            <p className="footer-p-title">Contributors</p>
            <p>김서진</p>
            <p>윤세린</p>
            <p>이익규</p>
            <p>이재환</p>
          </div>
          <div>
            <p className="footer-p-title">Interests</p>
            <p>Computer Education</p>
            <p>Work Life Balance</p>
            <p>Artificial Intelligence</p>
            <p>Thinking</p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
