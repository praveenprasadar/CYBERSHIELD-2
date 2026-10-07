import cv2
import pytesseract
import re
import json
import sys
import os

# -----------------------------
# Set Tesseract Path (Windows)
# -----------------------------

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# -----------------------------
# Get Image Path From Node.js
# -----------------------------

if len(sys.argv) < 2:
    print(json.dumps({"error": "Image path not provided"}))
    sys.exit()

image_path = sys.argv[1]

# -----------------------------
# Check Image Exists
# -----------------------------

if not os.path.exists(image_path):
    print(json.dumps({"error": "Image file not found"}))
    sys.exit()

# -----------------------------
# Read Image
# -----------------------------

img = cv2.imread(image_path)

if img is None:
    print(json.dumps({"error": "Unable to read image"}))
    sys.exit()

# -----------------------------
# Preprocess Image (improves OCR)
# -----------------------------

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
gray = cv2.GaussianBlur(gray, (3,3), 0)

# -----------------------------
# Extract Text Using OCR
# -----------------------------

try:
    text = pytesseract.image_to_string(gray)
except:
    print(json.dumps({"error": "OCR extraction failed"}))
    sys.exit()

# -----------------------------
# Find URLs In Extracted Text
# -----------------------------

url_pattern = r'https?://[^\s]+'
urls = re.findall(url_pattern, text)

# -----------------------------
# Prepare Output
# -----------------------------

if urls:

    result = {
        "prediction": 1,
        "risk_level": "SUSPICIOUS",
        "extracted_url": urls[0],
        "reasons": ["URL detected inside screenshot"]
    }

else:

    result = {
        "prediction": 0,
        "risk_level": "SAFE",
        "extracted_url": None,
        "reasons": ["No URL detected in screenshot"]
    }

# -----------------------------
# Return Result To Node.js
# -----------------------------

print(json.dumps(result))