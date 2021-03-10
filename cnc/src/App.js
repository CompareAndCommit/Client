import logoSimple from './logoSimple.svg';
import logoTransparent from './logoTransparent.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <main>
        <div id="main-container">
          <div className="header">
            <img src={ logoSimple } className="simpleLogo" />
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
            <input type="text" placeholder="Your Name" id="me" />
            <input type="text" placeholder="Other's Name" id="friend" />
            <input type="submit" value="Let's Go!" id="submitBtn" />
          </div>
        </div>
      </main>

      <footer>
        <div id="footer-container">
          <div>
            <img id="footer-logo" src={ logoTransparent } alt="CNC Logo"/>
            <p>Compare and Commit</p>
            <p>Fill your Commits</p>
            <p>Find Programming Languages for You</p>
            <p id="footer-first-div-last-p">©2021 SKKU COMEDU CMD CNC. All rights reserved</p>
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
          </div>
        </div>
      </footer>
      
    </div>
  );
}

export default App;
