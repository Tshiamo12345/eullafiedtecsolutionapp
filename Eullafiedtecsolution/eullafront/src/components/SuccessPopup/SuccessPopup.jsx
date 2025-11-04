import React, { useEffect } from 'react';
import './successPopup.css';

const SuccessPopup = ({ isVisible, onClose, fileName, autoClose = true, duration = 3000 }) => {
  useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, autoClose, duration]);

  if (!isVisible) return null;

  return (
    <div className="success-popup-overlay">
      <div className="success-popup-modal">
        <div className="success-popup-content">
          {/* Success Icon with Animation */}
          <div className="success-icon-container">
            <div className="success-checkmark">
              <svg className="checkmark-svg" viewBox="0 0 52 52">
                <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark-check" fill="none" d="m14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <div className="success-message">
            <h2>Upload Successful!</h2>
            <p>Your file <strong>"{fileName}"</strong> has been uploaded successfully.</p>
          </div>

          {/* Action Buttons */}
          <div className="success-actions">
            <button className="success-btn-primary" onClick={onClose}>
              Great!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;