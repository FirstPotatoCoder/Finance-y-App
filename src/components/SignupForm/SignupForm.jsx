import { useState } from 'react';
import { Link } from "react-router-dom";
import './SignupForm.css';

export default function SignUpForm() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");

    const validateEmail = (email) => {
        // Simple regex for basic email validation
        return /^\S+@\S+\.\S+$/.test(email);
    }

    const handleSignUp = (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !username || !password) {
            setMessage("❌ Please fill in Email, Username, and Password!");
            return;
        }

        if (!validateEmail(email)) {
            setMessage("❌ Please enter a valid email address.");
            return;
        }

        try {
            // Load existing credentials from localStorage
            const existing = JSON.parse(localStorage.getItem("user_credentials")) || [];

            // Check if username already exists (case-insensitive)
            const duplicate = existing.find(
                user => user.username.toLowerCase() === username.toLowerCase()
            );

            if (duplicate) {
                setMessage("❌ Username already exists! Please choose another.");
                return;
            }

            // Create new user object
            const newUser = { 
                email, 
                username, 
                password,
                registrationDate: new Date().toISOString()
             };

            // Save updated array back to localStorage
            existing.push(newUser);
            localStorage.setItem("user_credentials", JSON.stringify(existing));

            setMessage("✅ Sign Up successful!");
            // Clear form
            setEmail("");
            setUsername("");
            setPassword("");

        } catch (error) {
            setMessage(`❌ Failed to save: ${error.message}`);
        }
    };

    return (
        <form className="grid-form" onSubmit={handleSignUp}>

            <div className="form-item full-row">
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                />
            </div>

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
                <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? "🙈" : "👁️"}
                </button>
            </div>

            <button type="submit" className="submit-btn">Sign Up</button>

            {message && (
                <div className="message full-row">{message}</div>
            )}

            <div className="extra-links">
                <Link to="/login" className="text-link">Login</Link>
            </div>

        </form>
    );
}