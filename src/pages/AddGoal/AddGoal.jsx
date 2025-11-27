import React from 'react';
import { useAuth } from '../../components/AuthContext/AuthContext';
import AddGoalComponent from '../../components/AddGoal/AddGoalComponent';

export default function AddGoalPage({ tempGoals = [], setTempGoals }) {
    const { isLoggedIn, username } = useAuth();
    
    return (
        <AddGoalComponent tempGoals={tempGoals} setTempGoals={setTempGoals} />
    );
}