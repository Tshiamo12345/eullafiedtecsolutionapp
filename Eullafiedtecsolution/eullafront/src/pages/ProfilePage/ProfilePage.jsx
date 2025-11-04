import { useState, useEffect } from 'react';
import './profilepage.css';
import axios from 'axios';
import { getProfilePicture } from '../../utils/User/UserApi';

function ProfilePage() {
    const [userName, setUserName] = useState('User');
    const [userTitle, setUserTitle] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoadingImage, setIsLoadingImage] = useState(true);
    const [showImageModal, setShowImageModal] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [surname, setSurname] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const [theme, setTheme] = useState('light'); // Add this line
    
    // Additional profile data
    const [profileData, setProfileData] = useState({
        email: '',
        phone: '',
        department: '',
        bio: '',
        location: '',
        joinDate: 'pp',
        lastActive: '',
        timezone: '',
        language: 'English'
    });
    
    // Edit mode states
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [editForm, setEditForm] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    // Stats data
    const [userStats, setUserStats] = useState({
        filesUploaded: 0,
        totalStorage: '0 MB',
        lastLogin: '',
        accountAge: '0 days'
    });

    // Activity data
    const [recentActivity, setRecentActivity] = useState([
        { id: 1, action: 'Profile picture updated', time: '2 hours ago', type: 'profile' },
        { id: 2, action: 'Uploaded document.pdf', time: '1 day ago', type: 'file' },
        { id: 3, action: 'Changed password', time: '3 days ago', type: 'security' },
        { id: 4, action: 'Updated profile information', time: '1 week ago', type: 'profile' }
    ]);

    // Security settings
    const [securitySettings, setSecuritySettings] = useState({
        twoFactorEnabled: false,
        lastPasswordChange: '30 days ago',
        loginNotifications: true,
        sessionTimeout: '30 minutes'
    });

    useEffect(() => {
        // Get user data from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                const userId = userData.user_id;
                const name = userData.name;
                const surname = userData.surname;
                
                setSurname(surname);
                setCurrentUserId(userId);
                setUserName(name);
                setUserTitle(userData.title || userData.role || 'Software Developer');

                // Set additional profile data
                setProfileData(prev => ({
                    ...prev,
                    bio: userData.bio || '',
                    phone: userData.phone || '',
                    email: userData.email || '',
                    department: userData.department || 'Development',
                    joinDate: userData.dateOfCreation ? new Intl.DateTimeFormat().format(new Date(userData.dateOfCreation)) : 'N/A',
                    lastActive: 'Online now',
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                }));

                // Initialize edit form
                setEditForm({
                    name: name,
                    surname: surname,
                    title: userData.title || userData.role || 'Software Developer',
                    email: userData.email || '',
                    phone: userData.phone || '',
                    bio: userData.bio || '',
                    location: userData.location || '',
                    department: userData.department || 'Development'
                });

                // Fetch profile picture for this specific user
                fetchProfilePicture(userId);
            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
                setIsLoadingImage(false);
            }
        } else {
            setIsLoadingImage(false);
        }
    }, []);

    const fetchProfilePicture = async (userId) => {
        if (!userId) {
            setProfileImage(null);
            setIsLoadingImage(false);
            return;
        }

        setIsLoadingImage(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.warn('No token found');
                setProfileImage(null);
                setIsLoadingImage(false);
                return;
            }

            // Use the API function instead of direct axios call
            const imageUrl = await getProfilePicture(userId, token);
            setProfileImage(imageUrl);

        } catch (error) {
            console.error('Error fetching profile picture:', error);
            setProfileImage(null);
        } finally {
            setIsLoadingImage(false);
        }
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (!file || !currentUserId) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            alert('Please select a valid image file (JPEG, JPG, PNG, GIF, or WebP)');
            return;
        }

        // Validate file size (5MB limit)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            alert('Please select an image smaller than 5MB');
            return;
        }

        setIsUploading(true);

        try {
            // Get token from localStorage
            const token = localStorage.getItem('token');

            if (!token) {
                alert('Authentication required. Please log in again.');
                setIsUploading(false);
                return;
            }

            // Prepare FormData for API upload
            const formData = new FormData();
            formData.append('profilePic', file);
            formData.append('userId', currentUserId);

            console.log('Uploading profile picture for user:', currentUserId);

            // Upload to backend
            const uploadResponse = await axios.post(
                'http://localhost:8087/api/eullafied/user/upload-profile',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // DO NOT set 'Content-Type' - let axios set it for FormData
                    }
                }
            );

            if (uploadResponse.status === 200 || uploadResponse.status === 201) {
                console.log('Profile picture uploaded successfully');

                // Immediately fetch the updated profile picture from database
                await fetchProfilePicture(currentUserId);

                alert('Profile picture updated successfully!');

                // Close modal if it's open
                if (showImageModal) {
                    setShowImageModal(false);
                }
            } else {
                throw new Error('Upload failed');
            }

        } catch (error) {
            console.error('Error uploading profile picture:', error);
            let errorMessage = 'Failed to upload profile picture. Please try again.';

            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        errorMessage = 'Authentication failed. Please log in again.';
                        break;
                    case 413:
                        errorMessage = 'File too large. Please select a smaller image.';
                        break;
                    case 415:
                        errorMessage = 'Unsupported file type. Please select a valid image.';
                        break;
                    case 500:
                        errorMessage = 'Server error. Please try again later.';
                        break;
                }
            }

            alert(errorMessage);
        } finally {
            setIsUploading(false);
            // Clear the file input
            event.target.value = '';
        }
    };

    const handleImageClick = () => {
        if (profileImage && !isLoadingImage) {
            setShowImageModal(true);
        }
    };

    const closeImageModal = () => {
        setShowImageModal(false);
    };

    // Handle modal close when clicking outside the image
    const handleModalBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeImageModal();
        }
    };

    // Handle profile edit
    const handleEditProfile = () => {
        setIsEditingProfile(true);
    };

    const handleCancelEdit = () => {
        // Reset form to original values
        setEditForm({
            name: userName,
            surname: surname,
            title: userTitle,
            email: profileData.email,
            phone: profileData.phone,
            bio: profileData.bio,
            location: profileData.location,
            department: profileData.department
        });
        setIsEditingProfile(false);
    };

    const handleSaveProfile = async () => {
        setIsSaving(true);
        try {
            // Here you would typically make an API call to update the profile
            // For now, we'll just update the local state
            setUserName(editForm.name);
            setSurname(editForm.surname);
            setUserTitle(editForm.title);
            setProfileData(prev => ({
                ...prev,
                email: editForm.email,
                phone: editForm.phone,
                bio: editForm.bio,
                location: editForm.location,
                department: editForm.department
            }));
            
            // Update localStorage
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            const updatedUser = {
                ...storedUser,
                name: editForm.name,
                surname: editForm.surname,
                title: editForm.title,
                email: editForm.email,
                phone: editForm.phone,
                bio: editForm.bio,
                location: editForm.location,
                department: editForm.department
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
            setIsEditingProfile(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleFormChange = (field, value) => {
        setEditForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'profile':
                return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/></svg>;
            case 'file':
                return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/></svg>;
            case 'security':
                return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V16H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z"/></svg>;
            default:
                return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11M11,9H13V7H11V9Z"/></svg>;
        }
    };

    // Handle keyboard navigation and body scroll lock
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && showImageModal) {
                closeImageModal();
            }
        };

        if (showImageModal) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.classList.add('modal-open');
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.classList.remove('modal-open');
        };
    }, [showImageModal]);

    // Cleanup blob URLs when component unmounts or user changes
    useEffect(() => {
        return () => {
            if (profileImage && profileImage.startsWith('blob:')) {
                URL.revokeObjectURL(profileImage);
            }
        };
    }, [profileImage]);

    // Add this function to handle theme changes
    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        // Apply theme to body or root element
        document.documentElement.setAttribute('data-theme', newTheme);
        // Save to localStorage for persistence
        localStorage.setItem('theme', newTheme);
    };

    // Add this useEffect to load saved theme
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    return (
        <div className="profile-page">
            <div className='myHeader'>
                <h1>Profile Page</h1>
            </div>

            <div className="profile-content">
                {/* Profile Header Section */}
                <div className="profile-header-section">
                    <div className="profile-image-section">
                        <div className="profile-image-container">
                            {isLoadingImage ? (
                                <div className="profile-image-loading">
                                    <div className="loading-spinner"></div>
                                    <p>Loading image...</p>
                                </div>
                            ) : profileImage ? (
                                <img
                                    id="profile-image"
                                    src={profileImage}
                                    alt="Profile"
                                    className="profile-image clickable"
                                    onClick={handleImageClick}
                                    title="Click to view full size"
                                />
                            ) : (
                                <div className="no-profile-image">
                                    <div className="no-image-icon">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                                        </svg>
                                    </div>
                                    <p>No image</p>
                                </div>
                            )}

                            <div className="image-overlay">
                                <label htmlFor="image-upload" className="change-image-btn">
                                    {isUploading ? 'Uploading...' : profileImage ? 'Change Profile' : 'Upload Profile'}
                                </label>
                                <input
                                    type="file"
                                    id="image-upload"
                                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                    onChange={handleImageChange}
                                    disabled={isUploading}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* User Name Section */}
                    <div className="user-info-section">
                        <div className="user-name-section">
                            <h2 className="user-name">{userName} {surname}</h2>
                            <p className="user-title">{userTitle}</p>
                            <div className="user-meta">
                                <span className="user-department">{profileData.department}</span>
                                <span className="user-status">
                                    <div className="status-dot online"></div>
                                    {profileData.lastActive}
                                </span>
                            </div>
                        </div>

                        <div className="profile-actions">
                            <button 
                                className="edit-profile-btn"
                                onClick={handleEditProfile}
                                disabled={isEditingProfile}
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                                </svg>
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="profile-tabs">
                    <button 
                        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
                        onClick={() => setActiveTab('activity')}
                    >
                        Activity
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveTab('security')}
                    >
                        Security
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        Settings
                    </button>
                </div>

                {/* Tab Content */}
                <div className="profile-tab-content">
                    {activeTab === 'overview' && (
                        <div className="tab-content overview-tab">
                            {isEditingProfile ? (
                                // Edit Form
                                <div className="edit-profile-form">
                                    <h3>Edit Profile Information</h3>
                                    
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input
                                                type="text"
                                                value={editForm.name}
                                                onChange={(e) => handleFormChange('name', e.target.value)}
                                                placeholder="Enter first name"
                                                disabled
                                                readOnly
                                            />
                                        </div>
                                        
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <input
                                                type="text"
                                                value={editForm.surname}
                                                onChange={(e) => handleFormChange('surname', e.target.value)}
                                                placeholder="Enter last name"
                                                disabled
                                                readOnly
                                            />
                                        </div>
                                        
                                        <div className="form-group">
                                            <label>Job Title</label>
                                            <input
                                                type="text"
                                                value={editForm.title}
                                                onChange={(e) => handleFormChange('title', e.target.value)}
                                                placeholder="Enter job title"
                                                disabled
                                                readOnly
                                            />
                                        </div>
                                        
                                        <div className="form-group">
                                            <label>Department</label>
                                            <input
                                                type="text"
                                                value={editForm.department}
                                                onChange={(e) => handleFormChange('department', e.target.value)}
                                                placeholder="Enter department"
                                                disabled
                                                readOnly
                                            />
                                        </div>
                                        
                                        <div className="form-group full-width">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                value={editForm.email}
                                                onChange={(e) => handleFormChange('email', e.target.value)}
                                                placeholder="Enter email address"
                                            />
                                        </div>
                                        
                                        <div className="form-group full-width">
                                            <label>Phone</label>
                                            <input
                                                type="tel"
                                                value={editForm.phone}
                                                onChange={(e) => handleFormChange('phone', e.target.value)}
                                                placeholder="Enter phone number"
                                            />
                                        </div>
                                        
                                        <div className="form-group full-width">
                                            <label>Bio</label>
                                            <textarea
                                                value={editForm.bio}
                                                onChange={(e) => handleFormChange('bio', e.target.value)}
                                                placeholder="Tell us about yourself..."
                                                rows="4"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="form-actions">
                                        <button 
                                            className="cancel-btn"
                                            onClick={handleCancelEdit}
                                            disabled={isSaving}
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            className="save-btn"
                                            onClick={handleSaveProfile}
                                            disabled={isSaving}
                                        >
                                            {isSaving ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // Overview Display
                                <div className="overview-content">
                                    <div className="info-sections">
                                        {/* Personal Information */}
                                        <div className="info-section">
                                            <h3>Personal Information</h3>
                                            <div className="info-grid">
                                                <div className="info-item">
                                                    <span className="info-label">Email:</span>
                                                    <span className="info-value">{profileData.email || 'Not provided'}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-label">Phone:</span>
                                                    <span className="info-value">{profileData.phone || 'Not provided'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Work Information */}
                                        <div className="info-section">
                                            <h3>Work Information</h3>
                                            <div className="info-grid">
                                                <div className="info-item">
                                                    <span className="info-label">Department:</span>
                                                    <span className="info-value">{profileData.department}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-label">Join Date:</span>
                                                    <span className="info-value">{profileData.joinDate}</span>
                                                </div>
                                                <div className="info-item full-width">
                                                    <span className="info-label">Bio:</span>
                                                    <span className="info-value">{profileData.bio || 'No bio provided yet.'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Statistics */}
                                        <div className="stats-section">
                                            <h3>Account Statistics</h3>
                                            <div className="stats-grid">
                                                <div className="stat-item">
                                                    <div className="stat-icon files">
                                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                                                        </svg>
                                                    </div>
                                                    <div className="stat-info">
                                                        <span className="stat-number">{userStats.filesUploaded}</span>
                                                        <span className="stat-label">Files Uploaded</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="stat-item">
                                                    <div className="stat-icon storage">
                                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z"/>
                                                        </svg>
                                                    </div>
                                                    <div className="stat-info">
                                                        <span className="stat-number">{userStats.totalStorage}</span>
                                                        <span className="stat-label">Storage Used</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="stat-item">
                                                    <div className="stat-icon time">
                                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.7L16.2,16.2Z"/>
                                                        </svg>
                                                    </div>
                                                    <div className="stat-info">
                                                        <span className="stat-number">{userStats.accountAge}</span>
                                                        <span className="stat-label">Account Age</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'activity' && (
                        <div className="tab-content activity-tab">
                            <h3>Recent Activity</h3>
                            <div className="activity-list">
                                {recentActivity.map(activity => (
                                    <div key={activity.id} className="activity-item">
                                        <div className={`activity-icon ${activity.type}`}>
                                            {getActivityIcon(activity.type)}
                                        </div>
                                        <div className="activity-details">
                                            <p className="activity-action">{activity.action}</p>
                                            <span className="activity-time">{activity.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="tab-content security-tab">
                            <h3>Security Settings</h3>
                            <div className="security-sections">
                                <div className="security-section">
                                    <h4>Password & Authentication</h4>
                                    <div className="security-item">
                                        <div className="security-info">
                                            <span className="security-label">Last password change:</span>
                                            <span className="security-value">{securitySettings.lastPasswordChange}</span>
                                        </div>
                                        <button className="security-btn">Change Password</button>
                                    </div>
                                    
                                    <div className="security-item">
                                        <div className="security-info">
                                            <span className="security-label">Two-Factor Authentication:</span>
                                            <span className={`security-status ${securitySettings.twoFactorEnabled ? 'enabled' : 'disabled'}`}>
                                                {securitySettings.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                                            </span>
                                        </div>
                                        <button className="security-btn">
                                            {securitySettings.twoFactorEnabled ? 'Disable' : 'Enable'} 2FA
                                        </button>
                                    </div>
                                </div>

                                <div className="security-section">
                                    <h4>Session Settings</h4>
                                    <div className="security-item">
                                        <div className="security-info">
                                            <span className="security-label">Session timeout:</span>
                                            <span className="security-value">{securitySettings.sessionTimeout}</span>
                                        </div>
                                        <select className="security-select">
                                            <option value="15">15 minutes</option>
                                            <option value="30" selected>30 minutes</option>
                                            <option value="60">1 hour</option>
                                            <option value="240">4 hours</option>
                                        </select>
                                    </div>
                                    
                                    <div className="security-item">
                                        <div className="security-info">
                                            <span className="security-label">Login notifications:</span>
                                            <span className={`security-status ${securitySettings.loginNotifications ? 'enabled' : 'disabled'}`}>
                                                {securitySettings.loginNotifications ? 'Enabled' : 'Disabled'}
                                            </span>
                                        </div>
                                        <label className="security-toggle">
                                            <input 
                                                type="checkbox" 
                                                checked={securitySettings.loginNotifications}
                                                onChange={(e) => setSecuritySettings(prev => ({
                                                    ...prev,
                                                    loginNotifications: e.target.checked
                                                }))}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="tab-content settings-tab">
                            <h3>Account Settings</h3>
                            <div className="settings-sections">
                                <div className="settings-section">
                                    <h4>Preferences</h4>
                                    <div className="settings-item">
                                        <label className="settings-label">Language:</label>
                                        <select className="settings-select">
                                            <option value="en">English</option>
                                            <option value="es">Spanish</option>
                                            <option value="fr">French</option>
                                            <option value="de">German</option>
                                        </select>
                                    </div>
                                    
                                    <div className="settings-item">
                                        <label className="settings-label">Theme:</label>
                                        <select 
                                            className="settings-select"
                                            value={theme}
                                            onChange={(e) => handleThemeChange(e.target.value)}
                                        >
                                            <option value="light">Light</option>
                                            <option value="dark">Dark</option>
                                            <option value="auto">Auto</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="settings-section">
                                    <h4>Notifications</h4>
                                    <div className="settings-item">
                                        <div className="settings-info">
                                            <span className="settings-label">Email notifications</span>
                                            <span className="settings-description">Receive updates via email</span>
                                        </div>
                                        <label className="settings-toggle">
                                            <input type="checkbox" defaultChecked />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                    
                                    <div className="settings-item">
                                        <div className="settings-info">
                                            <span className="settings-label">Push notifications</span>
                                            <span className="settings-description">Browser notifications for important updates</span>
                                        </div>
                                        <label className="settings-toggle">
                                            <input type="checkbox" />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                </div>

                                <div className="settings-section danger-zone">
                                    <h4>Danger Zone</h4>
                                    <div className="settings-item">
                                        <div className="settings-info">
                                            <span className="settings-label">Export Data</span>
                                            <span className="settings-description">Download all your account data</span>
                                        </div>
                                        <button className="settings-btn export">Export</button>
                                    </div>
                                    
                                    <div className="settings-item">
                                        <div className="settings-info">
                                            <span className="settings-label">Delete Account</span>
                                            <span className="settings-description">Permanently delete your account and all data</span>
                                        </div>
                                        <button className="settings-btn danger">Delete Account</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Full Screen Image Modal with Blurred Background */}
            {showImageModal && profileImage && (
                <div className="fullscreen-image-modal" onClick={handleModalBackdropClick}>
                    {/* Blurred Background */}
                    <div
                        className="blurred-background"
                        style={{ backgroundImage: `url(${profileImage})` }}
                    ></div>

                    {/* Modal Content */}
                    <div className="modal-content-wrapper">
                        {/* Close Button */}
                        <button
                            className="modal-close-btn"
                            onClick={closeImageModal}
                            aria-label="Close image view"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                            </svg>
                        </button>

                        {/* Large Profile Image */}
                        <div className="large-image-container">
                            <img
                                src={profileImage}
                                alt="Profile - Full Size"
                                className="large-profile-image"
                            />
                        </div>

                        {/* Change Picture Button Only */}
                        <div className="change-picture-overlay">
                            <label htmlFor="modal-image-upload" className="modal-change-picture-btn">
                                <svg className="change-pic-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" />
                                </svg>
                                {isUploading ? 'Uploading...' : 'Change Picture'}
                            </label>
                            <input
                                type="file"
                                id="modal-image-upload"
                                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                onChange={handleImageChange}
                                disabled={isUploading}
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;
