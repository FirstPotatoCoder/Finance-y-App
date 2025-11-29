import React, { useMemo } from "react";
import { useAuth } from "../AuthContext/AuthContext";
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

export default function Dashboard({ userData, tempGoals = [] }) {
  const transactions = useMemo(() => userData.transactions || [], [userData.transactions]);
  const { isLoggedIn } = useAuth(); // get login status
  const goals = isLoggedIn ? (userData.goals || []) : tempGoals;

  // summary calc
  const totalEntries = transactions.length;
  const totalIncomeEntries = transactions.filter(t => t.type === "Income").length;
  const totalExpenseEntries = transactions.filter(t => t.type === "Expense").length;

  // group income by category
  const incomePieData = useMemo(() => {
    const map = {};
    transactions
      .filter(t => t.type === "Income")
      .forEach(t => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });

    return Object.entries(map).map(([category, value]) => ({ category, value }));
  }, [transactions]);

  // group expense by category
  const { expenseBarData } = useMemo(() => {
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

  // goal progress calculation
  const calculateProgress = (current, target) => Math.min((current / target) * 100, 100);

  return (
    <div className="dashboard-wrapper">
      <div className="left-column">
        {/* summary cards: total transaction, income, and expenses */}
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

        {/* charts (income and expenses) */}
        <div className="charts-split-row">
          {/* pie chart for income */}
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

          {/* expense using bar chart */}
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
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* goals section */}
      <div className="right-column">
        <div className="side-list">
          <h3>Goals Progress</h3>
          {goals.length === 0 ? (
            <p>No goals yet</p>
          ) : (
            goals.map((goal, idx) => {
              const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
              return (
                <div key={idx} className="goal-side-row">
                  <p className="goal-name">{goal.goalName}</p>
                  <div className="goal-track">
                    <div
                      className="goal-fill"
                      style={{
                        width: `${progress}%`,
                        background: COLORS[idx % COLORS.length],
                      }}
                    ></div>
                  </div>
                  <span className="goal-percent">{progress.toFixed(1)}%</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}