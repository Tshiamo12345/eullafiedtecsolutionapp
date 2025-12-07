import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MainNavigation from './layouts/mainlayout/MainNavigation';
import SideNavigation from './layouts/SideBarW/SideNavigation';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import ManageUser from './pages/ManageUsers/ManageUsers';
import AdminPage from './pages/AdminPage';
import ApplicationPage from './pages/ApplicationPage';
import WorkSpaceHome from './pages/WorkSpaceHome/WorkSpaceHome'
import NotificationPage from './pages/NotificationPage/NotificationPage';
import FilePage from './pages/WorkSpaceFiles/FilePage';
import LoginForm from './components/LoginFormComponent/LoginForm';
import './App.css';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import MessagePage from './pages/MessagePage/MessagePage';
import Addition from './pages/Add/Additon';

function AppContent() {
  const location = useLocation();
  const hideNavigation = location.pathname === '/login' ||  location.pathname.startsWith('/workspace');

  return (

    <div className="App">
    
      {!hideNavigation && <MainNavigation />}
      <main className="main-content">
        
        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/workspace/*" element={<SideNavigation />}>
            
            <Route index element={<WorkSpaceHome />} />
            <Route path="home" element={<WorkSpaceHome />} />
            <Route path="files" element={<FilePage />} />
            <Route path="notifications" element={<NotificationPage />} />
            <Route path='profile' element={<ProfilePage />} />
            <Route path='messages' element={<MessagePage />} />
            <Route path="manage-users" element={<ManageUser/>} />
            <Route path="add" element={<Addition/>}/>
          </Route>

          <Route path="/admin" element={<AdminPage />} />
          <Route path="/careers" element={<ApplicationPage />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
