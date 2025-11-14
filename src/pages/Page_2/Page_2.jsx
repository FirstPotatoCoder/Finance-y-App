import React from 'react';
import FinanceStorage from '../../components/Component_3/Component_3';
import './Page_2.css';

export default function Page_2() {
    return (
        <div className="page-container">
            <h1>Finance Dashboard</h1>
            <p className="description">Manage your financial data securely with LocalStorage</p>

            {/* Call the component multiple times with different props */}
            <FinanceStorage 
                title="Stock Portfolio" 
                description="Track your favorite stock symbols" 
                defaultKey="AAPL" 
                defaultValue="Apple Inc."
            />

            <FinanceStorage 
                title="Bank Accounts" 
                description="Store your account IDs or numbers" 
                defaultKey="Checking" 
                defaultValue="123456789"
            />

            <FinanceStorage 
                title="Monthly Budget" 
                description="Keep your budget categories here" 
                defaultKey="Groceries" 
                defaultValue="500"
            />
        </div>
    );
}