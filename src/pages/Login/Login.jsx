import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import './Login.css';

export default function Login() {
    return (
        <div className="page-container">
            <h1>Hello!</h1>
            <p className="description">Still remember your credentials, I hope?</p>

            {/* Call the component multiple times with different props */}
            <LoginForm />
        </div>
    );
}