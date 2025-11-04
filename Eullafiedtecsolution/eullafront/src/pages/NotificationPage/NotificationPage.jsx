import { useState, useEffect } from 'react';
import axios from 'axios';
import './notificationpage.css';

function NotificationPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'No date';
    
    try {
      const date = new Date(timestamp);
      
      if (isNaN(date.getTime())) return 'Invalid date';
      
      const now = new Date();
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);

      if (diffInMinutes < 1) {
        return 'Just now';
      } else if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
      } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
      } else if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
      } else {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
      }
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return 'Invalid date';
    }
  };

  // Fetch notifications from backend
  useEffect(() => {
    if (!userId || !token) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    axios.get(`http://localhost:8087/api/eullafied/notifications/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log('API Response:', res.data);
      console.log('Response type:', typeof res.data);
      console.log('Is array:', Array.isArray(res.data));
      
      setNotifications(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching notifications:', err);
      console.error('Error status:', err.response?.status);
      console.error('Error message:', err.response?.data);
      
      setNotifications([]);
      setError('Failed to fetch notifications');
      setLoading(false);
    });
  }, [userId, token]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return (
          <svg className="notification-svg-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.41,10.09L6,11.5L11,16.5Z"/>
          </svg>
        );
      case 'warning':
        return (
          <svg className="notification-svg-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
          </svg>
        );
      case 'info':
        return (
          <svg className="notification-svg-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
          </svg>
        );
      case 'error':
        return (
          <svg className="notification-svg-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13,13H11V7H13M12,17.3A1.3,1.3 0 0,1 10.7,16A1.3,1.3 0 0,1 12,14.7A1.3,1.3 0 0,1 13.3,16A1.3,1.3 0 0,1 12,17.3M15.73,3H8.27L3,8.27V15.73L8.27,21H15.73L21,15.73V8.27L15.73,3Z"/>
          </svg>
        );
      default:
        return (
          <svg className="notification-svg-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10,21H14A2,2 0 0,1 12,23A2,2 0 0,1 10,21M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M17,11A5,5 0 0,0 12,6A5,5 0 0,0 7,11V18H17V11Z"/>
          </svg>
        );
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'success': return '#28a745';
      case 'warning': return '#ffc107';
      case 'error': return '#dc3545';
      case 'info': return '#17a2b8';
      default: return '#6c757d';
    }
  };

  // Filter notifications based on read status (using DTO structure)
  const filteredNotifications = Array.isArray(notifications) 
    ? (activeTab === 'all' 
        ? notifications 
        : notifications.filter(notification => !notification.read))
    : [];

  // Mark notification as read - updated for DTO structure
  const markAsRead = (notificationId) => {
    if (!token) return;

    axios.put(`http://localhost:8087/api/eullafied/notifications/user/${userId}/mark`, null, {
      params: { notificationId, read: true },
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
      if (selectedNotification?.id === notificationId) {
        setSelectedNotification({ ...selectedNotification, read: true });
      }
      
      // Trigger sidebar count update immediately
      window.dispatchEvent(new CustomEvent('notificationRead'));
    })
    .catch(err => {
      console.error('Error marking notification as read:', err);
    });
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const renderNotificationDetails = () => {
    if (!selectedNotification) {
      return (
        <div className="notification-placeholder">
          <div className="placeholder-icon">
            <svg className="placeholder-svg-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10,21H14A2,2 0 0,1 12,23A2,2 0 0,1 10,21M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.1 10,4.19 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M17,11A5,5 0 0,0 12,6A5,5 0 0,0 7,11V18H17V11Z"/>
            </svg>
          </div>
          <h3>Select a notification</h3>
          <p>Choose a notification from the list to view its details</p>
        </div>
      );
    }
    
    return (
      <div className="notification-details">
        <div className="notification-details-header">
          <div className="notification-details-icon" style={{ color: getTypeColor(selectedNotification.type) }}>
            {getNotificationIcon(selectedNotification.type)}
          </div>
          <div className="notification-details-info">
            <h2>{selectedNotification.title}</h2>
            <div className="notification-details-meta">
              <span className="notification-timestamp">
                {formatTimestamp(selectedNotification.sentTime)}
              </span>
              <span className={`type-badge type-${selectedNotification.type}`}>
                {selectedNotification.type ? selectedNotification.type.toUpperCase() : ''}
              </span>
              <span className={`status-badge ${selectedNotification.read ? 'read' : 'unread'}`}>
                {selectedNotification.read ? 'Read' : 'Unread'}
              </span>
            </div>
          </div>
        </div>
        <div className="notification-details-body">
          <div className="notification-summary">
            <h4>Message</h4>
            <p>{selectedNotification.message}</p>
          </div>
          {selectedNotification.detail && (
            <div className="notification-full-details">
              <h4>Details</h4>
              <p>{selectedNotification.detail}</p>
            </div>
          )}
        </div>
        <div className="notification-actions">
          {!selectedNotification.read && (
            <button
              className="mark-read-action-btn"
              onClick={() => markAsRead(selectedNotification.id)}
            >
              Mark as Read
            </button>
          )}
          <button className="archive-btn">Archive</button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="notification-page">
        <div className="notification-page-header">
          <h1>Notifications</h1>
        </div>
        <div className="loading-container">
          <p>Loading notifications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="notification-page">
        <div className="notification-page-header">
          <h1>Notifications</h1>
        </div>
        <div className="error-container">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="notification-page">
      <div className="notification-page-header">
        <h1>Notifications</h1>
        <div style={{ marginTop: '80px' }}>
          <div className="file-nav-top">
            <button
              className={`nav-item ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10,21H14A2,2 0 0,1 12,23A2,2 0 0,1 10,21M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.1 10,4.19 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M17,11A5,5 0 0,0 12,6A5,5 0 0,0 7,11V18H17V11Z"/>
              </svg>
              <span className="nav-text">All Notifications</span>
            </button>
            <span className="nav-divider">/</span>
            <button
              className={`nav-item ${activeTab === 'unread' ? 'active' : ''}`}
              onClick={() => setActiveTab('unread')}
            >
              <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z"/>
              </svg>
              <span className="nav-text">Unread</span>
            </button>
          </div>
        </div>
      </div>

      <div className="notification-page-content">
        <div className="notification-content-left">
          <div className="content-header">
            <h2>
              {activeTab === 'all' ? 'All Notifications' : 'Unread Notifications'}
            </h2>
            <div className="notification-count">
              {filteredNotifications.length} notifications
            </div>
          </div>

          <div className="content-body">
            <div className="notification-list">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-list-item ${!notification.read ? 'unread' : ''} ${
                      selectedNotification?.id === notification.id ? 'selected' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="notification-icon" style={{ color: getTypeColor(notification.type) }}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="notification-content">
                      <div className="notification-title">{notification.title}</div>
                      <div className="notification-message">{notification.message}</div>
                      <div className="notification-timestamp">
                        {formatTimestamp(notification.sentTime)}
                      </div>
                    </div>
                    {!notification.read && <div className="unread-indicator"></div>}
                  </div>
                ))
              ) : (
                <div className="no-notifications">
                  <p>No {activeTab === 'unread' ? 'unread ' : ''}notifications found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="notification-content-right">
          {renderNotificationDetails()}
        </div>
      </div>
    </div>
  );
}

export default NotificationPage;