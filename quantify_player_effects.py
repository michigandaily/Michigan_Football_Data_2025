
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

# Simulating data for University of Michigan football team performance
data = {
    "Year": [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    "Passing_Yards": [2756, 2023, 2800, 3023, 1500, 3001, 2960, 2991, 1209],
    "Rushing_Yards": [2768, 2631, 2775, 2238, 1493, 2700, 3345, 3200, 1493],
    "Sacks": [45, 42, 34, 36, 8, 34, 37, 40, 13],
    "Turnovers": [5, 11, 12, 14, 4, 9, 7, 6, 9],
    "Wins": [10, 8, 10, 9, 2, 12, 13, 15, 5]
}

# Calculate Player Impact Score
data["Player_Impact_Score"] = (
    np.array(data["Passing_Yards"]) +
    np.array(data["Rushing_Yards"]) +
    (np.array(data["Sacks"]) * 10) -
    (np.array(data["Turnovers"]) * 50)
) / 100

# Creating a DataFrame
df = pd.DataFrame(data)

# Features and target variable
X = df[["Passing_Yards", "Rushing_Yards", "Sacks", "Turnovers"]]
y = df["Wins"]

# Standardizing the features to interpret their relative impacts
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train the regression model
model = LinearRegression()
model.fit(X_scaled, y)

# Extracting the coefficients
coefficients = model.coef_
feature_names = X.columns
coeff_df = pd.DataFrame({
    "Feature": feature_names,
    "Coefficient": coefficients
}).sort_values(by="Coefficient", ascending=False)

# Save the coefficients for user reference
coeff_df.to_csv("player_effect_coefficients.csv", index=False)

# Visualize the coefficients
plt.figure(figsize=(10, 6))
plt.barh(coeff_df["Feature"], coeff_df["Coefficient"], color='skyblue')
plt.xlabel("Effect on Team Success (Standardized Coefficient)")
plt.ylabel("Player Metrics")
plt.title("Quantifying Player Effects on Team Success (2016-2024)")
plt.grid(axis='x')
plt.tight_layout()
plt.savefig("player_effect_plot.png")

# Visualize Year vs. Player Impact Score
plt.figure(figsize=(10, 6))
plt.plot(data["Year"], data["Player_Impact_Score"], marker='o', linestyle='-', color='green', label='Player Impact Score')
plt.title("Year vs. Player Impact Score (2016-2024)")
plt.xlabel("Year")
plt.ylabel("Player Impact Score")
plt.grid()
plt.legend()
plt.tight_layout()
plt.savefig("year_vs_pis_plot.png")
