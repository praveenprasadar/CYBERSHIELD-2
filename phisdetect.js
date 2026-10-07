import React, { useState } from "react";
import axios from "axios";

/* MUI Imports */
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

function PhishingChecker() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("");
  const [result, setResult] = useState(null);

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (value) => {
    setOpenDrawer(value);
  };

  /* OCR IMAGE STATE */
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const checkImage = async () => {
    if (!image) {
      alert("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/analyze-image",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Server error while analyzing screenshot");
    }
  };

  const checkPhishing = async () => {
    try {
      const response = await axios.post("http://localhost:5000/analyze", {
        url: url,
      });

      setResult(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Server error while analyzing URL");
    }
  };

  const checkMessage = async () => {
    try {
      const response = await axios.post("http://localhost:5000/analyze-message", {
        message: message,
        sender: sender,
      });

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Server error while analyzing message");
    }
  };

  /* Drawer Menu - Styled for Dark Mode */
  const drawerList = (
    <Box
      sx={{
        width: 260,
        height: "100%",
        background: "#0f172a", // Deep dark background
        color: "#e2e8f0",
        paddingTop: 2,
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => (window.location.href = "/")}
            sx={{ "&:hover": { background: "rgba(255,255,255,0.05)" } }}
          >
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => (window.location.href = "/phisdetect")}
            sx={{ "&:hover": { background: "rgba(255,255,255,0.05)" } }}
          >
            <ListItemText primary="Phishing Detector" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => (window.location.href = "/safesuggestions")}
            sx={{ "&:hover": { background: "rgba(255,255,255,0.05)" } }}
          >
            <ListItemText primary="Smart Safety Suggestions" />
          </ListItemButton>
        </ListItem>
         <ListItem disablePadding>
          <ListItemButton
            onClick={() => (window.location.href = "/AskAI")}
            sx={{ "&:hover": { background: "rgba(255,255,255,0.05)" } }}
          >
            <ListItemText primary="ASK AI" />
          </ListItemButton>
        </ListItem>
         <ListItem disablePadding>
          <ListItemButton
            onClick={() => (window.location.href = "/complaint")}
            sx={{ "&:hover": { background: "rgba(255,255,255,0.05)" } }}
          >
            <ListItemText primary="report" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  /* Reusable Input Styles for Glassmorphism */
  const inputStyles = {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    marginBottom: "15px",
    background: "rgba(0, 0, 0, 0.25)",
    color: "#ffffff",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border 0.3s ease",
  };

  return (
    <div>
      {/* Drawer Button - Glass styled */}
      <Button
        variant="outlined"
        onClick={() => toggleDrawer(true)}
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "#fff",
          borderColor: "rgba(255, 255, 255, 0.2)",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          "&:hover": {
            background: "rgba(255, 255, 255, 0.1)",
            borderColor: "rgba(255, 255, 255, 0.4)",
          },
        }}
      >
        Menu
      </Button>

      {/* Drawer */}
      <Drawer
        open={openDrawer}
        onClose={() => toggleDrawer(false)}
        PaperProps={{
          sx: {
            background: "transparent",
            boxShadow: "none",
          },
        }}
      >
        {drawerList}
      </Drawer>

      {/* Main UI - Dark Mesh/Gradient Background */}
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #09090b 0%, #161b22 50%, #0d1117 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Segoe UI, sans-serif",
          padding: 3,
          color: "#f8fafc",
        }}
      >
        {/* Glassmorphism Card */}
        <Box
          sx={{
            width: 480,
            background: "rgba(30, 41, 59, 0.4)", // Semi-transparent dark
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <h2
            style={{
              marginBottom: "30px",
              color: "#60a5fa", // Lighter futuristic blue
              textAlign: "center",
              fontWeight: 600,
              letterSpacing: "1px",
            }}
          >
            AI Phishing Detection
          </h2>

          {/* URL Detection */}
          <h4 style={{ marginBottom: "10px", color: "#cbd5e1", fontWeight: 500 }}>
            Check URL
          </h4>
          <input
            type="text"
            placeholder="Enter URL to analyze"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={inputStyles}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={checkPhishing}
            sx={{
              mb: 4,
              background: "rgba(37, 99, 235, 0.8)",
              backdropFilter: "blur(5px)",
              "&:hover": { background: "rgba(37, 99, 235, 1)" },
              borderRadius: "8px",
              padding: "10px",
              textTransform: "none",
              fontSize: "16px",
            }}
          >
            Analyze URL
          </Button>

          {/* Message Detection */}
          <h4 style={{ marginBottom: "10px", color: "#cbd5e1", fontWeight: 500 }}>
            Check Message / Email
          </h4>
          <input
            type="text"
            placeholder="Sender Email"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            style={inputStyles}
          />
          <textarea
            placeholder="Paste suspicious message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              ...inputStyles,
              height: "90px",
              resize: "none",
            }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={checkMessage}
            sx={{
              mb: 4,
              background: "rgba(22, 163, 74, 0.8)",
              backdropFilter: "blur(5px)",
              "&:hover": { background: "rgba(22, 163, 74, 1)" },
              borderRadius: "8px",
              padding: "10px",
              textTransform: "none",
              fontSize: "16px",
            }}
          >
            Analyze Message
          </Button>

          {/* OCR */}
          <h4 style={{ marginBottom: "10px", color: "#cbd5e1", fontWeight: 500 }}>
            Scan Screenshot (OCR)
          </h4>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{
              ...inputStyles,
              padding: "9px",
              color: "#94a3b8",
            }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={checkImage}
            sx={{
              background: "rgba(245, 158, 11, 0.8)",
              backdropFilter: "blur(5px)",
              "&:hover": { background: "rgba(245, 158, 11, 1)" },
              borderRadius: "8px",
              padding: "10px",
              textTransform: "none",
              fontSize: "16px",
            }}
          >
            Analyze Screenshot
          </Button>

          {/* RESULT - Glassy Success/Error Boxes */}
          {result && (
            <Box
              sx={{
                marginTop: "30px",
                padding: "20px",
                borderRadius: "16px",
                backdropFilter: "blur(12px)",
                background:
                  result.prediction === 1
                    ? "rgba(239, 68, 68, 0.15)" // Translucent red
                    : "rgba(34, 197, 94, 0.15)", // Translucent green
                border:
                  result.prediction === 1
                    ? "1px solid rgba(239, 68, 68, 0.4)"
                    : "1px solid rgba(34, 197, 94, 0.4)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                  color: result.prediction === 1 ? "#fca5a5" : "#86efac",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {result.prediction === 1 ? "🚨 Phishing Detected" : "✅ Safe"}
              </h3>

              <p style={{ margin: "8px 0", color: "#f1f5f9" }}>
                <b style={{ color: "#94a3b8" }}>Risk Level:</b>{" "}
                {result.risk_level || "Unknown"}
              </p>

              {result.scam_type && (
                <p style={{ margin: "8px 0", color: "#f1f5f9" }}>
                  <b style={{ color: "#94a3b8" }}>Scam Type:</b> {result.scam_type}
                </p>
              )}

              {result.confidence_score && (
                <p style={{ margin: "8px 0", color: "#f1f5f9" }}>
                  <b style={{ color: "#94a3b8" }}>Confidence:</b>{" "}
                  {(result.confidence_score * 100).toFixed(0)}%
                </p>
              )}

              {result.extracted_url && (
                <p style={{ margin: "8px 0", wordBreak: "break-all", color: "#f1f5f9" }}>
                  <b style={{ color: "#94a3b8" }}>Extracted URL:</b>{" "}
                  {result.extracted_url}
                </p>
              )}

              {result.reasons && result.reasons.length > 0 && (
                <div style={{ marginTop: "15px" }}>
                  <b style={{ color: "#94a3b8" }}>Explainable AI Reasons:</b>
                  <ul style={{ color: "#f1f5f9", paddingLeft: "20px", margin: "10px 0" }}>
                    {result.reasons.map((reason, index) => (
                      <li key={index} style={{ marginBottom: "5px" }}>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Warning Tags - Adjusted colors for dark mode visibility */}
              {result.women_targeted_scam && (
                <p style={{ color: "#fbbf24", fontWeight: 500, margin: "8px 0" }}>
                  ⚠ Women Targeted Scam Detected
                </p>
              )}

              {result.personal_data_risk && (
                <p style={{ color: "#f87171", fontWeight: 500, margin: "8px 0" }}>
                  ⚠ Personal Data Exposure Risk
                </p>
              )}

              {result.harassment_risk && (
                <p style={{ color: "#ef4444", fontWeight: 500, margin: "8px 0" }}>
                  🚨 Harassment Risk Detected
                </p>
              )}

              {result.psychological_manipulation && (
                <p style={{ color: "#fb923c", fontWeight: 500, margin: "8px 0" }}>
                  ⚠ Psychological Manipulation Detected
                </p>
              )}

              {result.stalker_pattern && (
                <p style={{ color: "#ef4444", fontWeight: 500, margin: "8px 0" }}>
                  🚨 Stalker Behaviour Pattern Detected
                </p>
              )}

              {/* Safety Suggestion Box - Glassy Orange */}
              {result.safety_suggestion && (
                <Box
                  sx={{
                    marginTop: "20px",
                    padding: "16px",
                    background: "rgba(245, 158, 11, 0.1)", // Translucent amber
                    border: "1px solid rgba(245, 158, 11, 0.4)",
                    borderRadius: "10px",
                  }}
                >
                  <b style={{ color: "#fbbf24", display: "block", marginBottom: "8px" }}>
                    🛡 Emergency Safety Suggestion:
                  </b>
                  <p style={{ margin: 0, color: "#f8fafc", lineHeight: "1.5" }}>
                    {result.safety_suggestion}
                  </p>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default PhishingChecker;