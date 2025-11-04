import { useState, useEffect } from 'react';
import './FilePage.css';
import { uploadDocument, getUserDocuments, downloadUserDocument } from '../../utils/FileApi/File';
import { getAllAdminsDocuments } from '../../utils/FileApi/AdminFileApi';
import SuccessPopup from '../../components/SuccessPopup/SuccessPopup';

function FilePage() {
  const [activeTab, setActiveTab] = useState('myFiles');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  // Remove uploadSuccess state since we're using popup
  const [userDocuments, setUserDocuments] = useState([]);
  const [isLoadingDocuments, setIsLoadingDocuments] = useState(false);

  // Add success popup state
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');

  // System files state
  const [systemFiles, setSystemFiles] = useState([]);
  const [isLoadingSystemFiles, setIsLoadingSystemFiles] = useState(false);
  const [systemFilesError, setSystemFilesError] = useState('');


  // Load user documents and system files on component mount
  useEffect(() => {
    loadUserDocuments();
    loadSystemFiles();
  }, []);
  // Load system files (admin documents)
  const loadSystemFiles = async () => {
    setIsLoadingSystemFiles(true);
    setSystemFilesError('');
    const token = localStorage.getItem('token');
    if (!token) {
      setSystemFilesError('Authentication token not found. Please log in again.');
      setIsLoadingSystemFiles(false);
      return;
    }
    try {
      const documents = await getAllAdminsDocuments(token);
      
      
      // Map API data to file display format based on Document model
      const mapped = (documents || []).map(doc => {
        // Calculate file size from byte array length
        const fileSize = doc.file ? `${(doc.file.length / 1024).toFixed(1)} KB` : 'Unknown';
        
        // Format date from localDateTime to display nicely
        const lastModified = doc.localDateTime ? 
          new Date(doc.localDateTime).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }) : 
          new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });
        
        // Set all system files as PDF type
        const fileExtension = 'PDF';
        
        return {
          id: doc.id,
          name: doc.fileName || 'Unnamed Document',
          size: fileSize,
          type: fileExtension,
          lastModified: lastModified,
          isSystemFile: true,
          userId: doc.user?.user_id || null
        };
      });
      
      setSystemFiles(mapped);
    } catch (error) {
      console.error('Error loading system files:', error);
      
      // Check if error is related to authentication/token expiry
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        alert('Your session has expired. Please log in again.');
        localStorage.clear();
        window.location.href = '/login';
        return;
      }
      
      setSystemFilesError('Failed to load system files. Please try again.');
    } finally {
      setIsLoadingSystemFiles(false);
    }
  };

  const loadUserDocuments = async () => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!userStr || !token) return;

    try {
      const user = JSON.parse(userStr);
      // Use user_id to match your API parameter
      const userId = user.user_id;
      
     
      if (!userId) return;

      setIsLoadingDocuments(true);
      const documents = await getUserDocuments(userId, token);
      console.log('User documents loaded:', documents.id);
      setUserDocuments(documents || []);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setIsLoadingDocuments(false);
    }
  };

  // systemFiles now comes from API

  // Remove mock data - only use real user documents from API
  const myFiles = userDocuments.map(doc => ({
    id: doc.id || doc.documentId,
    name: doc.fileName || doc.name,
    size: doc.file ? `${(doc.file.length / 1024).toFixed(1)} KB` : 'Unknown',
    type: 'PDF',
    lastModified: doc.localDateTime ? 
      new Date(doc.localDateTime).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }) : 
      new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
    isUserUploaded: true
  }));

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return (
          <svg className="file-svg-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
        );
      case 'docx':
      case 'doc':
        return (
          <svg className="file-svg-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
        );
      case 'xlsx':
      case 'xls':
        return (
          <svg className="file-svg-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4Z"/>
          </svg>
        );
      case 'pptx':
      case 'ppt':
        return (
          <svg className="file-svg-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
        );
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return (
          <svg className="file-svg-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z"/>
          </svg>
        );
      case 'zip':
      case 'rar':
        return (
          <svg className="file-svg-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,17H12V15H10V13H12V15H14M14,9H12V7H14M10,9H12V11H10M10,13H8V11H10V9H8V7H10V9H12V11H10M14,11H12V13H14V11M12,3H14V5H12M10,5H12V7H10V5M14,5H16V7H14V5M8,7H10V9H8M6,9H8V11H6M14,13H16V15H14M10,7H12V9H10M12,5H14V7H12V5M14,7H16V9H14M10,11H12V13H10M6,11H8V13H6M6,13H8V15H6M8,15H10V17H8M6,15H8V17H6M8,17H10V19H8M10,17H12V19H10M12,17H14V19H12M14,15H16V17H14M16,13H18V15H16M16,11H18V13H16M16,9H18V11H16M16,7H18V9H16M16,15H18V17H16M14,19H16V21H14M12,19H14V21H12M10,19H12V21H10M8,19H10V21H8M6,17H8V19H6V17Z"/>
          </svg>
        );
      case 'json':
        return (
          <svg className="file-svg-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
          </svg>
        );
      case 'log':
        return (
          <svg className="file-svg-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
        );
      case 'sql':
        return (
          <svg className="file-svg-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4,6H2V20A2,2 0 0,0 4,22H18V20H4M20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H8V4H20V16Z"/>
          </svg>
        );
      case 'txt':
        return (
          <svg className="file-svg-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
        );
      default:
        return (
          <svg className="file-svg-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z"/>
          </svg>
        );
    }
  };

  const renderFileList = (files, loading, error, isSystem = false) => {
    if (loading) {
      return (
        <div className="file-list loading">
          <div className="loading-spinner"></div>
          <p>{isSystem ? 'Loading system documents...' : 'Loading your documents...'}</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="file-list error">
          <span style={{ color: 'red' }}>
            ❌ {error}
          </span>
        </div>
      );
    }
    const filteredFiles = files.filter(file =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
      <div className="file-list">
        {filteredFiles.length > 0 ? (
          filteredFiles.map((file) => (
            <div key={file.id} className={`file-item ${file.isUserUploaded ? 'user-uploaded' : ''} ${file.isSystemFile ? 'system-file' : ''}`}>
              <div className="file-icon">
                {getFileIcon(file.type)}
              </div>
              <div className="file-details">
                <div className="file-name" title="">
                  {file.name}
                  {file.isUserUploaded && <span className="upload-badge">📄 Your Upload</span>}
                </div>
                <div className="file-meta">
                  <span className="file-size">{file.size}</span>
                  <span className="file-date">Uploaded On: {file.lastModified}</span>
                </div>
              </div>
              <div className="file-type-badge">
                {file.type}
              </div>
              <button 
                className="download-btn"
                onClick={() => handleDownload(file)}
                title={`Download ${file.name}`}
              >
                <svg className="download-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
                </svg>
              </button>
            </div>
          ))
        ) : (
          <div className="no-files-found">
            <p>{isSystem 
              ? searchTerm 
                ? `No system documents found matching "${searchTerm}"`
                : 'No system documents available'
              : searchTerm
                ? `No files found matching "${searchTerm}"`
                : 'No files found'
            }</p>
          </div>
        )}
      </div>
    );
  };

  const handleDownload = async (file) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Authentication token not found. Please log in again.');
      return;
    }

    try {
      // Use the same downloadUserDocument function for both user and system files
      console.log('Downloading file with ID:', file.id);
      await downloadUserDocument(file.id, token, file.name);
    } catch (error) {
      console.error('Download error:', error);
      alert(`Failed to download "${file.name}". Please try again.`);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Clear previous messages
    setUploadError('');

    // Validate file type - only PDF allowed
    if (file.type !== 'application/pdf') {
      setUploadError('Only PDF files are allowed.');
      return;
    }

    // Validate file size - 5MB limit
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setUploadError('File size must be 5MB or less.');
      return;
    }

    // Get userId from localStorage (stored as user object)
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (!storedUser) {
      setUploadError('User information not found. Please log in again.');
      return;
    }

    if (!token) {
      setUploadError('Authentication token not found. Please log in again.');
      return;
    }

    let userId;
    
    try {
      const userData = JSON.parse(storedUser);
      console.log('User data:', userData); // Debug log
      userId = userData.user_id;
      
      if (!userId) {
        setUploadError('User ID not found in user data. Please log in again.');
        return;
      }
    } catch (error) {
      setUploadError('Invalid user data format. Please log in again.');
      return;
    }

    // Extract filename (without extension for the API)
    const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension

    try {
      setIsUploading(true);

      // Use the uploadDocument function from File.js
      console.log('Uploading with userId:', userId); // Debug log
      const response = await uploadDocument(file, fileName, userId, token);

      if (response.status === 200 || response.status === 302) { // 302 for FOUND status
        // Show success popup instead of setting success message
        setUploadedFileName(file.name);
        setShowSuccessPopup(true);
        setShowUploadForm(false);
        // Clear the file input
        event.target.value = '';
        
        // Refresh the documents list
        await loadUserDocuments();
      } else {
        setUploadError('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      
      if (error.response) {
        switch (error.response.status) {
          case 404:
            setUploadError('User not found. Please check your account.');
            break;
          case 500:
            setUploadError('Server error occurred. Please try again later.');
            break;
          default:
            setUploadError('Upload failed. Please try again.');
        }
      } else {
        setUploadError('Network error occurred. Please check your connection and try again.');
      }
    } finally {
      setIsUploading(false);
    }
  };

  const renderUploadForm = () => {
    if (!showUploadForm) return null;

    return (
      <div className="upload-form-overlay">
        <div className="upload-form">
          <div className="upload-form-header">
            <h3>Upload PDF Document</h3>
            <button 
              className="close-form-btn"
              onClick={() => {
                setShowUploadForm(false);
                setUploadError('');
              }}
              disabled={isUploading}
            >
              ✕
            </button>
          </div>
          
          <div className="upload-form-body">
            {uploadError && (
              <div className="upload-error">
                <span style={{ color: 'red' }}>❌ {uploadError}</span>
              </div>
            )}

            <div className="upload-area">
              <div className="upload-icon">
                <svg className="upload-svg-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z"/>
                </svg>
              </div>
              <p>Drag and drop your PDF file here or</p>
              <label htmlFor="file-upload" className={`upload-btn ${isUploading ? 'disabled' : ''}`}>
                {isUploading ? 'Uploading...' : 'Choose PDF File'}
              </label>
              <input
                type="file"
                id="file-upload"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                accept=".pdf,application/pdf"
                disabled={isUploading}
              />
            </div>
            
            <div className="upload-info">
              <p><strong>Supported format:</strong> PDF only</p>
              <p><strong>Maximum file size:</strong> 5MB</p>
              <p><strong>Note:</strong> Only PDF documents are accepted for upload.</p>
            </div>

            {isUploading && (
              <div className="upload-progress">
                <div className="loading-spinner"></div>
                <p>Uploading your document...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="file-page">
      
      <div className="file-page-header">
        <div className = "myHeader">
        <h1>File Manager</h1>
        </div>
        {/* Search Bar */}
        <div className="search-container">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search files by name or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button
                className="clear-search"
                onClick={() => setSearchTerm('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
        
        {/* Horizontal Navigation Menu at the top */}
        <div className="file-nav-top">
          <button
            className={`nav-item ${activeTab === 'myFiles' ? 'active' : ''}`}
            onClick={() => setActiveTab('myFiles')}
          >
            <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z"/>
            </svg>
            <span className="nav-text">My Documents</span>
          </button>
          <span className="nav-divider">/</span>
          <button
            className={`nav-item ${activeTab === 'systemFiles' ? 'active' : ''}`}
            onClick={() => setActiveTab('systemFiles')}
          >
            <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.4 16,13V16C16,16.6 15.6,17 15,17H9C8.4,17 8,16.6 8,16V13C8,12.4 8.4,11.5 9,11.5V10C9,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.2,9.2 10.2,10V11.5H13.8V10C13.8,9.2 12.8,8.2 12,8.2Z"/>
            </svg>
            <span className="nav-text">System Documents</span>
          </button>
        </div>
      </div>

      <div className="file-page-content">
        {/* File Content Area - Left Side */}
        <div className="file-content-left">
          <div className="content-header">
            <h2>
              {activeTab === 'myFiles' ? 'My Documents' : 'System Documents'}
            </h2>
            <div className="file-count">
              {(() => {
                const currentFiles = activeTab === 'myFiles' ? myFiles : systemFiles;
                const filteredCount = currentFiles.filter(file =>
                  file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  file.type.toLowerCase().includes(searchTerm.toLowerCase())
                ).length;
                
                if (searchTerm) {
                  return `${filteredCount} of ${currentFiles.length} files`;
                }
                return `${currentFiles.length} files`;
              })()}
            </div>
          </div>

          <div className="content-body">
            {activeTab === 'myFiles'
              ? renderFileList(myFiles, isLoadingDocuments, '', false)
              : renderFileList(systemFiles, isLoadingSystemFiles, systemFilesError, true)
            }
          </div>
        </div>

        {/* Right side space for future content */}
        <div className="file-content-right">
          <div className="placeholder-content">
            <h3>Upload file</h3>
            <p>Please upload your work files here</p>
            
            {/* Upload Icon Button */}
            <div className="upload-icon-container">
              <button 
                className="upload-icon-btn"
                onClick={() => setShowUploadForm(true)}
                title="Click to upload file"
              >
                <span className="upload-icon">
                  <svg className="upload-button-svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z"/>
                  </svg>
                </span>
                <span className="upload-text">Upload</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Upload Form Modal */}
      {renderUploadForm()}

      {/* Success Popup */}
      <SuccessPopup
        isVisible={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        fileName={uploadedFileName}
        autoClose={true}
        duration={4000}
      />
    </div>
  );
}

export default FilePage;