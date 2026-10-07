import React, { useState } from 'react';

const faqData = [
  {
    id: 1,
    title: "1. Explainable AI – Why This Message Is Risky",
    subQuestions: [
      { q: "Does the message ask for sensitive info?", a: "Phishing attempts frequently solicit high-value data like OTPs or banking credentials to gain unauthorized access. Our AI flags these requests because legitimate institutions will never ask for private security keys via unencrypted text or email." },
      { q: "Is urgency or fear used to pressure me?", a: "Scammers employ psychological triggers like \"Account Suspended\" to bypass your critical thinking. By creating a false sense of panic, they hope you will click a malicious link without verifying the sender’s true identity." },
      { q: "Is the sender verified or unknown?", a: "Cybercriminals often spoof official names but use a hidden, mismatched email address or an unofficial domain. We analyze the sender's metadata and SPF records to ensure the identity matches the claimed organization." },
      { q: "Does the message contain suspicious links?", a: "Links in scam messages often lead to \"clone sites\" designed to harvest your login data. Our detection layer inspects the URL structure for \"typosquatting\" where common names are slightly misspelled to deceive users." }
    ]
  },
  {
    id: 2,
    title: "2. Trust Score & Risk Level Explained",
    subQuestions: [
      { q: "What does a low Trust Score mean?", a: "A low score indicates that the message failed multiple security checks, such as domain validation and linguistic analysis. This serves as a mathematical warning that the interaction has a high probability of being fraudulent." },
      { q: "How is Risk Level calculated?", a: "Our algorithm aggregates data from three main vectors: sender reputation, link safety, and predatory language patterns. These factors are weighted into a final rating of Safe, Suspicious, or High Risk to guide your response." },
      { q: "Can Trust Score change over time?", a: "Yes, our system updates scores in real-time as new scam patterns and \"blacklisted\" domains are reported globally. A link that seemed safe yesterday might be flagged today if other users have reported it as a threat." },
      { q: "Is a high score always 100% safe?", a: "While a high score indicates no known threats were found, users should still remain vigilant against \"Zero-Day\" attacks. We recommend always verifying sensitive requests through an official app regardless of the rating." }
    ]
  },
  {
    id: 3,
    title: "3. Women-Focused Alerts & Harassment",
    subQuestions: [
      { q: "What scams most often target women?", a: "Research shows that work-from-home scams and family-impersonation fraud are frequently directed at women to exploit emotional ties. Our platform includes specialized logic to detect these specific manipulation patterns early to prevent financial loss." },
      { q: "How does the chatbot detect harassment?", a: "The AI scans for aggressive language, repeated unwanted contact, and intimidation tactics used in cyber-stalking. It provides immediate safety prompts and can suggest local helpline numbers if a credible threat is identified by the system." },
      { q: "Can the system flag unsafe social media links?", a: "Yes, the system analyzes profiles and links sent via DM to check for \"bot\" behavior or malicious intent. This protects users from predatory profiles that distribute phishing links or attempt to initiate unwanted harassment." },
      { q: "Does it warn me if my personal data is leaked?", a: "Our platform integrates with global data-breach databases to alert you if your email or phone number appears in a public leak. This allows you to secure your accounts with new passwords before scammers can exploit the exposed information." }
    ]
  },
  {
    id: 4,
    title: "4. Suspicious Email or SMS – What To Do",
    subQuestions: [
      { q: "Should I click the link?", a: "Absolutely not, as these links often lead to \"clone sites\" designed to harvest your credentials. Even clicking the link can sometimes trigger a silent malware download that infects your entire device without your knowledge." },
      { q: "Should I reply to the sender?", a: "Replying to a scammer confirms that your phone number or email is active and monitored by a real person. This makes you a high-value target for even more frequent and sophisticated attacks in the very near future." },
      { q: "How do I report this message?", a: "You should use the \"Report Spam\" feature in your mail client and then upload the details to our platform. Reporting helps our AI learn new patterns and protects the entire community from falling victim to the same threat." },
      { q: "Should I delete it immediately?", a: "We recommend reporting the message first to help global security databases and then deleting it permanently. Deleting it prevents accidental clicks later on while keeping your digital workspace clean and secure from future mistakes." }
    ]
  },
  {
    id: 5,
    title: "5. Fake Job Offers & Prize Scams",
    subQuestions: [
      { q: "Does the job ask for money upfront?", a: "Legitimate employers will never ask for payment for \"training kits\" or \"processing fees\" during the hiring process. If money is requested before you have even started working, it is almost certainly a fraudulent financial trap." },
      { q: "Is the prize too good to be true?", a: "Winning an expensive prize for a contest you never entered is a classic \"lure\" used by cybercriminals. These messages are designed to trick you into providing personal info under the guise of paying \"shipping fees\" or \"taxes.\"" },
      { q: "Does the sender have a verified source?", a: "Scammers often use free email services or fake social media profiles to send professional-looking job offers. Our AI checks if the sender's domain matches the official corporate website of the company they claim to represent." },
      { q: "Are personal details being requested?", a: "If a recruiter asks for your ID, bank details, or home address before an actual interview, it is a major red flag. Scammers use this gathered information for identity theft or to sell your private data on the dark web." }
    ]
  },
  {
    id: 6,
    title: "6. Emergency Safety Actions",
    subQuestions: [
      { q: "Should I disconnect from the internet?", a: "If you suspect a malicious link was clicked, turning off your Wi-Fi can stop an active malware transmission immediately. This prevents the attacker from siphoning your private files or sensitive passwords back to their remote server." },
      { q: "Do I need to change my passwords?", a: "Yes, you should immediately update passwords for your primary accounts from a clean, separate device. We recommend using a trusted password manager and enabling Two-Factor Authentication (2FA) for a vital extra layer of defense." },
      { q: "Should I run a security scan?", a: "Running a system scan with reputable antivirus software can remove hidden \"keyloggers\" or tracking spyware. This ensures that any malicious code injected during the phishing attempt is completely purged from your operating system." },
      { q: "Do I need to contact my bank?", a: "If you entered banking details on a suspicious site, contact your financial institution immediately to freeze your cards. Rapid response can prevent unauthorized transactions and is the first step in the legal recovery of stolen funds." }
    ]
  },
  {
    id: 7,
    title: "7. OTP & Password Safety",
    subQuestions: [
      { q: "Can scammers misuse my OTP?", a: "An OTP (One-Time Password) is the final key to your digital vault and must never be shared with anyone. If a scammer gets this code, they can authorize large bank transfers or change your account recovery settings permanently." },
      { q: "Is sharing a password safe with friends?", a: "No, even trusted people can have their own devices hacked or lost, which exposes your private credentials. It is always best to keep your passwords strictly private and use unique ones for every individual digital service." },
      { q: "Can OTPs give full account access?", a: "Yes, many modern services use OTPs to reset passwords or bypass security questions entirely. Once a scammer intercepts an OTP, they can effectively lock you out of your own account within a matter of seconds." },
      { q: "Why do banks warn against sharing?", a: "Banks emphasize this because OTPs are the last line of defense in the \"Multi-Factor Authentication\" process. Sharing an OTP is effectively giving a criminal written permission to withdraw money or access your private data." }
    ]
  },
  {
    id: 8,
    title: "8. Data Privacy & Your Safety",
    subQuestions: [
      { q: "Does the chatbot store my personal data?", a: "Our platform is built on a \"Privacy by Design\" principle, meaning we process data in real-time without permanent storage. Your uploaded screenshots and URLs are deleted immediately after the security analysis is successfully complete." },
      { q: "Is my browsing history tracked?", a: "No, our AI only analyzes the specific content you submit for checking and does not monitor your private browsing sessions. We prioritize user anonymity and only focus on identifying external security threats to protect you." },
      { q: "How is pattern analysis done safely?", a: "We use anonymized datasets to train our AI, ensuring that no individual user's data can ever be identified. This allows us to recognize global scam trends while keeping your personal identity completely shielded from view." },
      { q: "Can my data be shared with third parties?", a: "We have a strict zero-sharing policy and do not sell user information to advertisers or any external organizations. Any data processed is used strictly for generating your specific Trust Score and improving our detection algorithm." }
    ]
  }
];

