import React from 'react';
import './Card.css';

const Card = ({ timeSpent, startTime, webPagesVisited }) => {
  return (
    <div className="card">
      <div className="info">
        <div className="label">Time Spent:</div>
        <div className="value">{timeSpent}</div>
      </div>
      <div className="info">
        <div className="label">Start Time:</div>
        <div className="value">{startTime}</div>
      </div>
      <div className="info">
        <div className="label">Web Pages Visited:</div>
        <div className="value">{webPagesVisited}</div>
      </div>
    </div>
  );
};

export default Card;
