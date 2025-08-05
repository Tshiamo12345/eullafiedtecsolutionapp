import React, { useState, useEffect } from 'react';
import './App.css';
import IndexNavigationComponent from './Component/IndexComponent/IndexNavigationComponent';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import WorkSpace from './Component/workspace/WorkSpace.js';
import { AiOutlineLoading } from "react-icons/ai";
import './Component/loading/loading.css'; // Import the loading CSS file
import Application from './Component/applicationpage/Application.js';
import LoginFormComponent from './features/auth/LoginInFormComponent/LoginFormComponent.js';
import InternWorkSpace from './pages/InternWorkSpace.jsx';
function HomePage({ company }) {
  const navigate = useNavigate();
  return (
    <>
      <IndexNavigationComponent />
      <div className="body1 container">
        <div className="container">
          <div className="home pt-5 mt-5">
            <h1 className="companyHeader text-center">{company.name.toUpperCase()}</h1>
            <p className="companySlogan text-center">{company.slogan}</p>
            <button
              className="applicationButton"
              onClick={() => navigate("/application")}
            >
              Online Application
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  const [company, setCompany] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8087/api/eullafied/company')
      .then(response => setCompany(response.data))
      .catch(err => setError(err));
  }, []);

  if (error) {
    return (
      <div className="container">
        <p className="text-danger text-center">Error: {error.message}</p>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="loading-container">
        <AiOutlineLoading className="loading-spinner"/>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Route for the main page */}
        <Route
          path="/"
          element={<HomePage company={company} />}
        />
        {/* Route for the application page */}
        <Route path="/application" element={<Application />} />
        {/* Route for the login page */}
        <Route path="/login" element={<LoginFormComponent/>} />
        <Route path="/workSpace" element={<InternWorkSpace/>} />
      </Routes>
    </Router>
  );
}

export default App;
