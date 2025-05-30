import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateField = (name, value) => {
        let error = '';
        if (name === 'username') {
            if (!value) {
                error = 'Username is required';
            } else if (value.length < 8 || value.length > 20) {
                error = 'Username must be between 8 and 20 characters';
            } else if (!/^[a-zA-Z0-9*%&/]{8,20}$/.test(value)) {
                error = 'Username contains invalid characters';
            }
        } else if (name === 'password') {
            if (!value) {
                error = 'Password is required';
            } else if (value.length < 8 || value.length > 20) {
                error = 'Password must be between 8 and 20 characters';
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[1*5%&/])/.test(value)) {
                error = 'Password must contain at least one lowercase, one uppercase, and one special character (1*5%&/)';
            } else if (/(\d{3,})/.test(value)) {
                error = 'Password cannot contain sequences of three or more numbers';
            }
        }
        return error;
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await login({ username, password });
            if (response.status >= 200 && response.status < 300) {
                localStorage.setItem('isAuthenticated', 'true');

                localStorage.setItem('authCredentials', JSON.stringify({
                    username,
                    password
                }));
                navigate('/home');
                onLoginSuccess();
            } else {
                setErrors({ form: response.data || 'Login failed' });
            }
        } catch (error) {
            let errorMessage = 'Login failed. Please check your credentials.';
            if (error.response) {
                errorMessage = error.response.data || errorMessage;
            } else if (error.request) {
                errorMessage = 'No response from server :(';
            }
            setErrors({ form: errorMessage });
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={handleBlur}
                    />
                    {errors.username && <div className="error">{errors.username}</div>}
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={handleBlur}
                    />
                    {errors.password && <div className="error">{errors.password}</div>}
                </div>
                {errors.form && <div className="error">{errors.form}</div>}
                <button type="submit">Enter</button>
            </form>
        </div>
    );
}

export default Login;