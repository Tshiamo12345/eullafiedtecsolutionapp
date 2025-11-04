import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch } from "react-icons/fa";
import JobApplicationFormComponent from "../JobApplication/JobApplicationFormComponent";
import "./application.css";

function formatDateTime(dt) {
    if (!dt) return "";
    const date = new Date(dt);
    return date.toLocaleString();
}

function Application () {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedApplicationId, setSelectedApplicationId] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8087/api/eullafied/application')
            .then(response => {
                setApplications(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message || "Error fetching applications");
                setLoading(false);
            });
    }, []);

    const filteredApplications = applications.filter(app =>
        app.title && app.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleApplyClick = (applicationId) => {
        setSelectedApplicationId(applicationId);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedApplicationId(null);
    };

    return(
        <div className="application-list-container container" style={{ position: "relative" }}>
            {/* Modal Overlay */}
            {showModal && (
                <div className="job-application-modal-overlay">
                    <div className="job-application-modal-content">
                        <button
                            className="job-application-modal-close"
                            onClick={handleCloseModal}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <JobApplicationFormComponent
                            applicationId={selectedApplicationId}
                        />
                    </div>
                </div>
            )}
            {/* Dim background when modal is open */}
            <div style={showModal ? { filter: "blur(2px) brightness(0.7)", pointerEvents: "none" } : {}}>
                <h2 className="application-header mb-4">Job Posts</h2>
                <div className="mb-4 d-flex justify-content-center">
                    <div className="search-input-wrapper position-relative">
                        <span className="search-icon">
                            <FaSearch />
                        </span>
                        <input
                            type="text"
                            className="form-control custom-search-input"
                            placeholder="Search job title..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                {loading && <p className="application-loading">Loading...</p>}
                {error && <p className="application-error">{error}</p>}
                <div className="application-cards row justify-content-center">
                    {filteredApplications.map(app => (
                        <div className="col-12 col-md-6 col-lg-5 d-flex align-items-stretch" key={app.applicationId}>
                            <div className="application-card w-100">
                                <h3 className="application-title">{app.title}</h3>
                                <p className="application-description">{app.description}</p>
                                <div className="application-dates d-flex justify-content-between">
                                    <span className="application-open">
                                        <strong>Posted On:</strong> {formatDateTime(app.openDate)}
                                    </span>
                                    <span className="application-close">
                                        <strong>Close:</strong> {formatDateTime(app.closingDate)}
                                    </span>
                                </div>
                                <button
                                    className="application-apply-btn btn btn-primary mt-3 w-100"
                                    onClick={() => handleApplyClick(app.applicationId)}
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Application;