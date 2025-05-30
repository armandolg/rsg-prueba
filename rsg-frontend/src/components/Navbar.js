import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar({ onLogout }) {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/');
        onLogout();
    };

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>Home</Link>
                </li>
                <li>
                    <Link to="/transfer" className={location.pathname === '/transfer' ? 'active' : ''}>Transfer</Link>
                </li>
                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;