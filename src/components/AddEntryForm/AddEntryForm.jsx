import { useState } from 'react';
import { useAuth } from '../AuthContext/AuthContext';
import './AddEntryForm.css';

export default function AddEntryForm({ tempEntries, setTempEntries }) {
    const { isLoggedIn, username } = useAuth();
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");
    const [message, setMessage] = useState();

    const handleSave = (e) => {
        e.preventDefault();

        if (!type || !category || !amount || !date) {
            setMessage("❌ Please fill in Type, Category, Amount, and Date.");
            return;
        }

        const entry = { 
            type, 
            category, 
            amount: Number(amount), 
            date, 
            note 
        };

        if (isLoggedIn) {
            // load existing financeData (all users)
            const savedData = JSON.parse(localStorage.getItem("financeData")) || {};

            // select the right user (set a new one if does not exist)
            const userData = savedData[username] || { transactions: [], goals: [] };

            //push new entry to transactions
            userData.transactions.push(entry);

            // save back
            savedData[username] = userData;
            localStorage.setItem("financeData", JSON.stringify(savedData));

        } else {
            // if guest mode update temporary entries
            setTempEntries([...tempEntries, entry]);
        }

        setMessage("✅ Entry saved successfully!");

        // Reset form
        setType("");
        setCategory("");
        setAmount("");
        setDate("");
        setNote("");
    };

    return (
        <form className="grid-form" onSubmit={handleSave}>
            <div className="form-item">
                <label>Type:</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="">Select type...</option>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                    <option value="transfer">Transfer</option>
                </select>
            </div>

            <div className="form-item">
                <label>Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select category...</option>
                    <option value="groceries">Groceries</option>
                    <option value="rent">Rent</option>
                    <option value="transportation">Transportation</option>
                    <option value="salary">Salary</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="utilities">Utilities</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div className="form-item">
                <label>Amount:</label>
                <input type="number" placeholder='666' value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>

            <div className="form-item">
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div className="form-item full-row">
                <label>Note:</label>
                <input type="text" placeholder='Magically Appeared' value={note} onChange={(e) => setNote(e.target.value)} />
            </div>

            <button className="save-btn" type="submit">💰 Save</button>

            {message && <div className="message">{message}</div>}
        </form>
    );
}