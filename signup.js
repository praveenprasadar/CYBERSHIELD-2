import React,{useState} from "react";
import axios from "axios";

/* MUI Components */

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Signup(){

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const handleSignup = async()=>{

try{

await axios.post("http://localhost:5000/signup",{
name,
email,
password
});

alert("Signup Successful");

window.location.href="/phisdetect";

}

catch(err){

alert(err.message);

}

};

return(

<Box
sx={{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"linear-gradient(135deg,#1e3c72,#2a5298)"
}}
>

<Paper
elevation={6}
sx={{
padding:"40px",
width:"350px",
textAlign:"center",
borderRadius:"12px"
}}
>

<Typography variant="h5" sx={{mb:3}}>
Cyber Safety Signup
</Typography>

<TextField
label="Name"
variant="outlined"
fullWidth
sx={{mb:2}}
onChange={(e)=>setName(e.target.value)}
/>

<TextField
label="Email"
variant="outlined"
fullWidth
sx={{mb:2}}
onChange={(e)=>setEmail(e.target.value)}
/>

<TextField
label="Password"
type="password"
variant="outlined"
fullWidth
sx={{mb:3}}
onChange={(e)=>setPassword(e.target.value)}
/>

<Button
variant="contained"
fullWidth
onClick={handleSignup}
>
Signup
</Button>

</Paper>

</Box>

);

}