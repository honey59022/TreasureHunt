import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function HomeScreen(props) {
  const navigate = new useNavigate();
  const [level, setLevel] = React.useState("easy");

  React.useEffect(() => {
    if (!props.name || props.name == "" || props.role != "user") navigate("/");

  }, []);
// window.location.reload(false); window.localStorage.setItem("cred", "{}");
  return (
    <div style={{ height: "100%", width: "100%", display: "flex", background: "#f6f7f9", flexDirection: "column", alignItems: "center", gap: "4rem" }}>
      <h1 style={{ height: "10%", margin: 0, width: "100%", display: "flex", background: "#ffffff", alignItems: "center", justifyContent: "space-evenly" }}>
        Hello {props.name}
        <button onClick={() => { window.localStorage.setItem("cred", "{}"); navigate("/");}}>Logout</button>
      </h1>
      <div style={{ height: "30%", width: "50%", display: "flex", background: "#ffffff", flexDirection: "column", alignItems: "center", justifyContent: "space-around", borderRadius: "2px", boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)" }}>
        <select onChange={(e) => { setLevel(e.target.value); props.setLevel(e.target.value); props.localStorageSet({ level:e.target.value });}}  style={{ height: "20%", width: "30%", textAlign: "center", outline: "none", background: "#ffffff", borderRadius: "2px", boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)" }}>
          <option value={"easy"}>easy</option>
          <option value={"medium"}>medium</option>
          <option value={"hard"}>hard</option>
        </select>

        <button onClick={() => navigate("/dashboard")}>Start</button>
      </div>
    </div>
  )
}