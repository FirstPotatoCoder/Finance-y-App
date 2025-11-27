import React from 'react';
import { useAuth } from '../../components/AuthContext/AuthContext';
import AddEntryForm from '../../components/AddEntryForm/AddEntryForm';
import './AddEntry.css';

export default function AddEntry({ tempEntries = [], setTempEntries }) {
    const { isLoggedIn, username } = useAuth(); // get login state

    return (
        <div className="entry-container">
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <h1>Financial Entries</h1>
                <p className="description">
                    Add and track your expenses, income, and transfers with ease.
                </p>

                {/* --- Notification --- */}
                {isLoggedIn ? (
                    <p style={{ color: 'green', fontWeight: 'bold' }}>
                        👋 Welcome back, {username}!
                    </p>
                ) : (
                    <p style={{ color: 'orange', fontWeight: 'bold' }}>
                        ⚠️ Login to Make Data Persistent
                    </p>
                )}
            </div>

            {/* --- Add Entry Form --- */}
            <AddEntryForm tempEntries={tempEntries} setTempEntries={setTempEntries} />
        </div>
    );
}