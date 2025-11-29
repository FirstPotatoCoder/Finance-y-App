import React from 'react';
import SignUpForm from '../../components/SignupForm/SignupForm';
import './Signup.css';

export default function SignUp() {
    return (
        <div className="page-container">
            <h1>Hello!</h1>
            <p className="description">Enter Your Credentials, lad.</p>

            {/* our lovely components */}
            <SignUpForm />
        </div>
    );
}