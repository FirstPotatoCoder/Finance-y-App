import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/AuthContext/AuthContext';
import TransactionList from '../../components/Transaction/TransactionList';
import TransactionFilters from '../../components/Transaction/TransactionFilters';
import TransactionStats from '../../components/Transaction/TransactionStats';
import './Transaction.css';

export default function Transaction({ tempEntries }) {
    const { isLoggedIn, username } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [filterType, setFilterType] = useState('');
    const [sortBy, setSortBy] = useState('date-desc');
    const [searchTerm, setSearchTerm] = useState('');

    // Load transactions
    useEffect(() => {
        let entries = [];

        if (isLoggedIn) {
            // Load unified financeData
            const saved = JSON.parse(localStorage.getItem("financeData")) || {};

            // Ensure user exists & has transactions array
            const userData = saved[username] || { transactions: [], goals: [] };

            entries = userData.transactions;
        } else {
            // Guest mode
            entries = tempEntries || [];
        }

        // Map entries to the UI format
        const mapped = entries.map((entry) => ({
            date: entry.date,
            description: entry.note || entry.category,
            type: entry.type.charAt(0).toUpperCase() + entry.type.slice(1),
            amount: entry.amount,
            category: entry.category.charAt(0).toUpperCase() + entry.category.slice(1),
        }));

        setTransactions(mapped);
    }, [isLoggedIn, username, tempEntries]);

    // Filter + sort
    useEffect(() => {
        let result = [...transactions];

        if (filterType) result = result.filter((t) => t.type === filterType);

        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            result = result.filter(
                (t) =>
                    t.description.toLowerCase().includes(lower) ||
                    t.category.toLowerCase().includes(lower)
            );
        }

        result.sort((a, b) => {
            switch (sortBy) {
                case 'date-desc': return new Date(b.date) - new Date(a.date);
                case 'date-asc': return new Date(a.date) - new Date(b.date);
                case 'amount-desc': return b.amount - a.amount;
                case 'amount-asc': return a.amount - b.amount;
                default: return 0;
            }
        });

        setFilteredTransactions(result);
    }, [transactions, filterType, sortBy, searchTerm]);

    return (
        <div className="transaction-page">
            <div className="transaction-header">
                <h1>Transaction History</h1>
                {!isLoggedIn && <p style={{ color: 'orange' }}>⚠️ Guest Mode: Entries are Temporary</p>}
                {
                isLoggedIn && 
                <p style={{ color: 'green', fontWeight: 'bold' }}>
                    👋 Welcome back, {username}!
                </p>
                }
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