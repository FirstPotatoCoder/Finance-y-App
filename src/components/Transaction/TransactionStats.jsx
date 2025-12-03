import React from 'react';
import './Transaction.css';

function TransactionStats({ transactions }) {
  // Calculate total income
  const totalIncome = transactions
    .filter((t) => t.type === 'Income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  // Calculate total expenses
  const totalExpense = transactions
    .filter((t) => t.type === 'Expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  // Calculate balance
  const balance = totalIncome - totalExpense;

  return (
    <div className="transaction-stats">
      <div className={`stat-card balance-card ${balance >= 0 ? 'positive' : 'negative'}`}>
        <div className="stat-label">Total Balance</div>
        <div className={`stat-amount`}>
          ${balance.toFixed(2)}
        </div>
      </div>

      <div className="stat-card income-card">
        <div className="stat-label">Total Income</div>
        <div className="stat-amount income">
          +${totalIncome.toFixed(2)}
        </div>
      </div>

      <div className="stat-card expense-card">
        <div className="stat-label">Total Expenses</div>
        <div className="stat-amount expense">
          -${totalExpense.toFixed(2)}
        </div>
      </div>

      <div className="stat-card transactions-card">
        <div className="stat-label">Total Transactions</div>
        <div className="stat-amount">
          {transactions.length}
        </div>
      </div>
    </div>
  );
}

export default TransactionStats;
