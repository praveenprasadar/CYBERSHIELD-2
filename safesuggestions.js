import React from "react";

function SafetySuggestions() {

  const sectionStyle = {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0px 5px 15px rgba(0,0,0,0.1)"
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#1e3c72,#2a5298)",
        padding: "40px",
        fontFamily: "Segoe UI"
      }}
    >

      <div style={{ maxWidth: "900px", margin: "auto" }}>

        <h1 style={{ color: "white", textAlign: "center", marginBottom: "30px" }}>
          Smart Safety Suggestions 🛡️
        </h1>

        {/* Personal Information */}

        <div style={sectionStyle}>
          <h3>1. Do Not Share Personal Information</h3>
          <ul>
            <li>Never share OTP, Aadhaar, PAN or bank details.</li>
            <li>Do not share your home address or phone number with strangers.</li>
            <li>Scammers often request these details to steal identity or money.</li>
          </ul>
        </div>

        {/* Suspicious Links */}

        <div style={sectionStyle}>
          <h3>2. Verify Suspicious Links Before Clicking</h3>
          <ul>
            <li>Check the website domain carefully.</li>
            <li>Avoid links with strange characters or numbers.</li>
            <li>Only trust websites using HTTPS.</li>
          </ul>
        </div>

        {/* Emotional Manipulation */}

        <div style={sectionStyle}>
          <h3>3. Beware of Emotional Manipulation</h3>
          <ul>
            <li>Scammers create urgency like "Act fast!"</li>
            <li>Messages like "Only you can help me" are red flags.</li>
            <li>Never make quick decisions under pressure.</li>
          </ul>
        </div>

        {/* Romance Scam */}

        <div style={sectionStyle}>
          <h3>4. Be Careful with Online Relationships</h3>
          <ul>
            <li>Romance scammers express love very quickly.</li>
            <li>They may ask for money or private photos.</li>
            <li>Never send money to someone you met online.</li>
          </ul>
        </div>

        {/* Social Media Safety */}

        <div style={sectionStyle}>
          <h3>5. Protect Your Social Media Accounts</h3>
          <ul>
            <li>Use strong passwords.</li>
            <li>Enable Two-Factor Authentication (2FA).</li>
            <li>Avoid accepting friend requests from unknown people.</li>
          </ul>
        </div>

        {/* Reporting */}

        <div style={sectionStyle}>
          <h3>6. Report Suspicious Messages</h3>
          <ul>
            <li>Block the sender immediately.</li>
            <li>Report the message on the platform.</li>
            <li>In India you can report cybercrime at:</li>
          </ul>

          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#2a5298", fontWeight: "bold" }}
          >
            https://cybercrime.gov.in
          </a>
        </div>

        {/* Harassment */}

        <div style={sectionStyle}>
          <h3>7. If You Feel Threatened</h3>
          <ul>
            <li>Do not respond to the attacker.</li>
            <li>Save evidence like screenshots.</li>
            <li>Block and report the account immediately.</li>
          </ul>
        </div>

        {/* Awareness */}

        <div style={sectionStyle}>
          <h3>8. Stay Alert and Educated</h3>
          <ul>
            <li>Stay informed about new online scams.</li>
            <li>Educate family and friends about cyber safety.</li>
            <li>Use security tools to detect suspicious links.</li>
          </ul>
        </div>

      </div>

    </div>
  );
}

export default SafetySuggestions;