import React from 'react';
import './Table.css';

const Table = ({ activities, mode }) => {
  const renderWebsiteName = (activity) => {
    if (mode != 'restrict') {
      // Display full URL path in analysis mode
      return activity.hostname+activity.path || activity.hostname;
    } else {
      // Display only hostname in other modes
      return activity.hostname;
    }
  };

  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th>Website Name</th>
          <th>Time Spent</th>
          <th>Start</th>
          <th>End</th>
        </tr>
      </thead>
      <tbody>
        {activities.map((activity, index) => (
          <tr key={index}>
            <td>{renderWebsiteName(activity)}</td>
            <td>{activity.duration} minutes</td>
            <td>{new Date(activity.startTime).toLocaleTimeString()}</td>
            <td>{new Date(activity.endTime).toLocaleTimeString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
