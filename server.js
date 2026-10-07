const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const app = express();
const { spawn } = require("child_process");
app.use(cors());
app.use(express.json());

/* -----------------------------
   MongoDB Connection
----------------------------- */

mongoose.connect("mongodb://127.0.0.1:27017/cybersafety")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* -----------------------------
   User Schema
----------------------------- */

const userSchema = new mongoose.Schema({

  name: String,
  email: { type: String, unique: true },
  password: String

});

const User = mongoose.model("User", userSchema);

/* -----------------------------
   Signup API
----------------------------- */

app.post("/signup", async (req, res) => {

  try {

    const { name, email, password } = req.body;
  console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.json({
      message: "Signup successful"
    });

  } catch (error) {

    res.status(400).json({
      message: "User already exists"
    });

  }

});

/* -----------------------------
   Login API
----------------------------- */

app.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {

    return res.status(404).json({
      message: "User not found"
    });

  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {

    return res.status(401).json({
      message: "Invalid password"
    });

  }

  const token = jwt.sign(
    { id: user._id },
    "cybersafetysecret",
    { expiresIn: "1h" }
  );

  res.json({

    message: "Login successful",
    token: token

  });

});

/* -----------------------------
   IMAGE UPLOAD CONFIG (NEW)
----------------------------- */

const upload = multer({ dest: "uploads/" });

/* -----------------------------
   Trusted Domains List
----------------------------- */

const trustedDomains = [
  "google.com","youtube.com","facebook.com","instagram.com","twitter.com","x.com",
  "linkedin.com","github.com","amazon.com","flipkart.com","microsoft.com",
  "apple.com","wikipedia.org","netflix.com","whatsapp.com","paypal.com",
  "reddit.com","yahoo.com","bing.com","openai.com","chat.openai.com",
  "cloudflare.com","stackexchange.com","stackoverflow.com"
];

/* -----------------------------
   Fake Domain Detection
----------------------------- */

function detectFakeDomain(domain) {

  const fakePatterns = {
    amazon: "amaz0n",
    google: "go0gle",
    paypal: "paypa1",
    microsoft: "micr0soft"
  };

  for (let brand in fakePatterns) {
    if (domain.includes(fakePatterns[brand])) {
      return true;
    }
  }

  return false;
}

/* -----------------------------
   URL Feature Extraction
----------------------------- */

function extractFeatures(inputUrl) {

  try {

    const parsed = new URL(inputUrl);

    const hostname = parsed.hostname.replace("www.", "");
    const path = parsed.pathname;
    const fullUrl = parsed.href;

    return {
      hostname,
      NumDots: (hostname.match(/\./g) || []).length,
      UrlLength: fullUrl.length,
      AtSymbol: fullUrl.includes("@") ? 1 : 0,
      NumDash: (hostname.match(/-/g) || []).length,
      NumPercent: (fullUrl.match(/%/g) || []).length,
      NumQueryComponents: parsed.search ? parsed.search.split("&").length - 1 : 0,
      IpAddress: /^\d+\.\d+\.\d+\.\d+$/.test(hostname) ? 1 : 0,
      HttpsInHostname: hostname.includes("https") ? 1 : 0,
      PathLevel: path.split("/").length - 1,
      PathLength: path.length,
      NumNumericChars: (hostname.match(/[0-9]/g) || []).length
    };

  } catch {
    return null;
  }
}

/* -----------------------------
   IMAGE OCR DETECTION
----------------------------- */

app.post("/analyze-image", upload.single("image"), (req, res) => {

  const imagePath = req.file.path;

  const python = spawn("python", ["../ocr_detect.py", imagePath]);

  let output = "";

  python.stdout.on("data", (data) => {
    output += data.toString();
  });

  python.stderr.on("data", (err) => {
    console.error("OCR error:", err.toString());
  });

  python.on("close", () => {

    fs.unlinkSync(imagePath);

    try {

      const result = JSON.parse(output);

      res.json(result);

    } catch {

      res.status(500).json({ error: "OCR processing failed" });

    }

  });

});

/* -----------------------------
   URL PHISHING DETECTION
----------------------------- */

