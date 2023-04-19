import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import HomeScreen from './Components/HomeScreen';
import GameDashboard from './Components/GameDashboard';
import GameStat from './Components/GameStat';
import Admin from './Components/Admin';





function App() {
  const [level, setLevel] = React.useState("easy");
  const [userName, setUserName] = React.useState("");
  const [name, setName] = React.useState("");
  const [jwt, setJWT] = React.useState("");

  const [timeTaken, setTimeTaken] = React.useState(0);
  const [hintUsed, setHintUsed] = React.useState(0);
  const [isWon, setIsWon] = React.useState("false");

  const[role,setRole]=React.useState("user");


  function localStorageSet(obj) {
    if (!obj.level) obj.level = level;
    if (!obj.userName) obj.userName = userName;
    if (!obj.name) obj.name = name;
    if (!obj.jwt) obj.jwt = jwt;
    if (!obj.timeTaken) obj.timeTaken = timeTaken;
    if (!obj.hintUsed) obj.hintUsed = hintUsed;
    if (!obj.isWon) obj.isWon = isWon;
    if (!obj.role) obj.role = role;
    


    const ans = { level: obj.level, userName: obj.userName, name: obj.name, jwt: obj.jwt, timeTaken: obj.timeTaken, hintUsed: obj.hintUsed, isWon: obj.isWon ,role:obj.role};

    window.localStorage.setItem("cred", JSON.stringify(ans));
  }

  React.useState(() => {
    const obj = JSON.parse(window.localStorage.getItem("cred"));
    if (obj) {
      setLevel(obj.level);
      setUserName(obj.userName);
      setName(obj.name);
      setJWT(obj.jwt);
      setTimeTaken(obj.timeTaken);
      setHintUsed(obj.hintUsed);
      setIsWon(obj.isWon);
      setRole(obj.role);
    }
  }, [])


  return (
    <Routes>
      <Route path="/" element={<Login setUserName={setUserName} setName={setName} setJWT={setJWT} localStorageSet={localStorageSet} setRole={setRole}/>} />
      <Route path="/register" element={<Signup />} />
      <Route path="/home" element={<HomeScreen name={name} setLevel={setLevel} localStorageSet={localStorageSet} role={role}/>} />
      <Route path="/dashboard" element={<GameDashboard level={level} name={name} userName={userName} jwt={jwt} setTimeTaken={setTimeTaken} setHintUsed={setHintUsed} setIsWon={setIsWon} localStorageSet={localStorageSet} role={role}/>} />
      <Route path="/end" element={<GameStat userName={userName} level={level} timeTaken={timeTaken} hintUsed={hintUsed} isWon={isWon} role={role}/>} />
      <Route path="/admin" element={<Admin userName={userName} jwt={jwt} role={role}/>} />
    </Routes>
  );
}

export default App;
