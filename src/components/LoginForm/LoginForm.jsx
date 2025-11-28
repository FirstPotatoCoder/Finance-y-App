    import { useState } from 'react';
    import { Link, useNavigate } from "react-router-dom";
    import { useAuth } from '../AuthContext/AuthContext';
    import './LoginForm.css';

    export default function Login() {
        const { login } = useAuth();
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [showPassword, setShowPassword] = useState(false);
        const [message, setMessage] = useState();
        const navigate = useNavigate();

        const handleLogin = (e) => {
            e.preventDefault();

            if (!username || !password) {
                setMessage("❌ Please fill in Username and Password!");
                return;
            }

            const existing = JSON.parse(localStorage.getItem("user_credentials")) || [];

            const match = existing.find(
                (user) => user.username === username && user.password === password
            );

            if (match) {
                login(username);  // 👈 save username globally
                setMessage("✅ Login successful!");
                navigate("/"); // or "/home" if that’s your home route
            } else {
                setMessage("❌ Invalid username or password");
            }
        };

        return (
            <form className="grid-form" onSubmit={handleLogin}>
                <div className="form-item full-row">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                </div>

                <div className="form-item full-row password-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />

                    {/* Eye toggle button */}
                    <button
                        type="button"
                        className="eye-btn"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                </div>

                <button type="submit" className="submit-btn">Login</button>

                {message && (
                    <div className="message full-row">
                        {message}
                    </div>
                )}

                {/* New plain-text buttons */}
                <div className="extra-links">
                    <Link to="/signup" className="text-link">Sign Up</Link>
                </div>

            </form>
        );
    }