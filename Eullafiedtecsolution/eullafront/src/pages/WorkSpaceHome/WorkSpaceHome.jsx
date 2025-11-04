import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfilePicture } from '../../utils/User/UserApi';
import './workspace.css';

function WorkSpaceHome() {
  const [userData, setUserData] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isLoadingProfilePicture, setIsLoadingProfilePicture] = useState(true);
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserData(user);
        setName(user.name);
        
        // Fetch profile picture using the API function
        if (user.user_id) {
          fetchProfilePicture(user.user_id);
        } else {
          setIsLoadingProfilePicture(false);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        setIsLoadingProfilePicture(false);
      }
    } else {
      setIsLoadingProfilePicture(false);
    }
  }, []);

  const fetchProfilePicture = async (userId) => {
    if (!userId) {
      setProfilePicture(null);
      setIsLoadingProfilePicture(false);
      return;
    }

    setIsLoadingProfilePicture(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('No token found');
        setProfilePicture(null);
        setIsLoadingProfilePicture(false);
        return;
      }

      // Use the API function to get profile picture
      const imageUrl = await getProfilePicture(userId, token);
      setProfilePicture(imageUrl);

      // Also store in localStorage for faster subsequent loads
      if (imageUrl) {
        localStorage.setItem('profilePicture', imageUrl);
      } else {
        localStorage.removeItem('profilePicture');
      }

    } catch (error) {
      console.error('Error fetching profile picture:', error);
      setProfilePicture(null);
      localStorage.removeItem('profilePicture');
    } finally {
      setIsLoadingProfilePicture(false);
    }
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleProfileNavigation = () => {
    navigate('/workspace/profile');
    setShowProfileDropdown(false);
  };

  const handleLogout = () => {
    // Clean up blob URL before logout
    if (profilePicture && profilePicture.startsWith('blob:')) {
      URL.revokeObjectURL(profilePicture);
    }
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('profilePicture');
    navigate('/login');
  };

  // Generate initials from user name if no profile picture
  const getInitials = (userName) => {
    if (!userName) return 'U';
    const names = userName.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return userName.substring(0, 2).toUpperCase();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileDropdown && !event.target.closest('.profile-section')) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);

  // Cleanup blob URLs when component unmounts
  useEffect(() => {
    return () => {
      if (profilePicture && profilePicture.startsWith('blob:')) {
        URL.revokeObjectURL(profilePicture);
      }
    };
  }, [profilePicture]);

  return (
    <div className="workspace-home">
      {/* Navigation Header */}
      <div className="workspace-nav">
        <div className="nav-left">
          {/* You can add additional navigation items here */}
        </div>
        
        <div className="nav-center">
          <h1 className="welcome-title">Welcome to WorkSpace</h1>
        </div>
        
        <div className="nav-right">
          <div className="profile-section">
            <div 
              className="profile-picture-container"
              onClick={handleProfileClick}
            >
              {isLoadingProfilePicture ? (
                // Loading spinner for profile picture
                <div className="profile-loading">
                  <div className="profile-spinner"></div>
                </div>
              ) : profilePicture ? (
                <img 
                  src={profilePicture} 
                  alt="Profile" 
                  className="profile-picture"
                  onError={(e) => {
                    // If image fails to load, show initials
                    console.error('Profile image failed to load');
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className="profile-initials"
                style={{ display: profilePicture && !isLoadingProfilePicture ? 'none' : 'flex' }}
              >
                {getInitials(userData?.name)}
              </div>
              
              {/* Online status indicator */}
              <div className="online-indicator"></div>
            </div>
            
            {/* Profile Dropdown */}
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-profile-info">
                    {isLoadingProfilePicture ? (
                      <div className="dropdown-profile-loading">
                        <div className="dropdown-spinner"></div>
                      </div>
                    ) : profilePicture ? (
                      <img 
                        src={profilePicture} 
                        alt="Profile" 
                        className="dropdown-profile-picture"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    {(!profilePicture || isLoadingProfilePicture) && (
                      <div className="dropdown-profile-initials">
                        {getInitials(userData?.name)}
                      </div>
                    )}
                    <div className="dropdown-user-info">
                      <span className="dropdown-username">{userData?.name || 'User'}</span>
                      <span className="dropdown-user-role">{userData?.role || 'Member'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="dropdown-divider"></div>
                
                <div className="dropdown-menu">
                  <button 
                    className="dropdown-item"
                    onClick={handleProfileNavigation}
                  >
                    <svg className="dropdown-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                    </svg>
                    <span>View Profile</span>
                  </button>
                  
                  <button 
                    className="dropdown-item"
                    onClick={() => {
                      navigate('/workspace/files');
                      setShowProfileDropdown(false);
                    }}
                  >
                    <svg className="dropdown-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                    </svg>
                    <span>My Files</span>
                  </button>
                  
                  <button 
                    className="dropdown-item"
                    onClick={() => {
                      navigate('/workspace/notifications');
                      setShowProfileDropdown(false);
                    }}
                  >
                    <svg className="dropdown-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                    </svg>
                    <span>Notifications</span>
                  </button>
                  
                  <div className="dropdown-divider"></div>
                  
                  <button 
                    className="dropdown-item logout-item"
                    onClick={handleLogout}
                  >
                    <svg className="dropdown-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"/>
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="workspace-content">
        <div className="workspace-main">
          <div className="content-header">
            <h2>Dashboard Overview</h2>
            <p>Manage your workspace activities and files efficiently.</p>
          </div>
          
          {/* Quick Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon files-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
              </div>
              <div className="stat-info">
                <h3>My Files</h3>
                <p>Access and manage your documents</p>
                <button 
                  className="stat-btn"
                  onClick={() => navigate('/workspace/files')}
                >
                  View Files
                </button>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon notifications-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                </svg>
              </div>
              <div className="stat-info">
                <h3>Notifications</h3>
                <p>Check your latest important updates</p>
                <button 
                  className="stat-btn" 
                  onClick={() => navigate('/workspace/notifications')}
                >
                  View All
                </button>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon profile-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                </svg>
              </div>
              <div className="stat-info">
                <h3>Profile Settings</h3>
                <p>Update your account information</p>
                <button 
                  className="stat-btn"
                  onClick={() => navigate('/workspace/profile')}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
          
          {/* Recent Activity Section */}
          <div className="recent-activity">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                </div>
                <div className="activity-content">
                  <p><strong>File uploaded:</strong> document.pdf</p>
                  <span className="activity-time">2 hours ago</span>
                </div>
              </div>
              
              <div className="activity-item">
                <div className="activity-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                  </svg>
                </div>
                <div className="activity-content">
                  <p><strong>Profile updated:</strong> Changed profile picture</p>
                  <span className="activity-time">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkSpaceHome;