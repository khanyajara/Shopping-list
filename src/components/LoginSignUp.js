import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const LoginSignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
    const [username, setUsername] = useState(''); // New state for username
    const [isSignUp, setIsSignUp] = useState(true);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Simple validation
        if (!email || !password || (isSignUp && !username) || (isSignUp && !confirmPassword)) {
            setError('All fields are required.');
            return;
        }

        if (isSignUp && password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (isSignUp) {
            // Sign Up Logic
            if (storedUser && storedUser.email === email) {
                setError('User already exists. Please log in.');
            } else {
                const newUser = { email, password, username }; // Include username in user data
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
        setConfirmPassword(''); // Reset confirm password
        setUsername(''); // Reset username
    };

    return (
        <div className="form-container">
            <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                {isSignUp && (
                    <>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                        />
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            required
                        />
                    </>
                )}
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
            {error && <p className="error">{error}</p>}
            <button className="toggle-button" onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? 'Already have an account? Login' : 'No account? Sign Up'}
            </button>
        </div>
    );
    
};

export default LoginSignUp;
