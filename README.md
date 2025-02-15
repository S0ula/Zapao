On-Chain Scam Detector & Risk Score Generator
Authors: Youssef Soula, Yassin Jaouani, Roua Ghaffari
Date: 15/02/2025

Project Summary:
This tool detects potentially fraudulent blockchain transactions across networks like Ethereum, BSC, Polygon, Avalanche, and Fantom. Using unsupervised machine learning (Isolation Forest), 
It generates a risk score to help identify suspicious transactions in real-time.

Key Features
Transaction Data Extraction: Collects data from blockchain networks using the Moralis API.
Anomaly Detection: Flags risky transactions using the Isolation Forest algorithm based on financial indicators.
Risk Scoring: Classifies transactions as safe (0) or risky (1) for easy decision-making.
Tech Stack:
Frontend: Simple web interface built with HTML, CSS, and JavaScript.
Backend: Python, utilizing Pandas, NumPy, Scikit-learn, and Matplotlib for data handling and modeling.
