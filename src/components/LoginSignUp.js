// src/components/LoginSignUp.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const LoginSignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(true);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Simple validation
        if (!email || !password) {
            setError('Email and password are required.');
            return;
        }

        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (isSignUp) {
            // Sign Up Logic
            if (storedUser && storedUser.email === email) {
                setError('User already exists. Please log in.');
            } else {
                const newUser = { email, password };
                localStorage.setItem('user', JSON.stringify(newUser));
                alert('Sign-up successful!');
                resetForm();
                navigate('/add-item'); // Navigate to /add-item on successful sign-up
            }
        } else {
            // Login Logic
            if (storedUser && storedUser.email === email && storedUser.password === password) {
                alert('Login successful!');
                resetForm();
                navigate('/add-item'); // Navigate to /add-item on successful login
            } else {
                setError('Invalid email or password.');
            }
        }
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    return (
        <div>
            <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? 'Already have an account? Login' : 'No account? Sign Up'}
            </button>
        </div>
    );
};

export default LoginSignUp;