app.post("/analyze", (req, res) => {

  const url = req.body.url;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const features = extractFeatures(url);

  if (!features) {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  const hostname = features.hostname;

  let reasons = [];

  if (trustedDomains.includes(hostname)) {

    return res.json({
      prediction: 0,
      risk_level: "SAFE",
      scam_type: "NONE",
      confidence_score: 0.99,
      reasons: ["Domain belongs to trusted list"]
    });

  }

  if (detectFakeDomain(hostname)) {
    reasons.push("Fake brand domain detected");
  }

  if (features.IpAddress === 1) {
    reasons.push("URL uses IP address instead of domain");
  }

  if (features.AtSymbol === 1) {
    reasons.push("URL contains '@' symbol");
  }

  if (features.NumDash > 3) {
    reasons.push("Too many dashes in domain");
  }

  const { hostname: _, ...modelFeatures } = features;

  const python = spawn("python", ["../predict.py"]);

  python.stdin.write(JSON.stringify(modelFeatures));
  python.stdin.end();

  python.stdout.on("data", (result) => {

    try {

      const prediction = JSON.parse(result.toString());

      if (prediction.prediction === 1) {
        reasons.push("AI model detected phishing patterns");
      }

      res.json({
        prediction: prediction.prediction,
        risk_level: prediction.prediction ? "HIGH" : "SAFE",
        scam_type: prediction.prediction ? "PHISHING_LINK" : "NONE",
        confidence_score: prediction.phishing_probability || 0.85,
        reasons: reasons.length ? reasons : ["URL appears safe"]
      });

    } catch {

      res.status(500).json({ error: "Model output error" });

    }

  });

});

/* -----------------------------
   MESSAGE PHISHING DETECTION
----------------------------- */

app.post("/analyze-message", (req, res) => {

  const message = req.body.message;
  const sender = req.body.sender;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  let extractedUrl = null;

  const urlMatch = message.match(/https?:\/\/[^\s]+/);

  if (urlMatch) {
    extractedUrl = urlMatch[0];
  }

  let senderDomain = null;

  if (sender && sender.includes("@")) {
    senderDomain = sender.split("@")[1].replace("www.", "");
  }

  let urlDomain = null;

  if (extractedUrl) {
    try {
      const parsed = new URL(extractedUrl);
      urlDomain = parsed.hostname.replace("www.", "");
    } catch {}
  }

  let senderVerified = false;

  if (senderDomain && trustedDomains.includes(senderDomain)) {
    senderVerified = true;
  }

  let domainMismatch = false;

  if (senderDomain && urlDomain && !urlDomain.includes(senderDomain)) {
    domainMismatch = true;
  }

  let fakeDomainDetected = false;

  if (urlDomain) {
    fakeDomainDetected = detectFakeDomain(urlDomain);
  }

  const phishingKeywords = [
    "verify your account","urgent","update payment",
    "login immediately","click this link","account suspended",
    "security alert","confirm your identity"
  ];

  const lowerMessage = message.toLowerCase();

  let keywordScore = 0;

  phishingKeywords.forEach(word => {
    if (lowerMessage.includes(word)) keywordScore++;
  });

  let risk = "SAFE";

  if (fakeDomainDetected) risk = "HIGH";
  else if (domainMismatch || keywordScore >= 2) risk = "HIGH";
  else if (keywordScore === 1) risk = "SUSPICIOUS";

  let prediction = risk === "SAFE" ? 0 : 1;

  let reasons = [];

  if (fakeDomainDetected) reasons.push("Fake domain detected");

  if (domainMismatch) reasons.push("Sender domain mismatch");

  if (keywordScore > 0) reasons.push("Suspicious phishing keywords");

  if (reasons.length === 0) reasons.push("Message appears normal");

  let scamType = "UNKNOWN";

  if (lowerMessage.includes("verify your account"))
    scamType = "ACCOUNT_VERIFICATION_SCAM";

  else if (lowerMessage.includes("update payment"))
    scamType = "PAYMENT_SCAM";

  else if (lowerMessage.includes("otp"))
    scamType = "OTP_SCAM";

  else if (fakeDomainDetected)
    scamType = "FAKE_BRAND_SCAM";

  else if (extractedUrl)
    scamType = "PHISHING_LINK";


  /* -----------------------------
     WOMEN TARGETED SCAM DETECTION
  ----------------------------- */

  const womenScamKeywords = [
    "i love you","marry me","send your photo",
    "private chat","relationship","romance",
    "sextortion","send pictures","video call alone"
  ];

  let womenScamDetected = false;

  womenScamKeywords.forEach(word => {
    if (lowerMessage.includes(word)) {
      womenScamDetected = true;
    }
  });

  if (womenScamDetected) {
    reasons.push("Possible romance / women-targeted scam detected");
  }


  /* -----------------------------
     PERSONAL DATA EXPOSURE WARNING
  ----------------------------- */

  const personalDataKeywords = [
    "otp","aadhaar","pan number","bank account",
    "upi","card number","cvv","address",
    "phone number","send your id","identity proof"
  ];

  let personalDataRisk = false;

  personalDataKeywords.forEach(word => {
    if (lowerMessage.includes(word)) {
      personalDataRisk = true;
    }
  });

  if (personalDataRisk) {
    reasons.push("Message requests sensitive personal information");
  }
  /* -----------------------------
   HARASSMENT RISK INDICATOR
----------------------------- */

const harassmentKeywords = [
  "threat","blackmail","leak your photos",
  "i will expose you","send money now",
  "i will ruin your life","i will share your pictures",
  "do what i say","or else","i know where you live"
];

let harassmentRisk = false;

harassmentKeywords.forEach(word => {
  if (lowerMessage.includes(word)) {
    harassmentRisk = true;
  }
});

if (harassmentRisk) {
  reasons.push("Possible harassment or blackmail attempt detected");
}

/* -----------------------------
   PSYCHOLOGICAL MANIPULATION DETECTOR
----------------------------- */

const manipulationKeywords = [
  "trust me",
  "only you can help",
  "don't tell anyone",
  "this is secret",
  "act fast",
  "limited time",
  "you must act now",
  "urgent help",
  "only today",
  "keep this between us"
];

let manipulationDetected = false;

manipulationKeywords.forEach(word => {
  if (lowerMessage.includes(word)) {
    manipulationDetected = true;
  }
});

if (manipulationDetected) {
  reasons.push("Possible psychological manipulation detected");
}

/* -----------------------------
   STALKER PATTERN DETECTION
----------------------------- */

const stalkerKeywords = [
  "i know where you live",
  "i am watching you",
  "i saw you yesterday",
  "i know your location",
  "i know your address",
  "i am outside your house",
  "i follow you",
  "i saw your profile"
];

let stalkerDetected = false;

stalkerKeywords.forEach(word => {
  if (lowerMessage.includes(word)) {
    stalkerDetected = true;
  }
});

if (stalkerDetected) {
  reasons.push("Possible stalking or surveillance behavior detected");
}
/* -----------------------------
   FINAL RISK ADJUSTMENT (NEW)
----------------------------- */

if (womenScamDetected) {
  risk = "HIGH";
  prediction = 1;
  scamType = "ROMANCE_SCAM";
}

if (personalDataRisk) {
  risk = "HIGH";
  prediction = 1;
  if (scamType === "UNKNOWN") {
    scamType = "PERSONAL_DATA_SCAM";
  }
}
/* -----------------------------
   EMERGENCY SAFETY SUGGESTION
----------------------------- */

let safetySuggestion = null;

if (harassmentRisk) {
  safetySuggestion =
    "Do not respond to the attacker. Block the sender and report the message to cybercrime authorities.";
}
  res.json({
  prediction,
  risk_level: risk,
  scam_type: scamType,
  extracted_url: extractedUrl,
  reasons,
  confidence_score: keywordScore > 1 ? 0.9 : 0.7,
  women_targeted_scam: womenScamDetected,
  personal_data_risk: personalDataRisk,
  harassment_risk: harassmentRisk,
  safety_suggestion: safetySuggestion,
  psychological_manipulation: manipulationDetected,
  stalker_pattern: stalkerDetected
});

});

/* -----------------------------
   START SERVER
----------------------------- */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});