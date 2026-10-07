import os
import sys
import json
import joblib
import pandas as pd

# -----------------------------
# Load ML Model
# -----------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "phishing_model.pkl")

model = joblib.load(MODEL_PATH)

# -----------------------------
# Read input from Node.js
# -----------------------------

try:
    input_json = sys.stdin.read()
    data = json.loads(input_json)
except:
    print(json.dumps({"error": "Invalid input"}))
    sys.exit()

# -----------------------------
# Expected feature order
# -----------------------------

feature_columns = [
    "NumDots",
    "UrlLength",
    "AtSymbol",
    "NumDash",
    "NumPercent",
    "NumQueryComponents",
    "IpAddress",
    "HttpsInHostname",
    "PathLevel",
    "PathLength",
    "NumNumericChars"
]

# -----------------------------
# Prepare feature dataframe
# -----------------------------

try:
    features = pd.DataFrame(
        [[float(data.get(col, 0)) for col in feature_columns]],
        columns=feature_columns
    )
except:
    print(json.dumps({"error": "Feature processing failed"}))
    sys.exit()

# -----------------------------
# Prediction
# -----------------------------

try:
    probability = float(model.predict_proba(features)[0][1])
except:
    print(json.dumps({"error": "Model prediction failed"}))
    sys.exit()

# -----------------------------
# Risk Classification
# -----------------------------

if probability >= 0.8:
    prediction = 1
    risk = "HIGH"
elif probability >= 0.6:
    prediction = 1
    risk = "SUSPICIOUS"
else:
    prediction = 0
    risk = "SAFE"

# -----------------------------
# Output Result
# -----------------------------

result = {
    "prediction": int(prediction),
    "phishing_probability": probability,
    "risk_level": risk
}

print(json.dumps(result))