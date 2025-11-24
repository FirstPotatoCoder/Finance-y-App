import React from 'react';
import AddEntryForm from '../../components/AddEntryForm/AddEntryForm';
import './AddEntry.css';

export default function AddEntry() {
    return (
        <div className="entry-container">
            <h1>Financial Entries</h1>
            <p className="description">Add and track your expenses, income, and transfers easily using LocalStorage.</p>

            {/* Call the component multiple times with different props */}
            <AddEntryForm />
        </div>
    );
}