import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utility';


const vis = {}
let hintBox = {};

function Box({ value, endGame, idx, setGold, boxNo }) {
  const [opacity, setOpacity] = React.useState(0);
  const [bgColor, setBgColor] = React.useState("#ffffff");



  const handleBoxClick = (e) => {

    setOpacity(1);
    const bgcolor = (value == -1) ? "red" : (value == 0) ? "lightgray" : "#ffd700";
    setBgColor(bgcolor)
    if (value == -1) endGame();
    else if (value == 1 && !vis[boxNo]) {
      vis[boxNo] = true;
      delete hintBox[boxNo];
      setGold((prevGold) => (prevGold + 1))

    }
  }

  if (value == 1 && !vis[boxNo]) {
    hintBox[boxNo] = handleBoxClick;
  }


  return (
    <div id={`col${idx}`} style={{ height: "100%", width: "9%", background: `${bgColor}`, borderRadius: "2px", boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }} onClick={handleBoxClick}>
      <h1 style={{ opacity: opacity }}>{value}</h1>
    </div>
  );
}


function Board({ endGame, level, setGold }) {
  const arr = [];
  for (let i = 0; i < 10; i++) arr.push([]);

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const boxNo = i * 10 + j;

      if (level == 'easy') {
        if (i == j) arr[i][j] = 1;
        else if (boxNo % 3 == 0) arr[i][j] = 0;
        else arr[i][j] = -1;
      }
      else if (level == 'medium') {
        if (boxNo % 7 == 0) arr[i][j] = 1;
        else if (boxNo % 3 == 0) arr[i][j] = 0;
        else arr[i][j] = -1;
      }
      else {

        if (boxNo % 2 == 0) arr[i][j] = -1;
        else if (boxNo % 3 == 0) arr[i][j] = 0;
        else arr[i][j] = 1;
      }
    }
  }

  return (
    <div id="board" style={{ height: "85%", width: "85%", display: "flex", flexDirection: "column", justifyContent: "space-evenly", background: "#DC143C" }}>
      {
        arr.map((a, ridx) => (
          <div id={`row${ridx}`} key={ridx} style={{ height: "9%", width: "100%", display: "flex", background: "", justifyContent: "space-evenly" }}>
            {
              a.map((ele, cidx) => (
                <Box endGame={endGame} key={cidx} idx={cidx} value={ele} setGold={setGold} boxNo={(ridx * 10 + cidx)} />
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default function GameDashboard({ userName, name,level ,jwt,setTimeTaken,setHintUsed,setIsWon,localStorageSet,role}) {
  const navigate = useNavigate();
  React.useEffect(()=>{
    if(!userName || userName=="" || role!="user")navigate("/");

  },[]);

  const [time, setTime] = React.useState(0);
  const [target] = React.useState(((level == 'easy') ? 10 : (level == 'medium') ? 15 : 33));
  const [hint, setHint] = React.useState(5);
  const [gold, setGold] = React.useState(0);

  const id = React.useRef();

  React.useEffect(() => {

    id.current = window.setInterval(() => setTime((prevTime) => prevTime + 1), 1000 * 60);

    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);


  const endGame = async () => {
    // send save stat request


    window.clearInterval(id.current);
    
    
    axios.post(`${BASE_URL}/user/saveStat`, {
      userName: userName,
      gameStat: {
        level: level,
        timeTake: time,
        hintUsed: (5 - hint),
        isWon: (gold != 0 && gold == target)
      },
      jwToken:jwt,
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(function (res) {
        console.log(res);
        setTimeTaken(time);
        setHintUsed(5-hint);
        setIsWon((gold != 0 && gold == target)?"true":"false");
        localStorageSet({timeTaken:time,hintUsed:(5-hint),isWon:(gold != 0 && gold == target)?"true":"false"})

        alert((gold != 0 && gold == target) ? "You Won" : "You Lose");
        setTimeout(() => navigate("/end"), 1300);
      })
      .catch(function (err) {
        console.log(err.message);
        alert("error please login again")
        setTimeout(() => navigate("/"), 1300);
      });

    console.log("request sent")
  }

  if (gold != 0 && gold == target) endGame();
  
  return (
    <div id="dashboard" style={{ height: "100%", width: "100%", display: "flex", background: "#f6f7f9", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
      <NavBar name={name} level={level} />

      <div id="content" style={{ height: "88%", width: "100%", background: "", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
        <BasicInfo time={time} target={target} hint={hint} gold={gold} />

        <div id="gameBoard" style={{ height: "88%", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div id="left" style={{ height: "100%", width: "77%", background: "", display: "flex", alignItems: "center", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ height: "100%", width: "29%", background: "", display: "flex", alignItems: "center", flexDirection: "column",alignItems:"flex-start", justifyContent: "flex-start" }}>
              <ul>
                <li><h3>1 means one gold coin collected</h3></li>
                <li><h3>0 means no gold coin collected</h3></li>
                <li><h3>-1 means you step on mine</h3></li>
              </ul>
            </div>
            <div style={{ height: "100%", width: "70%", background: "", display: "flex", alignItems: "center", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-evenly" }}>
              <Board endGame={endGame} level={level} setGold={setGold} />
              <button onClick={() => endGame()}>End Game</button>
            </div>
          </div>

          <HintBox setHint={setHint} hint={hint} hintDisplay={(level == 'easy') ? "follow diagonals" : (level == 'medium') ? "Find a Box Having Box number as a factor of 7" : "Find a Box Having Box number not a factor of 2 or 3"} />
        </div>
      </div>
    </div>
  )
}



function NavBar({ name, level }) {
  return (
    <div id="navbar" style={{ height: "10%", width: "50%", background: "#ffffff", borderRadius: "10px", boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <h1>{name} playing {level} Level</h1>
    </div>
  )
}


function BasicInfo({ time, target, hint, gold }) {
  return (
    <div id="basicInfo" style={{ height: "10%", width: "70%", background: "#ffffff", borderRadius: "10px", boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", display: "flex", alignItems: "center", justifyContent: "center", gap: "3rem" }}>
      <h1>Time   : {time} min</h1>
      <h1>Target : {target}</h1>
      <h1>Hint   : {hint}</h1>
      <h1>Gold Collected  : {gold}</h1>
    </div>
  )
}


function HintBox({ setHint, hint, hintDisplay }) {
  const [opacity, setOpacity] = React.useState(0);
  
  const displayHint = () => {
    if (hint > 0) {
      setHint((prevhint) => {
        if (hint == 1) setOpacity(1);
        return prevhint - 1;
      });
      // Object.keys(hintBox).forEach((key) => {
      //   hintBox[key]();
      // })
      const key = Object.keys(hintBox).pop();
      hintBox[key]();


    }
    else {
      alert("You have used all hints");
    }
  }
  return (
    <div id="right" style={{ height: "100%", width: "20%", background: "", display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "space-evenly" }}>
      <button onClick={() => displayHint()}>Hint</button>
      <div id="hintDisplay" style={{ height: "90%", width: "100%", background: "", opacity: opacity }}><h2>{hintDisplay}</h2></div>
    </div>
  )

}
