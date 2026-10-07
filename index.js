import React from "react";
import { useRouter } from "next/router";

export default function Home() {

  const router = useRouter();

  return (

    <div style={styles.container}>

      {/* Overlay */}

      <div style={styles.overlay}>

        <h1 style={styles.title}>
          CyberShield AI
        </h1>

        <p style={styles.subtitle}>
          AI Powered Women Cyber Safety Platform
        </p>

        <div style={styles.buttonContainer}>

          <button
            style={styles.loginBtn}
            onClick={() => router.push("/login")}
          >
            Login
          </button>

          <button
            style={styles.signupBtn}
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </button>

        </div>
      </div>
    </div>
  );
}


const styles = {

  container:{
    height:"100vh",
    width:"100%",
    backgroundImage:"url('/back.png')",
    backgroundSize:"cover",
    backgroundPosition:"center",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    fontFamily:"Segoe UI"
  },

  overlay:{
    height:"100%",
    width:"100%",
    background:"rgba(0,0,0,0.65)",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center",
    color:"white"
  },

  title:{
    fontSize:"60px",
    fontWeight:"700",
    letterSpacing:"2px",
    marginBottom:"10px"
  },

  subtitle:{
    fontSize:"22px",
    marginBottom:"40px",
    opacity:"0.9"
  },

  buttonContainer:{
    display:"flex",
    gap:"25px"
  },

  loginBtn:{
    padding:"14px 35px",
    fontSize:"18px",
    border:"none",
    borderRadius:"8px",
    background:"#2563eb",
    color:"white",
    cursor:"pointer",
    transition:"0.3s"
  },

  signupBtn:{
    padding:"14px 35px",
    fontSize:"18px",
    border:"none",
    borderRadius:"8px",
    background:"#22c55e",
    color:"white",
    cursor:"pointer",
    transition:"0.3s"
  }

};