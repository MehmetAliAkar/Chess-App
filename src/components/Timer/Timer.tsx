import { useState, useEffect } from "react";
import "./Timer.css";
import React from "react";

function Timer() {
  let [bseconds, setbSeconds] = useState(300);
  let [wseconds, setwSeconds] = useState(300);
  //   let [minutes,setMinutes]=useState(0);
  let [iswRunning, setIswRunning] = useState(false);
  let [isbRunning, setIsbRunning] = useState(true);

  let bminutes = Math.floor(bseconds / 60);
  bseconds %= 60;

  let wminutes = Math.floor(wseconds / 60);
  wseconds %= 60;

  useEffect(() => {
    let intervalId;
    if (iswRunning) {
      intervalId = setInterval(() => {
        setbSeconds((c) => c - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [iswRunning]);

  useEffect(() => {
    let intervalId;
    if (isbRunning) {
      intervalId = setInterval(() => {
        setwSeconds((c) => c - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isbRunning]);


  const handlewClick = () => {
    setIswRunning((prevState) => !prevState);
    setIsbRunning((prevState)=>!prevState);
  };
  const bformattedMinutes = String(bminutes).padStart(2, "0");
  const bformattedSeconds = String(bseconds).padStart(2, "0");

  const wformattedMinutes = String(wminutes).padStart(2, "0");
  const wformattedSeconds = String(wseconds).padStart(2, "0");

  if (bminutes === 0 && bseconds === 0) {
      alert("Black won the game ! ");
    } else if (wminutes === 0 && wseconds === 0) {
      alert("White won the game !");
  }

  function refreshPage() {
    window.location.href = window.location.href;
  }

  return (
    <div>
      <button className="timer2" onClick={handlewClick}>
        {wformattedMinutes} : {wformattedSeconds}
      </button>
      <button className="timer" onClick={handlewClick}>
        {bformattedMinutes} : {bformattedSeconds}
      </button>
      <button onClick={refreshPage} className="button">
        {" "}
        Reset The Game
      </button>
    </div>
  );
}


export default Timer;
