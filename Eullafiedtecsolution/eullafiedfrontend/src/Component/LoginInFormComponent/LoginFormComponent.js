import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginFormComponent.css';

function LoginFormComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8087/api/eullafied/user/login', {
                username,
                password,
            });

            const user = response.data;
            console.log('Login successful. Token:', user.token);

            sessionStorage.setItem('user', JSON.stringify(user));

            if (user.user.role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/workSpace');
            }
        } catch (err) {
            console.error('Login failed:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Invalid username or password');
        }
    };

    return (
        <div className="loginFormComponent">
            <div className="loginFormComponentFix">
                <h1>Login</h1>
                {error && <p className="text-danger">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
                
                <li>
                    Forgot Password?
                </li>
            </div>
        </div>
    );
}

export default LoginFormComponent;