import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler


df = pd.read_csv(r"C:\Users\ROUA\Desktop\ai odyssey\transactions.csv")


features = ['gas_price', 'gas', 'transaction_fee', 'value']

for col in features:
    df[col] = pd.to_numeric(df[col], errors='coerce')


df = df.dropna(subset=features)


scaler = StandardScaler()
X_scaled = scaler.fit_transform(df[features])


model = IsolationForest(contamination=0.05, random_state=42)
df['risk_score'] = model.fit_predict(X_scaled)


df['risk_score'] = df['risk_score'].apply(lambda x: 1 if x == -1 else 0)

plt.figure(figsize=(9, 6))
plt.hist(df['risk_score'], bins=20, color='red')
plt.title("Risk Score Distribution")
plt.xlabel("Risk ")
plt.ylabel("Transaction ")
plt.show()

plt.figure(figsize=(6, 6))
df['risk_score'].value_counts().plot(kind='pie', labels=['Safe', 'Risky'], autopct='%1.1f%%', colors=['green', 'red'])
plt.title("Transaction Risk Distribution")
plt.ylabel("")  # Hide y-axis label
plt.show()
df.to_csv(r"C:\Users\ROUA\Desktop\ai odyssey\transactions_with_risk.csv", index=False)

print("✅ Risk assessment completed and saved!")