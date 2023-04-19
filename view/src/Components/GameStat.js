import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function GameStat({ userName, level, timeTaken, hintUsed, isWon, role }) {
  const navigate = new useNavigate();

  React.useEffect(() => {
    if (!userName || userName == "" || role != "user") navigate("/");
  })

  return (
    <div style={{ height: "100%", width: "100%", display: "flex", background: "#f6f7f9", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
      <div style={{ height: "10%", width: "90%", background: "#ffffff", borderRadius: "10px", boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <h1> Game Stat</h1>
      </div>
      <div style={{ height: "80%", width: "90%", background: "#ffffff", borderRadius: "10px", boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
        <Box name={"Level"} value={level} />
        <Box name={"Time Taken"} value={timeTaken} />
        <Box name={"Hint Used"} value={hintUsed} />
        <Box name={"Is Won"} value={isWon} />
        <br />
        <br />
        <button onClick={() => navigate("/home")}>HomeScreen</button>
      </div>
    </div>
  )
}



function Box({ name, value }) {
  return (
    <div style={{ height: "10%", width: "40%", background: "#ffffff", borderRadius: "10px", boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", display: "flex", alignItems: "center", justifyContent: "center", gap: "3rem" }}>
      <h3 style={{ width: "30%", background: "", display: "flex", alignItems: "center", justifyContent: "center" }}>{name}</h3>
      <h3 style={{ width: "30%", background: "", display: "flex", alignItems: "center", justifyContent: "center" }}>:</h3>
      <h3 style={{ width: "30%", background: "", display: "flex", alignItems: "center", justifyContent: "center" }}> {value}</h3>
    </div>
  )
}
