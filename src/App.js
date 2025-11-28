import {Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import { useAuth } from './components/AuthContext/AuthContext'; // make sure path is correct

// Pages
import DashboardPage from './pages/DashboardPage/DashboardPage';
import AddEntry from './pages/AddEntry/AddEntry'
import Login from './pages/Login/Login';
import SignUp from './pages/Signup/Signup';
import Transaction from './pages/Transaction/Transaction';
import Profile from './pages/Profile/Profile';
import AddGoal from './pages/AddGoal/AddGoal';

function App() {
  const [tempEntries, setTempEntries] = useState([]);
  const [tempGoals, setTempGoals] = useState([]);
  const { isLoggedIn } = useAuth(); // get login state

  return (
    <div className="App">
      <nav className="sidebar">
        <Link to="/" className="nav-brand">Finance-y App</Link>
        <div className="nav-links">
          {!isLoggedIn && <Link to="/login">Login</Link>}
          {isLoggedIn && <Link to="/profile">Profile</Link>}
          
          <Link to="/">Dashboard</Link>
          <Link to="/transaction">Transaction History</Link>
          <Link to="/addEntry">Add Financial Entries</Link>
          <Link to="/addGoal">Add Goals</Link>
        </div>
      </nav>

      <main className="content">
        <Routes> 
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<DashboardPage tempEntries={tempEntries} tempGoals={tempGoals} />} />
          <Route 
            path="/addEntry" 
            element={<AddEntry tempEntries={tempEntries} setTempEntries={setTempEntries} />} 
          />
          <Route 
            path="/transaction" 
            element={<Transaction tempEntries={tempEntries} />} 
          />
          <Route path="/signup" element={<SignUp />} />
          <Route 
            path="/addGoal" 
            element={<AddGoal tempGoals={tempGoals} setTempGoals={setTempGoals} />} 
          />

          {isLoggedIn && <Route path="/profile" element={<Profile />} />}
        </Routes>
      </main>
    </div>
  );
}

export default App;