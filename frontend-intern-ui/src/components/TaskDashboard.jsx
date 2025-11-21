// frontend-intern-ui/src/components/TaskDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1/tasks';

const TaskDashboard = ({ user, onLogout }) => {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const api = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

    const notify = (msg, isError = false) => {
        if (isError) {
            setError(msg);
            setMessage('');
        } else {
            setMessage(msg);
            setError('');
        }
    }

    const fetchTasks = async () => {
        try {
            const response = await api.get('/');
            setTasks(response.data);
            notify('Tasks loaded successfully.');
        } catch (err) {
            notify('Failed to load tasks.', true);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            await api.post('/', { title: newTaskTitle });
            setNewTaskTitle('');
            fetchTasks();
            notify('Task created!');
        } catch (err) {
            notify(err.response?.data?.message || 'Failed to create task.', true);
        }
    };

    const handleToggleComplete = async (task) => {
        try {
            await api.put(`/${task.id}`, { isCompleted: !task.isCompleted });
            fetchTasks();
        } catch (err) {
            notify(err.response?.data?.message || 'Failed to update task.', true);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        try {
            await api.delete(`/${id}`);
            fetchTasks();
            notify('Task deleted!');
        } catch (err) {
            notify(err.response?.data?.message || 'Failed to delete task.', true);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <div className="dashboard-header">
                <h2>Welcome, {user.email} ({user.role})</h2>
                <button onClick={onLogout}>Logout</button>
            </div>
            
            {message && <p className="message success">{message}</p>}
            {error && <p className="message error">{error}</p>}

            <div className="task-form-container">
                <form onSubmit={handleCreateTask}>
                    <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="New Task Title"
                        required
                    />
                    <button type="submit">Add Task</button>
                </form>
            </div>

            <div className="task-list">
                <h3>Your Tasks</h3>
                {tasks.length === 0 ? (
                    <p style={{ marginTop: '20px' }}>No tasks found. Create one above!</p>
                ) : (
                    <ul>
                        {tasks.map((task) => (
                            <li key={task.id} >
                                
                                <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none', flexGrow: 1 }}>
                                    {task.title}
                                </span>
                                
                                <div>
                                    <button onClick={() => handleToggleComplete(task)}>
                                        {task.isCompleted ? 'Undo' : 'Complete'}
                                    </button>
                                    <button onClick={() => handleDelete(task.id)} style={{ backgroundColor: 'red' }}>
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default TaskDashboard;