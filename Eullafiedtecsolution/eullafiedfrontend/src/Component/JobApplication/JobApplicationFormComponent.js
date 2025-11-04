import React, { useState } from "react";
import "./jobapplication.css";

function JobApplicationFormComponent({ applicationId }) {
  return (
    <div className="job-application-form-nice">
      <h2 className="job-application-title mb-4 text-center">Job Application Form</h2>
      <form className="job-application-form-box">
        <div className="form-group mb-3">
          <label htmlFor="name" className="job-application-label">Full Name</label>
          <input type="text" id="name" name="name" className="form-control job-application-input" required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email" className="job-application-label">Email Address</label>
          <input type="email" id="email" name="email" className="form-control job-application-input" required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="resume" className="job-application-label">Upload Resume</label>
          <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" className="form-control job-application-input" required />
        </div>
        <input type="hidden" id="applicationId" name="applicationId" value={applicationId} />
        <button type="submit" className="btn btn-primary job-application-submit-btn">Submit Application</button>
      </form>
    </div>
  );
}

export default JobApplicationFormComponent;