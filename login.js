import React,{useState} from "react";
import axios from "axios";

export default function Login(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const handleLogin = async()=>{

try{

const res = await axios.post("http://localhost:5000/login",{
email,
password
});

localStorage.setItem("token",res.data.token);

alert("Login Successful");

window.location.href="/phisdetect";

}

catch{

alert("Invalid Login");

}

};

return(

<div style={styles.container}>

<div style={styles.card}>

<h2 style={styles.title}>CyberShield AI Login</h2>

<p style={styles.subtitle}>
Secure Access to Women Cyber Safety Platform
</p>

<input
style={styles.input}
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
style={styles.input}
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button style={styles.button} onClick={handleLogin}>
Login
</button>

</div>

</div>

);

}


const styles={

container:{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
fontFamily:"Segoe UI"
},

card:{
width:"350px",
background:"white",
padding:"40px",
borderRadius:"12px",
boxShadow:"0px 15px 40px rgba(0,0,0,0.3)",
textAlign:"center"
},

title:{
marginBottom:"5px",
color:"#1e3a8a",
fontWeight:"600"
},

subtitle:{
fontSize:"14px",
marginBottom:"25px",
color:"#555"
},

input:{
width:"100%",
padding:"12px",
marginBottom:"15px",
borderRadius:"6px",
border:"1px solid #ccc",
fontSize:"14px"
},

button:{
width:"100%",
padding:"12px",
border:"none",
borderRadius:"6px",
background:"#2563eb",
color:"white",
fontSize:"16px",
cursor:"pointer",
transition:"0.3s"
}

};