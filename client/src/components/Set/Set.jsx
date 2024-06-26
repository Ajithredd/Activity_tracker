import React from 'react';
import axios from '../../utils/axios';
import './Set.css'
const Set = ({ filteredActivities }) => {
  const handleTimeLimitChange = async (hostname, event) => {
    const timeLimit = event.target.value;
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.post(
        '/setTimeLimit',
        { hostname, timeLimit },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(`Time limit for ${hostname} set to ${timeLimit} minutes`);
    } catch (error) {
      console.error('Error setting time limit:', error);
    }
  };

  return (
    <div className="set-card">
      <div className="set-header">
        <h2>Time Settings</h2>
      </div>
      <div className="set-content">
        {filteredActivities.length === 0 ? (
          <div className="set-label">No websites found.</div>
        ) : (
          filteredActivities.map((activity, index) => (
            <div key={index} className="set-item">
              <div className="set-label">Website Name: {activity.hostname}</div>
              <div className="set-label">Average Time Spent: {activity.duration} minutes</div>
              <div className="set-label">
                <label htmlFor={`setTimeLimit-${index}`}>Set Time Limit:</label>
                <select
                  id={`setTimeLimit-${index}`}
                  onChange={(event) => handleTimeLimitChange(activity.hostname, event)} defaultValue="set"
                >
                  <option value="5">5 minutes</option>
                  <option value="10">10 minutes</option>
                  <option value="15">15 minutes</option>
                  <option value="20">20 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 hour</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Set;
