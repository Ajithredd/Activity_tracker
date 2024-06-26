import React from 'react';
import './List.css';

const List = ({ title, items, onDelete }) => {
  return (
    <div className="list-container">
      <h2>{title}</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="website-item">
            <span>{item}</span>
            {onDelete && (
              <button className="btn-delete" onClick={() => onDelete(item)}>
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
