import Footer from "./component/footer"
import Home from "./Home"
import Compare from "./Compare"
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
      {viewHome? <Home myName={myName} friendName={friendName} setMyName={setMyName} setFriendName={setFriendName} setHome={setHome} setCompare={setCompare} /> : null}
      {viewCompare? <Compare myName={myName} friendName={friendName}/> : null}
      <Footer/>
    </div>
  );
}

export default App;
