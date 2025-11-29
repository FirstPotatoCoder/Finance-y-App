import React from 'react';
import './Transaction.css';

function TransactionList({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="transaction-empty">
        <p>No transactions found. Add some transactions to get started!</p>
      </div>
    );
  }

  // Render table 
  return (
    <div className="transaction-list">
      <div className="transaction-table-header">
        <div className="col-date">Date</div>
        <div className="col-description">Description</div>
        <div className="col-type">Type</div>
        <div className="col-amount">Amount</div>
        <div className="col-category">Category</div>
      </div>

      {/* Transaction rows */}
      {transactions.map((transaction, index) => (
        <div
          key={index}
          className={`transaction-row transaction-${transaction.type.toLowerCase()}`}
        >
          <div className="col-date">
            {new Date(transaction.date).toLocaleDateString()}
          </div>
          <div className="col-description">{transaction.description}</div>
          <div className="col-type">
            <span className={`type-badge ${transaction.type.toLowerCase()}`}>
              {transaction.type}
            </span>
          </div>
          <div className="col-amount">
            <span className={`amount ${transaction.type.toLowerCase()}`}>
              {transaction.type === 'Income' ? '+' : '-'}$
              {Math.abs(transaction.amount).toFixed(2)}
            </span>
          </div>
          <div className="col-category">{transaction.category}</div>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;
