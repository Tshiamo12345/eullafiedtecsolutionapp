import React, { useEffect, useState } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import './workspace.css';
import WorkSpaceNavigation from './WorkSpaceNavigation'; // Import the WorkSpaceNavigation component
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
            <WorkSpaceNavigation /> {/* Include the WorkSpaceNavigation component */}
            <div className="container ml-5 mt-5">
                <h1>Welcome to the WorkSpace</h1>
            </div>
            
        </div>
    );
}

export default WorkSpace;