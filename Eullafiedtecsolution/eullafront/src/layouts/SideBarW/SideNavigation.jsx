import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './sidenavigation.css';

function SideNavigation() {
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  // Fetch unread notification count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (!storedUser || !token) return;

      try {
        const userData = JSON.parse(storedUser);
        const userId = userData.user_id;

        const response = await axios.get(`http://localhost:8087/api/eullafied/notifications/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const notifications = Array.isArray(response.data) ? response.data : [];
        const unreadNotifications = notifications.filter(notification => !notification.read);
        setUnreadCount(unreadNotifications.length);
        console.log('Unread count updated:', unreadNotifications.length); // Debug log
      } catch (error) {
        console.error('Error fetching notification count:', error);
        setUnreadCount(0);
      }
    };

    fetchUnreadCount();

    // Listen for notification updates
    const handleNotificationUpdate = () => {
      console.log('Notification read event received, refreshing count...'); // Debug log
      fetchUnreadCount();
    };

    window.addEventListener('notificationRead', handleNotificationUpdate);

    // Refresh count every 30 seconds (optional)
    const interval = setInterval(fetchUnreadCount, 30000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('notificationRead', handleNotificationUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    setShowLogoutModal(false);
  };

  const role = localStorage.getItem('role');
  console.log('User role from localStorage:', role);

  const isUserRole = role === 'USER';

  return (

    <div className="sidebar-layout">
      <aside className="sidebar">
        {/* Top Navigation Icons */}
        <nav className="top-nav">
          <ul>
            <li>
              <NavLink
                to="/workspace/home"
                title="Home"
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/workspace/files"
                title="Files"
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
              </NavLink>
            </li>

            {/* Show different content based on role */}
            {isUserRole ? (
              <>
                <li>
                  <NavLink
                    to="/workspace/notifications"
                    title="Notifications"
                    className={({ isActive }) => isActive ? 'active' : ''}
                  >
                    <div className="nav-icon-container">
                      <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                      </svg>
                      {unreadCount > 0 && (
                        <span className="notification-badge">
                          {unreadCount > 99 ? '99+' : unreadCount}
                        </span>
                      )}
                    </div>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/workspace/messages"
                    title="Messages"
                    className={({ isActive }) => isActive ? 'active' : ''}
                  >
                    <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2M6,9H18V11H6V9M14,14H6V12H14V14M18,8H6V6H18V8Z" />
                    </svg>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/workspace/messages"
                    title="Messages"
                    className={({ isActive }) => isActive ? 'active' : ''}
                  >
                    <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2M6,9H18V11H6V9M14,14H6V12H14V14M18,8H6V6H18V8Z" />
                    </svg>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/workspace/notifications"
                    title="Notifications"
                    className={({ isActive }) => isActive ? 'active' : ''}
                  >
                    <div className="nav-icon-container">
                      <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                      </svg>
                      {unreadCount > 0 && (
                        <span className="notification-badge">
                          {unreadCount > 99 ? '99+' : unreadCount}
                        </span>
                      )}
                    </div>
                  </NavLink>
                </li>

                

                <li>
                  <NavLink
                    to="/workspace/manage-users"
                    title="Manage Users"
                    className={({ isActive }) => isActive ? 'active' : ''}
                  >
                    <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-3.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V20h6v-3.5C23 14.17 18.33 13 16 13z" />
                    </svg>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/workspace/add"
                    title="Add New"
                    className={({ isActive }) => isActive ? 'active' : ''}
                  >
                    <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                  </NavLink>
                </li>
            
              </>
            )}

          </ul>
        
        </nav>

        {/* Bottom Navigation */}
        
        <nav className="bottom-nav">
          <ul>
            <hr></hr>
            <li>
              <NavLink
                to="/workspace/profile"
                title="Profile"
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                </svg>
              </NavLink>
            </li>
            <li>
              <button
                onClick={() => setShowLogoutModal(true)}
                title="Logout"
                className="nav-button"
              >
                <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Content area where pages will be rendered */}
      <main className="content-area">
        <Outlet />
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirm Logout</h3>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to logout?</p>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowLogoutModal(false)}>
                Cancel
              </button>
              <button className="btn-confirm" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}

export default SideNavigation;