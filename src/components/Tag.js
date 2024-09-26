import React from 'react';
import './Tag.css';
import icon from '../imgs/tagIcon.png'; // Adjust the path to your icon

const Tag = ({ label, onClick }) => {
  return (
    <button className="tag-button" onClick={onClick}>
      <img src={icon} alt="Tag Icon" className="tag-icon" />
      {label}
    </button>
  );
};

export default Tag;
