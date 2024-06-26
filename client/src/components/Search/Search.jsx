import React, { useState, useEffect } from 'react';
import './Search.css';

const Search = ({ activities, mode, addToRestrictedSites, setFilteredActivities }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredActivities, setLocalFilteredActivities] = useState([]);

  useEffect(() => {
    // Filter activities based on the search query
    const filtered = activities.filter(activity =>
      activity.hostname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setLocalFilteredActivities(filtered);

    if (mode !== 'restrict') {
      setFilteredActivities(filtered);  // Send filtered activities to the parent in analysis mode
    }
  }, [searchQuery, activities, mode, setFilteredActivities]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAdd = (hostname) => {
    if (mode === 'restrict') {
      addToRestrictedSites(hostname);
    }
  };

  return (
    <div id="container">
      <div id="search">
        <label htmlFor="searchInput">Search Website</label>
        <input
          id="searchInput"
          type="text"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <ul id="results">
        {filteredActivities.map((activity, index) => (
          <li key={index} className="name">
            {mode === 'analysis' ? (
              <span>{activity.hostname}</span>
            ) : (
              <>
                {activity.hostname}
                {mode === 'restrict' && (
                  <button className="addButton" onClick={() => handleAdd(activity.hostname)}>Add</button>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
