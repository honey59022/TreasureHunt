import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utility';

export default function Admin({ userName, jwt, role }) {
  const [userArr, setUserArr] = React.useState([]);
  const navigate = new useNavigate();

  React.useEffect(() => {
    if (!userName || userName == "" || !jwt || jwt == "" || role != "admin") navigate("/");
    else {
      axios.post(`${BASE_URL}/user/getAllUserStat`, {
        userName: userName,
        jwToken: jwt,
        credentials: "same-origin",
        headers: {
          "accept ": "application/json",
          withCredentials: true,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then(function (res) {
          console.log(res);
          if (res.data.message == "Admin Logined") {
            const arr = res.data.data;
            arr.sort((a, b) => {
              const p1 = parseInt(a.percent);
              const p2 = parseInt(b.percent);

              return p2 - p1;
            })
            console.log(arr);
            setUserArr(arr);
          }
          else {
            setTimeout(() => navigate("/"), 1300);
          }
        })
        .catch(function (err) {
          console.log(err.message);
          alert("Error in Login");
          setTimeout(() => navigate("/"), 1300);
        });

    }

  }, [])
  return (
    <div style={{ height: "100%", width: "100%", display: "flex", background: "#f6f7f9", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
      <h1 style={{ height: "10%", margin: 0, width: "100%", display: "flex", background: "#ffffff", alignItems: "center", justifyContent: "space-evenly" }}>
        Admin Panel
        <button onClick={() => {window.localStorage.setItem("cred", "{}"); navigate("/");}}>Logout</button>
      </h1>
      <div style={{ height: "83%", margin: 0, width: "100%", overflow: "auto", display: "flex", flexDirection: "column", alignItems: "center"}}>
        <div style={{height:"90%",width:"50%",overflow:"auto"}} className='example'>
          {
            userArr.map((obj, idx) => {
              return <Box rank={idx} key={idx} totalPlayed={obj.totalPlayed} totalWon={obj.totalWon} percent={obj.percent} userName={obj.userName} />
            })
          }

        </div>
      </div>
    </div>
  )
}


function Box({ rank, totalPlayed, totalWon, percent, userName }) {
  return (
    <div style={{ height: "100px", width: "99.7%",marginBottom:"1rem", background: "#ffffff", borderRadius: "6px", boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", display: "flex", alignItems: "center", justifyContent: "center", justifyContent: "space-between" }}>
      <h3 style={{ height: "100%", width: "10%", background: "", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", margin: 0 }}>Rank {rank + 1}</h3>
      <h3 style={{ height: "100%", width: "10%", background: "", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", margin: 0 }}>{userName}</h3>
      <div style={{ height: "100%", width: "25%", background: "", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: "0.9rem" }}>Total Match Played {totalPlayed}</div>
      <div style={{ height: "100%", width: "25%", background: "", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: "0.9rem" }}>Total Match Won  {totalWon}</div>
      <div style={{ height: "100%", width: "25%", background: "", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: "0.9rem" }}>Percent {percent}</div>
    </div>
  )
}