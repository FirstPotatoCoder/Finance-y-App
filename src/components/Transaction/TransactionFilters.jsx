import React from 'react';
import './Transaction.css';

function TransactionFilters({
  filterType,
  onFilterTypeChange,
  sortBy,
  onSortChange,
  searchTerm,
  onSearchChange,
}) {
  return (
    <div className="transaction-filters">
      <div className="filter-group">
        <label htmlFor="type-filter">Filter by Type:</label>
        <select
          id="type-filter"
          value={filterType}
          onChange={(e) => onFilterTypeChange(e.target.value)}
          className="filter-select"
        >
          <option value="">All Transactions</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-filter">Sort by:</label>
        <select
          id="sort-filter"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="filter-select"
        >
          <option value="date-desc">Date (Newest First)</option>
          <option value="date-asc">Date (Oldest First)</option>
          <option value="amount-desc">Amount (High to Low)</option>
          <option value="amount-asc">Amount (Low to High)</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="search-filter">Search:</label>
        <input
          id="search-filter"
          type="text"
          placeholder="Search description or category..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
    </div>
  );
}

export default TransactionFilters;
