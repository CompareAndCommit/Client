import Footer from "./components/footer";
import Home from "./Home";
import Compare from "./Compare";
import Commit from "./Commit";
import Background from "./components/background-image";
import backgroundSvgDay from "./assets/Flat-Mountains-Day.svg";
import backgroundSvgNight from "./assets/Flat-Mountains-Night.svg";
import DayNightSwitcher from "./components/day-night-switcher";
import "./App.css";
import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { dayTheme, nightTheme } from "./theme/ColorTheme";
import { GlobalStyles } from "./theme/GlobalTheme";

function App() {
  const [viewHome, setHome] = useState(true);
  const [viewCompare, setCompare] = useState(false);
  const [viewCommit, setCommit] = useState(false);
  const [myName, setMyName] = useState("");
  const [friendName, setFriendName] = useState("");
  const [isDay, setIsDay] = useState(false);

  return (
    <div className="App">
      <Background img={isDay ? backgroundSvgDay : backgroundSvgNight} />
      <DayNightSwitcher setIsDay={setIsDay} />
      {viewHome ? (
        <Home
          myName={myName}
          friendName={friendName}
          setMyName={setMyName}
          setFriendName={setFriendName}
          viewHome={viewHome}
          setHome={setHome}
          setCompare={setCompare}
          setCommit={setCommit}
          isDay={isDay}
        />
      ) : null}
      {viewCompare ? (
        <Compare
          myName={myName}
          friendName={friendName}
          setHome={setHome}
          viewCompare={viewCompare}
          setCompare={setCompare}
          setCommit={setCommit}
        />
      ) : null}
      {viewCommit ? (
        <Commit
          myName={myName}
          friendName={friendName}
          setHome={setHome}
          setCommit={setCommit}
          viewCommit={viewCommit}
        />
      ) : null}
      <Footer isDay={isDay} />
      <ThemeProvider theme={isDay ? dayTheme : nightTheme}>
        <>
          <GlobalStyles></GlobalStyles>
        </>
      </ThemeProvider>
    </div>
  );
}

export default App;
