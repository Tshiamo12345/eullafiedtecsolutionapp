import React from 'react';
import { FaHome, FaFile } from 'react-icons/fa'; // Use FaHome instead of FaBars
import { CiSettings } from "react-icons/ci";
import { FaMessage } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import './workspacenavigation.css';

function WorkSpaceNavigation() {
    return (
        <div className="workspace-navigation">
            <div className="workspace-navigation-inner">
                <ul className="navigtion">
                    {/* Home Icon */}
                    <li className="nav-item">
                        <FaHome className="menu-icon" />
                    </li>
                    {/* File Icon */}
                    <li className="nav-item">
                        <FaFile className="file-icon" style={{ fontSize: "2.8rem" }} />
                    </li>
                    {/* Quiz Icon */}
                    <li className="nav-item">
                        <MdQuiz className="menu-icon" style={{ fontSize: "2.8rem" }} />
                    </li>
                    {/* Message Icon */}
                    <li className="nav-item">
                        <FaMessage className="menu-icon" style={{ fontSize: "2.8rem" }} />
                    </li>
                    {/* Notification Icon */}
                    <li className="nav-item">
                        <IoMdNotificationsOutline className="menu-icon" style={{ fontSize: "2.8rem" }} />
                    </li>
                </ul>
                <ul className="profile-nav-bottom">
                    {/* Settings Icon */}
                    <li className="nav-item">
                        <CiSettings className="menu-icon" style={{ fontSize: "2.8rem" }} />
                    </li>
                    {/* Profile Icon at the very bottom */}
                    <li className="nav-item">
                        <FaUserCircle className="menu-icon" style={{ fontSize: "2.8rem" }} />
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default WorkSpaceNavigation;