import './applicationpage.css';
import { useState } from 'react';

function ApplicationPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const jobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      location: 'Remote/Hybrid',
      experience: '2+ years',
      description: 'We\'re looking for a skilled Frontend Developer to join our team and help build amazing user experiences.'
    },
    {
      id: 2,
      title: 'Backend Developer',
      location: 'Remote/Hybrid',
      experience: '3+ years',
      description: 'Join our backend team to build scalable and robust server-side applications.'
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      location: 'Remote/Hybrid',
      experience: '2+ years',
      description: 'Help us create beautiful and intuitive user interfaces and experiences.'
    }
  ];

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModalForJob = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedJob(null);
    setApplicantName('');
    setApplicantEmail('');
    setResumeFile(null);
    setErrorMessage('');
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) {
      setResumeFile(null);
      return;
    }
    if (f.type !== 'application/pdf') {
      setErrorMessage('Please upload a PDF file.');
      e.target.value = '';
      setResumeFile(null);
      return;
    }
    setResumeFile(f);
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!applicantName.trim() || !applicantEmail.trim()) {
      setErrorMessage('Please provide your name and email.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicantEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!resumeFile) {
      setErrorMessage('Please upload your resume as a PDF.');
      return;
    }

    setSuccessMessage('Application submitted successfully!');
    setErrorMessage('');

    // Here you could POST the form data to your backend.
    setTimeout(() => {
      closeModal();
    }, 1400);
  };

  return (
    <div className="application-container">
      <h1>Job Applications</h1>
      
      <div className="search-section">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search by job title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button">Search</button>
      </div>
      
      <p className="application-intro">
        Join our team at EullaTech Solutions! We're looking for talented individuals to help us build innovative technology solutions.
      </p>
      
      <div className="positions-section">
        <h2>Available</h2>
        <div className="positions-container">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <div key={job.id} className="job-card">
                <h3>{job.title}</h3>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Experience:</strong> {job.experience}</p>
                <p>{job.description}</p>
                <button className="apply-button" onClick={() => openModalForJob(job)}>
                  Apply Now
                </button>
              </div>
            ))
          ) : (
            <p className="no-results">No jobs found matching your search.</p>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <div className="modal-header">
              <h3>Apply to {selectedJob?.title}</h3>
              <button className="modal-close" onClick={closeModal} aria-label="Close">×</button>
            </div>

            <form className="application-form" onSubmit={handleSubmit}>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              {successMessage && <div className="success-message">{successMessage}</div>}

              <div className="form-group">
                <label htmlFor="applicantName">Full name</label>
                <input id="applicantName" type="text" value={applicantName} onChange={(e) => setApplicantName(e.target.value)} required />
              </div>

              <div className="form-group">
                <label htmlFor="applicantEmail">Email</label>
                <input id="applicantEmail" type="email" value={applicantEmail} onChange={(e) => setApplicantEmail(e.target.value)} required />
              </div>

              <div className="form-group">
                <label htmlFor="resume">Resume (PDF)</label>
                <input id="resume" type="file" accept="application/pdf" onChange={handleFileChange} className="file-input" />
              </div>

              <div className="modal-actions">
                <button type="submit" className="submit-btn">Send Application</button>
                <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplicationPage;