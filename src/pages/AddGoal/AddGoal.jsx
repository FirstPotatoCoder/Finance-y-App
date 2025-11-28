import React from 'react';
import AddGoalComponent from '../../components/AddGoal/AddGoalComponent';

export default function AddGoalPage({ tempGoals = [], setTempGoals }) {    
    return (
        <AddGoalComponent tempGoals={tempGoals} setTempGoals={setTempGoals} />
    );
}