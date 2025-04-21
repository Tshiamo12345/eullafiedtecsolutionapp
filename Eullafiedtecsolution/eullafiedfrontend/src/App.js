import React, { useState, useEffect } from 'react';
import './App.css';
import IndexNavigationComponent from './Component/IndexComponent/IndexNavigationComponent';
import LoginFormComponent from './Component/LoginInFormComponent/LoginFormComponent.js';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WorkSpace from './Component/workspace/WorkSpace.js';

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
      <div className="container text-center">
        <p>Loading company data...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Route for the main page */}
        <Route
          path="/"
          element={
            <>
              <IndexNavigationComponent />
              <div className="body1 container">
                <div className="container">
                  <div className="home pt-5 mt-5">
                    <h1 className="companyHeader text-center">{company.name.toUpperCase()}</h1>
                    <p className="companySlogan text-center">{company.slogan}</p>
                    <button className="applicationButton">Online Application</button>
                  </div>
                </div>
              </div>
            </>
          }
        />

        {/* Route for the login page */}
        <Route path="/login" element={<LoginFormComponent />} />
        <Route path="/workSpace" element={<WorkSpace/>} />
      </Routes>
    </Router>
  );
}

export default App;
