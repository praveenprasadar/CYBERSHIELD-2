import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

data = pd.read_csv("data/phising.csv")

print("Original Shape:", data.shape)

if "Unnamed: 0" in data.columns:
    data = data.drop(columns=["Unnamed: 0"])

data = data.dropna(subset=["Phising"])

data["Phising"] = data["Phising"].astype(int)

print("Cleaned Shape:", data.shape)

X = data.drop("Phising", axis=1)
y = data["Phising"]
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

model = RandomForestClassifier(
    n_estimators=300,
    max_depth=20,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print("\nModel Accuracy:", accuracy * 100, "%")
print(classification_report(y_test, y_pred))

joblib.dump(model, "phishing_model.pkl")

print("\nModel saved successfully!")