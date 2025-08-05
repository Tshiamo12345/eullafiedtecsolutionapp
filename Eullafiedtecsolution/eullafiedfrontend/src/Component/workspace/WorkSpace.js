import React, { useEffect, useState } from 'react';
import './workspace.css';
import '../loading/loading.css';
import WorkSpaceNavigation from '../../layout/InterWorkSpaceSideBar/WorkSpaceNavigation';

function WorkSpace() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="workspace-layout-container">
            <div className="workspace-layout-nav">
                <WorkSpaceNavigation />
            </div>
            <div className="workspace-layout-content">
                <div className="main-content">
                    <h1 className='welcome-heading'>
                        Welcome to the WorkSpace{user && user.user && user.user.username ? `, ${user.user.username}` : ""}
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default WorkSpace;