import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Transfer from './components/Transfer';
import Navbar from './components/Navbar';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(auth);
        if (auth) {
            navigate('/home');
        }
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/home');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('authCredentials');
        navigate('/');
    };

    return (
        <div className="App">
            {isAuthenticated && <Navbar onLogout={handleLogout} />}
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login onLoginSuccess={handleLogin} />} />
                <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
                <Route path="/transfer" element={isAuthenticated ? <Transfer /> : <Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;