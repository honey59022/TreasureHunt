import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utility';

function Row({ label, placeholder, type, name ,state,setState}) {
    return (
        <div style={{ height: "100%", width: "100%", display: "flex", background: "#ffffff", borderRadius: "2px", boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", alignItems: "center", justifyContent: "space-evenly" }}>
            <label style={{ height: "100%", width: "40%", display: "flex", alignItems: "center", justifyContent: "center", background: "" }}>{label}</label>
            <input type={type} name={name} placeholder={placeholder} min={1} value={state} onChange={(e)=>setState(e.target.value)} style={{ height: "50%", width: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "" }} />
        </div>
    )
}


export default function Signup() {
    const navigate=new useNavigate();

    const [userName,setUserName]=React.useState("");
    const [email,setEmail]=React.useState("");
    const [name,setName]=React.useState("");
    const [password,setPassword]=React.useState("");
    
    const handleClick = async () => {
        setUserName(userName.trim());
        setEmail(email.trim());
        setName(name.trim());
        setPassword(password.trim());

        if(userName.length==0 || email.length==0 || name.length==0 || password.length==0){
            alert(`please enter data in ${(userName.length==0)?'Username':(name.length==0)?'Name':(email.length==0)?'Email':'Password'} field`);
        }
        else{
            axios.post(`${BASE_URL}/auth/signup`, {
                userName: userName,
                email:email,
                name:name,
                password:password,
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
                .then(function (res) {
                    console.log(res);
                    alert(res.data.message);
                    setTimeout(() => navigate("/"), 1300);
                })
                .catch(function (err) {
                    console.log(err.message);
                    alert("Error in Signup");
                    setTimeout(() => navigate("/"), 1300);
                });
        }
    }
    return (
        <div style={{ height: "100%", width: "100%", display: "flex", background: "#f6f7f9", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
            <h1 style={{ height: "10%", margin: 0, width: "100%", display: "flex", background: "#ffffff", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>Signup</h1>
            <div style={{ height: "80%", width: "100%", display: "flex", background: "#ffffff", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
                <div style={{ height: "40%", width: "30%", display: "flex", background: "", flexDirection: "column", alignItems: "center", gap: "0.2rem" }}>
                    <Row label={"Username"} type={"text"} name={"userName"} placeholder={'Enter your username'} state={userName} setState={setUserName}/>
                    <Row label={"Name"} type={"text"} name={"name"} placeholder={'Enter your name'} state={name} setState={setName}/>
                    <Row label={"Email"} type={"email"} name={"email"} placeholder={'Enter your email'} state={email} setState={setEmail}/>
                    <Row label={"Password"} type={"password"} name={"password"} placeholder={'Enter your password'} state={password} setState={setPassword}/>
                </div>
                <div style={{ height: "10%", width: "100%", display: "flex", background: "", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                    <button onClick={handleClick}>SignUp</button>
                    <button onClick={()=>navigate('/')}>Login</button>

                </div>
            </div>
        </div>
    )
}
