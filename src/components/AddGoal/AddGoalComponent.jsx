import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext/AuthContext';
import './AddGoal.css';

export default function AddGoalComponent({ tempGoals = [], setTempGoals }) {

    // get auth state and username
    const { isLoggedIn, username } = useAuth();
    const [goalName, setGoalName] = useState("");
    const [goals, setGoals] = useState([]);
    const [targetAmount, setTargetAmount] = useState("");
    const [currentAmount, setCurrentAmount] = useState("");
    const [deadline, setDeadline] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [editingGoalId, setEditingGoalId] = useState(null);
    const [editAmount, setEditAmount] = useState("");

    // Load goals goal from local strorage when user logged in 
    useEffect(() => {

        let loadedGoals = [];
        if (isLoggedIn) {
            // load goals from lacal storage
            const savedData = JSON.parse(localStorage.getItem("financeData")) || {};
            const userData = savedData[username] || { transactions: [], goals: [] };
            loadedGoals = userData.goals;
        } else {
            // use temp gaol if guest mode
            loadedGoals = tempGoals || [];
        }

        setGoals(loadedGoals);

    }, [isLoggedIn, username, tempGoals]);
    // validate and create new goal

    const handleSave = (e) => {

        e.preventDefault();
        // check fields input
        if (!goalName || !targetAmount || !deadline) {
            setMessage("❌ Please fill in Goal Name, Target Amount, and Deadline.");
            return;
        }

        // converting input
        const target = Number(targetAmount);
        const current = currentAmount ? Number(currentAmount) : 0;

        // validate and set message based on input
        if (target <= 0) {
            setMessage("❌ Target amount must be greater than 0.");
            return;
        }

        if (current < 0) {
            setMessage("❌ Current amount cannot be negative.");
            return;
        }

        if (current > target) {
            setMessage("❌ Current amount cannot exceed target amount.");
            return;
        }

        // create goal obj
        const goal = {
            id: Date.now(),
            goalName,
            targetAmount: target,
            currentAmount: current,
            deadline,
            description,
            createdAt: new Date().toISOString()
        };

        let updatedGoals = [];

        if (isLoggedIn) {
            // save goal to local storage
            const savedData = JSON.parse(localStorage.getItem("financeData")) || {};
            const userData = savedData[username] || { transactions: [], goals: [] };

            updatedGoals = [...userData.goals, goal];
            savedData[username] = { ...userData, goals: updatedGoals };

            localStorage.setItem("financeData", JSON.stringify(savedData));
        } else {
            // if Guest mode update temp state
            updatedGoals = [...tempGoals, goal];

            if (setTempGoals) {
                setTempGoals(updatedGoals);
            }
        }

        setGoals(updatedGoals);
        setMessage("✅ Goal created successfully!");
        // Reset form after submition
        setGoalName("");
        setTargetAmount("");
        setCurrentAmount("");
        setDeadline("");
        setDescription("");
        // Clear message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
    };


    // delete goal fnc 
    const handleDelete = (goalId) => {
        let updatedGoals = [];

        if (isLoggedIn) {
            const savedData = JSON.parse(localStorage.getItem("financeData")) || {};
            const userData = savedData[username] || { transactions: [], goals: [] };

            updatedGoals = userData.goals.filter(g => g.id !== goalId);
            savedData[username] = { ...userData, goals: updatedGoals };

            localStorage.setItem("financeData", JSON.stringify(savedData));
        } else {
            updatedGoals = tempGoals.filter(goal => goal.id !== goalId);
            if (setTempGoals) {
                setTempGoals(updatedGoals);
            }
        }

        setGoals(updatedGoals);
    };

    // start edit
    const handleStartEdit = (goal) => {
        setEditingGoalId(goal.id);
        setEditAmount(goal.currentAmount.toString());
    };

    // cancel edit
    const handleCancelEdit = () => {
        setEditingGoalId(null);
        setEditAmount("");
    };

    const handleUpdateAmount = (goalId) => {
        if (!editAmount || editAmount === "") {
            setMessage("❌ Please enter an amount.");
            return;
        }

        const newAmount = Number(editAmount);

        // validate input
        if (newAmount < 0) {
            setMessage("❌ Amount cannot be negative.");
            return;
        }

        let updatedGoals = [];

        if (isLoggedIn) {
            const savedData = JSON.parse(localStorage.getItem("financeData")) || {};
            const userData = savedData[username] || { transactions: [], goals: [] };

            updatedGoals = userData.goals.map(goal => {
                if (goal.id === goalId) {
                    const target = goal.targetAmount;
                    const finalAmount = newAmount > target ? target : newAmount;
                    return { ...goal, currentAmount: finalAmount };
                }
                return goal;
            });

            savedData[username] = { ...userData, goals: updatedGoals };
            localStorage.setItem("financeData", JSON.stringify(savedData));
        } else {
            // update gaol in temp
            updatedGoals = tempGoals.map(goal => {
                if (goal.id === goalId) {
                    const target = goal.targetAmount;
                    const finalAmount = newAmount > target ? target : newAmount;
                    return { ...goal, currentAmount: finalAmount };
                }
                return goal;
            });
            if (setTempGoals) {
                setTempGoals(updatedGoals);
            }
        }

        setGoals(updatedGoals);
        setEditingGoalId(null);
        setEditAmount("");
        setMessage("✅ Amount updated successfully!");
        
        // Clear message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
    };

    // calculate into %
    const calculateProgress = (current, target) => {
        return Math.min((current / target) * 100, 100).toFixed(1);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    // calculate due date
    const isOverdue = (deadline) => {
        return new Date(deadline) < new Date();
    };
    return (
        <div className="add-goal-container">
            {message && <div className="message">{message}</div>}
            
            {/* Add Goal Form */}
            <div className="form-section">
                <h2>Create New Goal</h2>
                {!isLoggedIn && (
                    <p className="guest-warning-goal">⚠️ Login to Make Goals Persistent</p>
                )}
                <form className="goal-form" onSubmit={handleSave}>
                    <div className="form-item">
                        <label>Goal Name:</label>
                        <input 
                            type="text" 
                            value={goalName} 
                            onChange={(e) => setGoalName(e.target.value)}
                            placeholder="e.g., Vacation Fund"
                        />
                    </div>

                    {/* ammont to save */}
                    <div className="form-item">
                        <label>Target Amount ($):</label>
                        <input 
                            type="number" 
                            value={targetAmount} 
                            onChange={(e) => setTargetAmount(e.target.value)}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="form-item">
                        <label>Current Amount ($):</label>
                        <input 
                            type="number" 
                            value={currentAmount} 
                            onChange={(e) => setCurrentAmount(e.target.value)}
                            placeholder="0.00 (optional)"
                            min="0"
                            step="0.01"
                        />
                    </div>
                    
                    {/* goal deadline */}
                    <div className="form-item">
                        <label>Deadline:</label>
                        <input 
                            type="date" 
                            value={deadline} 
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </div>

                    <div className="form-item full-row">
                        <label>Description (optional):</label>
                        <input 
                            type="text" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add a note about this goal..."
                        />
                    </div>

                    <button className="save-btn" type="submit">🎯 Create Goal</button>
                </form>
            </div>

            {/* list the existing goals  */}
            <div className="goals-section">
                <h2>Active Goals</h2>
                
                {/* no goal style */}
                {goals.length === 0 ? (
                    <div className="goals-list empty">
                        <p>No goals yet. Create your first goal below!</p>
                    </div>
                ) : (
                    <div className="goals-list">
                        {goals.map((goal) => {
                            const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
                            const remaining = goal.targetAmount - goal.currentAmount;
                            const overdue = isOverdue(goal.deadline);
                            
                            return (
                                // Card and delete btn
                                <div key={goal.id} className="goal-card">
                                    <div className="goal-header">
                                        <h3>{goal.goalName}</h3>
                                        <button 
                                            className="delete-goal-btn" 
                                            onClick={() => handleDelete(goal.id)}
                                            title="Delete goal"
                                        >
                                            ×
                                        </button>
                                    </div>
                                    
                                    {goal.description && (
                                        <p className="goal-description">{goal.description}</p>
                                    )}
                                    
                                    {/* progess bar */}
                                    <div className="goal-progress">
                                        <div className="progress-bar-container">
                                            <div 
                                                className="progress-bar" 
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>

                                        {/* current amount and progress */}
                                        <div className="progress-text">
                                            <span>${goal.currentAmount.toLocaleString()}</span>
                                            <span> / </span>
                                            <span>${goal.targetAmount.toLocaleString()}</span>
                                            <span className="progress-percent"> ({progress}%)</span>
                                        </div>
                                    </div>
                                    
                                    {/* goal details, date and remainign */}
                                    <div className="goal-details">
                                        <div className="goal-detail-item">
                                            <strong>Remaining:</strong> ${remaining.toLocaleString()}
                                        </div>
                                        <div className={`goal-detail-item ${overdue ? 'overdue' : ''}`}>
                                            <strong>Deadline:</strong> {formatDate(goal.deadline)}
                                            {overdue && <span className="overdue-badge">Overdue</span>}
                                        </div>
                                    </div>

                                    {/* Update Amount Section */}
                                    <div className="update-amount-section">
                                        {editingGoalId === goal.id ? (
                                            // save/cancel
                                            <div className="update-amount-form">
                                                <div className="update-input-group">
                                                    <label>Update Current Amount:</label>
                                                    <input
                                                        type="number"
                                                        value={editAmount}
                                                        onChange={(e) => setEditAmount(e.target.value)}
                                                        placeholder="Enter new amount"
                                                        min="0"
                                                        step="0.01"
                                                        className="update-amount-input"
                                                    />
                                                </div>
                                                <div className="update-buttons">
                                                    <button
                                                        type="button"
                                                        className="save-update-btn"
                                                        onClick={() => handleUpdateAmount(goal.id)}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="cancel-update-btn"
                                                        onClick={handleCancelEdit}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button
                                                className="update-amount-btn"
                                                onClick={() => handleStartEdit(goal)}
                                            >
                                                💰 Update Amount
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}