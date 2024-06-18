import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SearchBar({ updateTodos }) {
    const [searchInput, setSearchInput] = useState('');
    const [searchType, setSearchType] = useState('title');
    const [fetchData, setFetchData] = useState(false);

    useEffect(() => {
        if (fetchData === true) {
            updateTodos(searchInput, searchType);
            setFetchData(false);
        }
    }, [fetchData]);

    const handleInputChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        setFetchData(true);
    };

    const handleTypeChange = (e) => {
        e.preventDefault();
        setSearchType(e.target.value);
        setFetchData(true);
    };

    const clearSearch = () => {
        setSearchInput('');
        setFetchData(true); // Ensure the todos are updated on clear
    };

    return (
        <div className="search-bar-container d-flex justify-content-center align-items-center">
            <div className="search-bar position-relative d-flex align-items-center">
                <i className="fa fa-search search-icon"></i>
                <input
                    type="text"
                    className="form-control border-0 search-input"
                    placeholder="Search..."
                    value={searchInput}
                    onChange={handleInputChange}
                />
                <button
                    className={`clear-button ${searchInput ? 'active' : ''}`}
                    type="button"
                    onClick={clearSearch}
                >
                    &times;
                </button>
            </div>
            <select
                className="custom-select search-dropdown"
                value={searchType}
                onChange={handleTypeChange}
            >
                <option value="title">Title</option>
                <option value="description">Description</option>
                <option value="label">Label</option>
                <option value="priority">Priority</option>
            </select>
        </div>
    );
}
