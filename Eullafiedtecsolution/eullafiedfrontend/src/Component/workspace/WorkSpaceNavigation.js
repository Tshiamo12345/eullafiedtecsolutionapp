import React from 'react';
import { FaBars, FaFile } from 'react-icons/fa'; // Import the menu and file icons
import './workspacenavigation.css'; // Import the CSS file for styling
import { CiSettings } from "react-icons/ci";
import { FaMessage } from "react-icons/fa6";
function WorkSpaceNavigation() {
    return (
        <div className="workspace-navigation">
            <div>
                <ul className="navigtion">
                    {/* Menu Icon */ }
                    <li className="nav-item">
                        <FaBars className="menu-icon" /> {/* Menu icon */}
                    </li>
                    {/* File Icon */}
                    <li className="nav-item">
                        <FaFile className="file-icon" />
                    </li>
                    {/* Profile Image */}
                    <li className="nav-item">
                        <img
                            src={require('../../images/companyImage.jpg')} // Adjusted path to go up two directories and into the "image" folder
                            alt="Profile"
                            className="profile-image"
                        />
                    </li>
                    <li className="nav-item"><CiSettings className="menu-icon" /></li>
                    <li className="nav-item"><FaMessage className="menu-icon" /></li>
                </ul>
            </div>
        </div>
    );
}

export default WorkSpaceNavigation;