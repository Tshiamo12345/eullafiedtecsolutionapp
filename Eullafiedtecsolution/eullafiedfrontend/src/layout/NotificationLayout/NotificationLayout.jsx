import './NotificationLayout.css';

function NotificationLayout({ children }) {
  return (
    <div className="notification-layout">
      {children}
    </div>
  );
}

export default NotificationLayout;