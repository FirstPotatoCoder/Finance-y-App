import { useState } from 'react';
import './Component_3.css';

export default function FinanceStorage({ title = "Finance Dashboard", description = "Store your financial data securely", defaultKey = "", defaultValue = "" }) {
    const [key, setKey] = useState(defaultKey);
    const [value, setValue] = useState(defaultValue);
    const [message, setMessage] = useState('');

    const handleSave = (e) => {
        e.preventDefault();
        if (!key || !value) {
            setMessage('❌ Please enter both a key and a value.');
            return;
        }
        try {
            localStorage.setItem(key, value);
            setMessage(`✅ Saved "${key}" with value "${value}" successfully!`);
            setKey('');
            setValue('');
        } catch (error) {
            setMessage(`❌ Failed to save: ${error.message}`);
        }
    };

    return (
        <div className="section">
            <h3>Save Financial Data</h3>
            <form onSubmit={handleSave}>
                <div>
                    <label>Data Key:</label>
                    <input
                        type="text"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        placeholder="e.g., stockSymbol, accountID, budget"
                    />
                </div>
                <div>
                    <label>Data Value:</label>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="e.g., AAPL, 123456, 5000"
                    />
                </div>
                <button type="submit">💰 Save to LocalStorage</button>
            </form>
        </div>
    );
}