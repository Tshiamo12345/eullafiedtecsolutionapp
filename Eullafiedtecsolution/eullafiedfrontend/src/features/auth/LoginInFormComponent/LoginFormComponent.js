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

            localStorage.setItem('user', JSON.stringify(user));

            if (user.user.role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/workSpace');
            }
        } catch (err) {
            console.error('Login failed:', err.response?.data || err.message);
            if (err.response && err.response.status === 401) {
                setError('Account is locked');
            } else {
                setError(err.response?.data?.message || 'Invalid username or password');
            }
        }
    };

    return (
        <div className="login-form-container">
            <div className="loginFormComponent">
                <div className="loginFormComponentFix">
                    {error && <p className="text-danger">{error}</p>}
                    <form className="login-form-box" onSubmit={handleSubmit}>
                        <h1 className="mb-4 text-center">Login</h1>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-check mb-3">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="rememberMe"
                                name="rememberMe"
                            />
                            <label className="form-check-label" htmlFor="rememberMe">
                                Remember Me
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary w-150">Login</button>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                            <a href="/forgot-password" className="text-primary">Forgot password?</a>
                            <a href="/signup" className="text-primary ms-2">Sign up?</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginFormComponent;