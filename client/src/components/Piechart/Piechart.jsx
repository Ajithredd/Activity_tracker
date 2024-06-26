import React from 'react';
import './Piechart.css';

const Piechart = ({ productiveDuration, distractiveDuration, entertainmentDuration }) => {
  // Calculate total duration
  const totalDuration = productiveDuration + distractiveDuration + entertainmentDuration;

  // Function to calculate slice size based on percentage
  const sliceSize = (percentage) => {
    return `${percentage}%`;
  };

  return (
    <div className="pie">
    <figure className="pie-chart">
      <h2>Time Spent Distribution</h2>
      <div className="chart">
        <div className="slice" style={{ '--percentage': sliceSize((productiveDuration / totalDuration) * 100), '--color': '#4e79a7', '--offset': '0deg' }}></div>
        <div className="slice" style={{ '--percentage': sliceSize((distractiveDuration / totalDuration) * 100), '--color': '#f28e2c', '--offset': `${(productiveDuration / totalDuration) * 360}deg` }}></div>
        <div className="slice" style={{ '--percentage': sliceSize((entertainmentDuration / totalDuration) * 100), '--color': '#e15759', '--offset': `${((productiveDuration + distractiveDuration) / totalDuration) * 360}deg` }}></div>
      </div>
      <figcaption>
        <span>
          <span className="legend-color" style={{ backgroundColor: '#4e79a7' }}></span> Productive
        </span>
        <span>
          <span className="legend-color" style={{ backgroundColor: '#f28e2c' }}></span> Distractive
        </span>
        <span>
          <span className="legend-color" style={{ backgroundColor: '#e15759' }}></span> Entertainment
        </span>
      </figcaption>
      <cite>Time Spent Analysis</cite>
    </figure>
    </div>
  );
};

export default Piechart;
