import React, { useEffect, useState } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import './workspace.css';

function WorkSpace() {
    const [user, setUser] = useState(null); // State to store user details

    useEffect(() => {
        // Retrieve user details from sessionStorage
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Parse the JSON string back into an object
        }
    }, []);

    return (
        <div className="container">
            {/* Navigation Bar */}
            <nav className="navbar d-flex justify-content-between align-items-center py-2 px-3">
                {/* Left - Dropdown with React Icon */}
                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle d-flex align-items-center gap-2"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <FaBars />
                        Menu
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><a className="dropdown-item" href="#home">Home</a></li>
                        <li><a className="dropdown-item" href="#settings">Settings</a></li>
                        <li><a className="dropdown-item" href="#logout">Logout</a></li>
                    </ul>
                </div>

                {/* Right - Profile Icon with User Name */}
                <div className="d-flex align-items-center gap-2">
                    <FaUserCircle size={24} />
                    {user ? <span>{user.user.name}</span> : <span>Loading...</span>}
                </div>
            </nav>

            {/* Main Content */}
            <div className="workSpaceComponent container">
                <div className="workSpaceComponentFix d-flex flex-column align-items-center justify-content-center gap-2">
                    <h1 className="text-center">Work Space</h1>
                    {user ? (
                        <p className="text-center">Welcome, {user.user.name}!</p>
                    ) : (
                        <p className="text-center">Loading user details...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WorkSpace;