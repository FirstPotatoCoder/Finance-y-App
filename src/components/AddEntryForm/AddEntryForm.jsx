import { useState } from 'react';
import './AddEntryForm.css';

export default function AddEntryForm() {
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");
    const [message, setMessage] = useState();

    const handleSave = (e) => {
        e.preventDefault();

        // Basic validation
        if (!type || !category || !amount || !date) {
            setMessage("❌ Please fill in Type, Category, Amount, and Date.");
            return;
        }

        // Build an entry object
        const entry = {
            type,
            category,
            amount: Number(amount),
            date,
            note,
        };

        try {
            // Save to localStorage as an array
            const existing = JSON.parse(localStorage.getItem("financeEntries")) || [];
            existing.push(entry);

            localStorage.setItem("financeEntries", JSON.stringify(existing));

            setMessage("✅ Entry saved successfully!");

            // Clear form
            setType("");
            setCategory("");
            setAmount("");
            setDate("");
            setNote("");

        } catch (error) {
            setMessage(`❌ Failed to save: ${error.message}`);
        }
    };

    return (
        <form onSubmit={handleSave} className="grid-form">
            <div className="form-item">
                <label>Type:</label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    style={{ color: type === "" ? "#999" : "#333" }}
                >
                    <option value="">Select type...</option>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                    <option value="transfer">Transfer</option>
                </select>
            </div>

            <div className="form-item">
                <label>Category:</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ color: category === "" ? "#999" : "#333" }}
                >
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
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g., 50"
                />
            </div>

            <div className="form-item">
                <label>Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>

            <div className="form-item full-row">
                <label>Note:</label>
                <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Optional details"
                />
            </div>

            <button type="submit" className="save-btn">💰 Save</button>

            {/* --- Message Display --- */}
            {message && <div className="message">{message}</div>}
        </form>
    );
}