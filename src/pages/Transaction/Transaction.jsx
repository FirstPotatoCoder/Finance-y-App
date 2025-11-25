import React, { useState, useEffect } from 'react';
import TransactionList from '../../components/Transaction/TransactionList';
import TransactionFilters from '../../components/Transaction/TransactionFilters';
import TransactionStats from '../../components/Transaction/TransactionStats';
import './Transaction.css';

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [searchTerm, setSearchTerm] = useState('');

  // Load transactions from localStorage
  useEffect(() => {
    const savedTransactions = localStorage.getItem('financeEntries');
    if (savedTransactions) {
      try {
        const parsed = JSON.parse(savedTransactions);
        // Map the data to match our component's expected format
        const mappedTransactions = parsed.map((entry) => ({
          date: entry.date,
          description: entry.note || entry.category,
          type: entry.type.charAt(0).toUpperCase() + entry.type.slice(1), // Capitalize first letter
          amount: entry.amount,
          category: entry.category.charAt(0).toUpperCase() + entry.category.slice(1), // Capitalize first letter
        }));
        setTransactions(mappedTransactions);
      } catch (error) {
        console.error('Error parsing transactions:', error);
        setTransactions([]);
      }
    }
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...transactions];

    // Filter by type
    if (filterType) {
      result = result.filter((t) => t.type === filterType);
    }

    // Filter by search term
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(lowerSearch) ||
          t.category.toLowerCase().includes(lowerSearch)
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'amount-desc':
          return parseFloat(b.amount) - parseFloat(a.amount);
        case 'amount-asc':
          return parseFloat(a.amount) - parseFloat(b.amount);
        default:
          return 0;
      }
    });

    setFilteredTransactions(result);
  }, [transactions, filterType, sortBy, searchTerm]);

  return (
    <div className="transaction-page">
      <div className="transaction-header">
        <h1>Transaction History</h1>
        <p>View and manage all your financial transactions</p>
      </div>

      <TransactionStats transactions={filteredTransactions} />

      <TransactionFilters
        filterType={filterType}
        onFilterTypeChange={setFilterType}
        sortBy={sortBy}
        onSortChange={setSortBy}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <TransactionList transactions={filteredTransactions} />
    </div>
  );
}

export default Transaction;
