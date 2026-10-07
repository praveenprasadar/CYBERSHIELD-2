import React, { useState } from 'react';

const EmergencyPortal = () => {
  // Logic: State management for form inputs
  const [formData, setFormData] = useState({
    category: 'Online Harassment / Stalking',
    scamText: '',
    details: '',
    evidence: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSos = () => {
    alert('SOS SENT: Your location has been dispatched to emergency services.');
  };

  const submitComplaint = () => {
    const { scamText, evidence } = formData;

    if (!scamText || !evidence) {
      alert("Please fill in the message content and sender information.");
      return;
    }

    const refID = "CS-" + Math.floor(Math.random() * 90000 + 10000);
    alert(`COMPLAINT FILED SUCCESSFULLY\n\nReference ID: ${refID}\nOur Cyber-Cell team will review this shortly.`);
    
    // Reset form
    setFormData({
      category: 'Online Harassment / Stalking',
      scamText: '',
      details: '',
      evidence: ''
    });
  };

  return (
    <>
      {/* Embedded CSS Styles */}
      <style>{`
        :root {
          --glass: rgba(255, 255, 255, 0.05);
          --glass-border: rgba(255, 255, 255, 0.1);
          --accent: #4fc3f7;
          --error: #ff5252;
          --success: #00e676;
          --text-main: #ffffff;
          --text-dim: #b0bec5;
          --bg-dark: #0f172a;
        }

        .portal-wrapper {
          font-family: 'Inter', sans-serif;
          background: radial-gradient(circle at top right, #1e293b, #0f172a);
          color: var(--text-main);
          margin: 0;
          padding: 40px 15px;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .container {
          max-width: 600px;
          width: 100%;
          background: var(--glass);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border-radius: 28px;
          border: 1px solid var(--glass-border);
          padding: 40px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .header { text-align: center; margin-bottom: 30px; }
        
        .header h2 { 
          font-size: 28px; 
          background: linear-gradient(to right, #fff, var(--error)); 
          -webkit-background-clip: text; 
          -webkit-text-fill-color: transparent; 
          margin: 0; 
        }

        .sos-section { 
          text-align: center; 
          padding: 20px 0; 
          border-bottom: 1px solid var(--glass-border); 
          margin-bottom: 30px; 
        }

        .sos-btn { 
          width: 100px; height: 100px; border-radius: 50%; 
          background: var(--error); color: white; border: none; 
          font-weight: 800; cursor: pointer; transition: 0.3s;
          box-shadow: 0 0 20px rgba(255, 82, 82, 0.3);
        }

        .sos-btn:hover { transform: scale(1.05); box-shadow: 0 0 30px var(--error); }

        .form-group { margin-bottom: 20px; text-align: left; }
        
        label { 
          display: block; 
          margin-bottom: 8px; 
          font-size: 14px; 
          color: var(--accent); 
          font-weight: 600; 
        }

        input, textarea, select {
          width: 100%; 
          padding: 12px 15px; 
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--glass-border); 
          border-radius: 10px; 
          color: white; 
          font-size: 14px; 
          box-sizing: border-box;
        }

        input:focus, textarea:focus { 
          outline: none; 
          border-color: var(--accent); 
          background: rgba(255, 255, 255, 0.05); 
        }

        select option {
          background: var(--bg-dark);
          color: white;
        }

        .submit-btn {
          width: 100%; padding: 15px; background: var(--success); color: #0f172a;
          border: none; border-radius: 12px; font-weight: 700; cursor: pointer; 
          font-size: 16px; margin-top: 10px; transition: 0.3s;
        }

        .submit-btn:hover { background: #69f0ae; transform: translateY(-2px); }

        .back-link { 
          display: block; 
          text-align: center; 
          margin-top: 25px; 
          color: var(--text-dim); 
          text-decoration: none; 
          font-size: 14px; 
        }
      `}</style>

      <div className="portal-wrapper">
        <div className="container">
          <div className="header">
            <h2>Emergency Portal</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '14px' }}>Direct Incident Reporting Line</p>
          </div>

          <div className="sos-section">
            <button className="sos-btn" onClick={handleSos}>SOS</button>
            <p style={{ marginTop: '15px', fontSize: '12px', color: 'var(--error)' }}>
              Tap for immediate life-safety assistance
            </p>
          </div>

          <div className="report-section">
            <h3 style={{ marginBottom: '20px', fontSize: '18px', color: 'var(--text-main)' }}>
              File a Complaint
            </h3>
            
            <div className="form-group">
              <label>Nature of Threat</label>
              <select 
                id="category" 
                value={formData.category} 
                onChange={handleInputChange}
              >
                <option>Online Harassment / Stalking</option>
                <option>Phishing / Financial Scam</option>
                <option>Identity Theft</option>
                <option>Suspicious Link / Message</option>
                <option>Other Cyber Crime</option>
              </select>
            </div>

            <div className="form-group">
              <label>Received Message Content</label>
              <textarea 
                id="scamText" 
                rows="4" 
                placeholder="Paste the message you received here..."
                value={formData.scamText}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="form-group">
              <label>Additional Details</label>
              <textarea 
                id="details" 
                rows="2" 
                placeholder="Any extra information about the incident..."
                value={formData.details}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="form-group">
              <label>Sender Information</label>
              <input 
                type="text" 
                id="evidence" 
                placeholder="Phone number, Email, or Website link"
                value={formData.evidence}
                onChange={handleInputChange}
              />
            </div>

            <button className="submit-btn" onClick={submitComplaint}>
              Submit Complaint
            </button>
          </div>

          <a href="/" className="back-link">← Back to Dashboard</a>
        </div>
      </div>
    </>
  );
};

export default EmergencyPortal;