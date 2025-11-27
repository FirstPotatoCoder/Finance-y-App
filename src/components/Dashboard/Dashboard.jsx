// Dashboard.jsx (Updated 75/25 Layout + Recharts)
import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";

export default function Dashboard({ transactions }) {
  // === SUMMARY CALCULATIONS ===
  const totalEntries = transactions.length;
  const totalIncomeEntries = transactions.filter(t => t.type === "Income").length;
  const totalExpenseEntries = transactions.filter(t => t.type === "Expense").length;

  // === GROUP INCOME BY CATEGORY ===
  const incomePieData = useMemo(() => {
    const map = {};
    transactions
      .filter(t => t.type === "Income")
      .forEach(t => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });

    return Object.entries(map).map(([category, amount]) => ({ category, value: amount }));
  }, [transactions]);

  // === GROUP EXPENSE BY CATEGORY ===
  const { expenseBarData, expensePercentData } = useMemo(() => {
    const exp = {};
    transactions
      .filter(t => t.type === "Expense")
      .forEach(t => {
        exp[t.category] = (exp[t.category] || 0) + t.amount;
      });

    const barData = Object.entries(exp).map(([category, amount]) => ({ category, amount }));

    const total = Object.values(exp).reduce((a, b) => a + b, 0);
    const percent = Object.entries(exp)
      .map(([category, amount]) => ({
        category,
        amount,
        percent: total === 0 ? 0 : (amount / total) * 100,
      }))
      .sort((a, b) => b.percent - a.percent);

    return { expenseBarData: barData, expensePercentData: percent };
  }, [transactions]);

  const COLORS = [
    "var(--color-0)",
    "var(--color-1)",
    "var(--color-2)",
    "var(--color-3)",
    "var(--color-4)",
    "var(--color-5)",
  ];

  return (
    <div className="dashboard-wrapper">
      {/* LEFT COLUMN 75% */}
      <div className="left-column">
        {/* ===== SUMMARY CARDS ===== */}
        <div className="summary-row">
          <div className="summary-card">
            <p>Total Entries</p>
            <h2>{totalEntries}</h2>
          </div>
          <div className="summary-card">
            <p>Total Income Entries</p>
            <h2>{totalIncomeEntries}</h2>
          </div>
          <div className="summary-card">
            <p>Total Expense Entries</p>
            <h2>{totalExpenseEntries}</h2>
          </div>
        </div>

        {/* ===== CHARTS SECTION ===== */}
        <div className="charts-split-row">
          {/* INCOME PIE CHART */}
          <div className="chart-box">
            <h3>Income by Category</h3>
            {incomePieData.length === 0 ? (
              <p>No income data</p>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={incomePieData}
                    dataKey="value"
                    nameKey="category"
                    outerRadius={90}
                    label
                  >
                    {incomePieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* EXPENSE BAR CHART */}
          <div className="chart-box">
            <h3>Expenses by Category</h3>
            {expenseBarData.length === 0 ? (
              <p>No expense data</p>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={expenseBarData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="amount">
                    {expenseBarData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN 25% */}
      <div className="right-column">
        <div className="side-list">
          <h3>Top Spending Categories</h3>
          {expensePercentData.length === 0 ? (
            <p>No expense data</p>
          ) : (
            expensePercentData.map((item, idx) => (
              <div key={idx} className="side-row">
                <p>{item.category}</p>
                <div className="side-track">
                  <div
                    className="side-fill"
                    style={{
                      width: `${item.percent}%`,
                      background: COLORS[idx % COLORS.length],
                    }}
                  ></div>
                </div>
                <span>{item.percent.toFixed(1)}%</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}