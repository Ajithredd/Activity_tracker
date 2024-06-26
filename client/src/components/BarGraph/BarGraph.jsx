import React from 'react';
import './BarGraph.css';

const BarGraph = ({ hostnameDurations }) => {
  // Sort hostnames by duration in descending order and get the top 7
  const sortedHostnames = Object.entries(hostnameDurations)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7);

  const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#33FFF9', '#FF33F6', '#FFA533'
  ];

  return (
    <div className="bar-graph-container">
      <div className="y-axis">
        {[...Array(7)].map((_, index) => (
          <div key={index} className="tick">
            {360-index*60}
          </div>
        ))}
        
      </div>
      <div className="bars">
        {sortedHostnames.map(([hostname, duration], index) => {
          const heightPx = (duration / 360) * 300; // Calculate height based on a max height of 300px for 360 minutes
          return (
            <div
              key={hostname}
              className="bar"
              style={{ height: `${heightPx}px`, backgroundColor: colors[index] }}
            >
              <div className="bar-label">{duration} min</div>
            </div>
          );
        })}
      </div>
      <div className="legend">
        {sortedHostnames.map(([hostname], index) => (
          <div key={hostname} className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: colors[index] }}
            />
            <div className="legend-text">{hostname}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarGraph;
