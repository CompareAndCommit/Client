import logoSimple from './logoSimple.svg';
import logoTransparent from './logoTransparent.svg';
import './App.css';

function App() {
  return (
    <div className="App">

      <img src={ logoSimple } className="simpleLogo" />
      <header className="title">
        Compare and Commit
      </header>
    
      <div className="submit">
        <svg className="star" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.0654 0.59375L15.2847 8.991L23.9846 12.0983L15.2847 15.2055L12.0654 23.6028L8.84612 15.2055L0.146179 12.0983L8.84612 8.991L12.0654 0.59375Z" fill="#0EB633"/>
        </svg>

          <div className="submitTitle">Input Usernames</div>
          <hr width="60rem" color="black" size="1" align="left" />
          <input type="text" placeholder="Your Name" id="me" />
          <input type="text" placeholder="Other's Name" id="friend" />
          <input type="submit" value="Let's Go" id="submitBtn" />
      </div>

      <footer>
        footer
      </footer>
      
    </div>
  );
}

export default App;
