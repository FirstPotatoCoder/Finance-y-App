import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import AddEntry from './pages/AddEntry/AddEntry'
import Login from './pages/Login/Login';
import SignUp from './pages/Signup/Signup';
import Page_1 from './pages/Page_1/Page_1';
import Page_2 from './pages/Page_2/Page_2';
import Transaction from './pages/Transaction/Transaction';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="sidebar">
          <Link to="/" className="nav-brand">Finance-y App</Link>
          <div className="nav-links">
            <Link to="/login">Login</Link>
            <Link to="/">Home</Link>
            <Link to="/addEntry">Add Financial Entries</Link>
            <Link to="/transaction">Transaction History</Link>
            <Link to="/page_1">Page 1</Link>
            <Link to="/page_2">Page 2</Link>
          </div>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/addEntry" element={<AddEntry />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/page_1" element={<Page_1 />} />
            <Route path="/page_2" element={<Page_2 />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
