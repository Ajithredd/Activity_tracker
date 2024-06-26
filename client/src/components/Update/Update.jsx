import React from 'react';
import './Update.css';

const Update = ({ activities, addToCategory }) => {
  const handleSearch = (event) => {
    let searchQuery = event.target.value.toLowerCase();
    let allNames = document.querySelectorAll('.name');

    allNames.forEach((name) => {
      const currentName = name.textContent.toLowerCase();
      if (currentName.includes(searchQuery)) {
        name.style.display = 'block';
      } else {
        name.style.display = 'none';
      }
    });
  };

  const handleAddToCategory = (hostname, category) => {
    addToCategory(hostname, category);
  };

  return (
    <div id="container">
      <div id="search">
        <label htmlFor="searchInput">Search Website</label>
        <input id="searchInput" type="text" onKeyUp={handleSearch} />
      </div>

      <ul id="results">
        {activities.map((activity, index) => (
          <li className="name" key={index}>
            {activity.hostname}
            <div className="btns">
              <button className="distractiveButton" onClick={() => handleAddToCategory(activity.hostname, 'distractive')}>
                Dstrct
              </button>
              <button className="productiveButton" onClick={() => handleAddToCategory(activity.hostname, 'productive')}>
                Prod
              </button>
              <button className="entertainmentButton" onClick={() => handleAddToCategory(activity.hostname, 'entertainment')}>
                Ent
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Update;
