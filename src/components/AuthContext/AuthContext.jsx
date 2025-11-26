import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(
        JSON.parse(localStorage.getItem("isLoggedIn")) || false
    );

    const [username, setUsername] = useState(
        localStorage.getItem("username") || ""
    );

    const navigate = useNavigate();

    const login = (name) => {
        setIsLoggedIn(true);
        setUsername(name);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("username", name);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUsername("");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        navigate("/login");

    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}