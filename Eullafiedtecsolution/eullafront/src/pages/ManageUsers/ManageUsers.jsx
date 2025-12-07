import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './manageusers.css';

function ManageUsers() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        
        <div className="ManageUsers">
            <div>
                <h1>
                    Manage Users
                </h1>
            </div>
            <div className="search-container">
                <div className="search-box">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
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
        </div>
    );
}


export default ManageUsers;