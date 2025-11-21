// frontend-intern-ui/src/App.jsx
import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import TaskDashboard from './components/TaskDashboard';
import './styles.css'; // Import the new centralized styles

function App() {
    // Initialize user state from localStorage if a session exists
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const handleAuthSuccess = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <div className="App">
            <h1>Backend Intern Project Dashboard</h1>
            
            {user ? (
                // Protected Dashboard (Shown after successful login)
                <TaskDashboard user={user} onLogout={handleLogout} />
            ) : (
                // Login/Register Screen
                <AuthForm onAuthSuccess={handleAuthSuccess} />
            )}
        </div>
    );
}

export default App;