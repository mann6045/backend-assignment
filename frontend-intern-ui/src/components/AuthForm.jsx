// frontend-intern-ui/src/components/AuthForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1/auth';

const AuthForm = ({ onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const endpoint = isLogin ? 'login' : 'register';
        const payload = { email, password };
        
        try {
            const response = await axios.post(`${API_BASE_URL}/${endpoint}`, payload);
            setMessage(response.data.message);

            if (isLogin && response.data.token) {
                // Save JWT and user data to localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                onAuthSuccess(response.data.user);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An unknown error occurred. Check your server connection.');
        }
    };

    return (
        <div className="auth-container">
            <h3>{isLogin ? 'Log In to Access Dashboard' : 'Create New Account'}</h3>
            
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
                <button type="submit">{isLogin ? 'Log In' : 'Register'}</button>
            </form>

            <button onClick={() => setIsLogin(!isLogin)} style={{ marginTop: '15px' }}>
                {isLogin ? 'Need to register?' : 'Already have an account?'}
            </button>

            {/* Display messages based on API response */}
            {message && <p className="message success">{message}</p>}
            {error && <p className="message error">{error}</p>}
        </div>
    );
};

export default AuthForm;