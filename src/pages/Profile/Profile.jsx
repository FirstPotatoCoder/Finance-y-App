import React from "react";
import { useAuth } from "../../components/AuthContext/AuthContext";
import "./Profile.css";

export default function Profile() {
  const { username, logout } = useAuth();

  const registrationDate =
    localStorage.getItem("registrationDate") || new Date().toLocaleDateString();

    const storedData = localStorage.getItem("financeEntries");
    const financeEntries = storedData ? JSON.parse(storedData) : {};
    const userTransactions = financeEntries[username] || [];
    const userIncomes = userTransactions.filter(item => item.type === "income");
    const userExpenses = userTransactions.filter(item => item.type === "expense");

  const stats = {
    totalTransactions: userTransactions.length,
    income: userIncomes.length,
    expenses: userExpenses.length,
  };



  // Generic description
  const description = "I'm just starting to keep track of my money and try to save a little here and there. Learning as I go and hoping to get better at planning my spending.";

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img
          src="/profile_pic.jpg"
          alt="Profile"
          className="profile-pic"
        />
        <h2>{username}</h2>
        <p className="location">Earth, Solar System</p>

        <p className="desc">{description}</p>

        <div className="stats">
          <div className="stat-item">
            <strong>Total transactions:</strong> {stats.totalTransactions}
          </div>
          <div className="stat-item">
            <strong>Income:</strong> {stats.income}
          </div>
          <div className="stat-item">
            <strong>Expenses:</strong> {stats.expenses}
          </div>
        </div>

        <p>
          <strong>Member since:</strong> {registrationDate}
        </p>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}