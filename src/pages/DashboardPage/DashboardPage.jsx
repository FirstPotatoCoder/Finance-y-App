// DashboardPage.jsx
import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import { useAuth } from "../../components/AuthContext/AuthContext";

export default function DashboardPage({ tempEntries }) {
  const { isLoggedIn, username } = useAuth();
  const [transactions, setTransactions] = useState([]);

  // Load data exactly like your Transaction component
  useEffect(() => {
    let entries = [];

    if (isLoggedIn) {
      const saved = JSON.parse(localStorage.getItem("financeEntries")) || {};
      entries = saved[username] || [];
    } else {
      entries = tempEntries || [];
    }

    const mapped = entries.map((entry) => ({
      date: entry.date,
      description: entry.note || entry.category,
      type: entry.type.charAt(0).toUpperCase() + entry.type.slice(1),
      amount: entry.amount,
      category: entry.category.charAt(0).toUpperCase() + entry.category.slice(1),
    }));

    setTransactions(mapped);
  }, [isLoggedIn, username, tempEntries]);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1>Dashboard</h1>
        {!isLoggedIn && <p style={{ color: "orange" }}>⚠️ Guest Mode: Entries are Temporary</p>}
        {
          isLoggedIn && 
          <p style={{ color: 'green', fontWeight: 'bold' }}>
            👋 Welcome back, {username}!
          </p>
        }
      </div>
      <Dashboard transactions={transactions} />
    </div>
  );
}