const CyberShieldFAQ = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeSubq, setActiveSubq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
    setActiveSubq(null); // Close subquestions when changing main category
  };

  const toggleAnswer = (e, index) => {
    e.stopPropagation();
    setActiveSubq(activeSubq === index ? null : index);
  };

  return (
    <div style={styles.body}>
      {/* Navigation Bar */}
      <nav style={styles.navBar}>
        <a href="#" style={{ ...styles.navLink, ...styles.activeLink }}>🔍 AI Defense FAQ</a>
        <a href="#" style={styles.navLink}>🚨 Emergency Portal</a>
      </nav>

      {/* Main Container */}
      <div style={styles.chatbot}>
        <div style={styles.headerSection}>
          <h2 style={styles.h2}>CyberShield AI: Explainable Defense</h2>
          <div style={styles.statusBadge}>
            <div style={styles.statusDot}></div>
            Active Awareness Protocol
          </div>
        </div>

        <div style={styles.faqContainer}>
          {faqData.map((faq, index) => (
            <div key={faq.id}>
              {/* Main FAQ Item */}
              <div 
                style={{ 
                  ...styles.faq, 
                  ...(activeFaq === index ? styles.faqActive : {}) 
                }} 
                onClick={() => toggleFaq(index)}
              >
                {faq.title} 
                <span style={{ 
                  ...styles.faqIcon, 
                  transform: activeFaq === index ? 'rotate(45deg)' : 'none' 
                }}>+</span>
              </div>

              {/* Sub-questions Area */}
              {activeFaq === index && (
                <div style={styles.subquestions}>
                  {faq.subQuestions.map((item, subIndex) => (
                    <div 
                      key={subIndex} 
                      style={styles.subq} 
                      onClick={(e) => toggleAnswer(e, subIndex)}
                    >
                      {item.q}
                      {activeSubq === subIndex && (
                        <div style={styles.answer}>
                          {item.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Keyframe Injection */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 230, 118, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(0, 230, 118, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 230, 118, 0); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateY(-5px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
};

// Styles object mimicking your CSS exactly
const styles = {
  body: {
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    background: "radial-gradient(circle at top right, #1e293b, #0f172a)",
    margin: 0,
    padding: "20px 15px",
    color: "#ffffff",
    minHeight: "100vh",
    lineHeight: "1.6",
  },
  navBar: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "15px",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    maxWidth: "850px",
    margin: "0 auto 30px auto",
  },
  navLink: {
    color: "#b0bec5",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "14px",
    transition: "0.3s",
  },
  activeLink: {
    color: "#4fc3f7",
    borderBottom: "2px solid #4fc3f7",
  },
  chatbot: {
    maxWidth: "850px",
    margin: "auto",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(15px)",
    borderRadius: "28px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "40px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  },
  headerSection: { textAlign: "center", marginBottom: "40px" },
  h2: {
    fontSize: "32px",
    background: "linear-gradient(to right, #ffffff, #4fc3f7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    background: "rgba(0, 230, 118, 0.1)",
    color: "#00e676",
    padding: "8px 18px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: 600,
    marginTop: "15px",
    textTransform: "uppercase",
  },
  statusDot: {
    height: "8px",
    width: "8px",
    backgroundColor: "#00e676",
    borderRadius: "50%",
    marginRight: "10px",
    boxShadow: "0 0 10px #00e676",
    animation: "pulse 2s infinite",
  },
  faqContainer: { marginTop: "20px" },
  faq: {
    marginTop: "15px",
    padding: "20px 25px",
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    cursor: "pointer",
    fontWeight: 600,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "0.3s",
  },
  faqActive: {
    background: "rgba(79, 195, 247, 0.12)",
    borderColor: "#4fc3f7",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  faqIcon: { color: "#4fc3f7", transition: "transform 0.3s" },
  subquestions: {
    display: "block",
    background: "rgba(0, 0, 0, 0.2)",
    padding: "15px 25px 25px 25px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderTop: "none",
    borderRadius: "0 0 16px 16px",
    animation: "fadeIn 0.4s ease",
  },
  subq: {
    margin: "10px 0",
    padding: "15px",
    background: "rgba(255, 255, 255, 0.02)",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    color: "#b0bec5",
    borderLeft: "3px solid transparent",
    transition: "0.2s",
  },
  answer: {
    display: "block",
    marginTop: "12px",
    padding: "18px",
    background: "rgba(0, 230, 118, 0.06)",
    borderRadius: "10px",
    color: "#e0e0e0",
    fontSize: "14.5px",
    border: "1px solid rgba(0, 230, 118, 0.2)",
    animation: "slideIn 0.3s ease-out",
  }
};

export default CyberShieldFAQ;