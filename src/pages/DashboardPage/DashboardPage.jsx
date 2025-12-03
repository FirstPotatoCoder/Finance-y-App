import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import { useAuth } from "../../components/AuthContext/AuthContext";
import './DashboardPage.css';


export default function DashboardPage({ tempEntries, tempGoals }) {
  const { isLoggedIn, username } = useAuth();
  const [userData, setUserData] = useState({ transactions: [], goals: [] });

  useEffect(() => {
    let entries = [];
    let goals = [];

    if (isLoggedIn) {
      const saved = JSON.parse(localStorage.getItem("financeData")) || {};
      const data = saved[username] || { transactions: [], goals: [] };

      entries = data.transactions;
      goals = data.goals;
    } else {
      entries = tempEntries || [];
      goals = tempGoals || [];
    }

    const mapped = entries.map((entry) => ({
      date: entry.date,
      description: entry.note || entry.category,
      type: entry.type.charAt(0).toUpperCase() + entry.type.slice(1),
      amount: entry.amount,
      category: entry.category.charAt(0).toUpperCase() + entry.category.slice(1),
    }));

    setUserData({ transactions: mapped, goals });
  }, [isLoggedIn, username, tempEntries, tempGoals]);

  return (
    <div className="dashboard_container">
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1>Dashboard</h1>
        {!isLoggedIn && <p className="guest-warning">⚠️ Guest Mode: Entries are Temporary</p>}
        {isLoggedIn && (
          <p style={{ color: "green", fontWeight: "bold" }}>
            👋 Welcome back, {username}!
          </p>
        )}
      </div>
      <Dashboard userData={userData} tempGoals={tempGoals} />
    </div>
  );
}