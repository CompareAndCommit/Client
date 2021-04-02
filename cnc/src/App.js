import Footer from "./component/footer"
import Home from "./Home"
import Compare from "./Compare"
import Commit from "./Commit"
import './App.css';
import React, {useState} from "react"

function App() {
  const [viewHome, setHome] = useState(true);
  const [viewCompare, setCompare] = useState(false);
  const [viewCommit, setCommit] = useState(false);
  const [myName, setMyName] = useState("");
  const [friendName, setFriendName] = useState("");

  return (
    <div className="App">
      {viewHome? <Home myName={myName} friendName={friendName} setMyName={setMyName} setFriendName={setFriendName} viewHome={viewHome} setHome={setHome} setCompare={setCompare} setCommit={setCommit} /> : null}
      {viewCompare? <Compare myName={myName} friendName={friendName} setHome={setHome} viewCompare={viewCompare} setCompare={setCompare} setCommit={setCommit}/> : null}
      {viewCommit? <Commit myName={myName} friendName={friendName} setHome={setHome} setCommit={setCommit} viewCommit={viewCommit}/> : null}
      <Footer/>
    </div>
  );
}

export default App;
