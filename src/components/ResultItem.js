import React from 'react';
import './ResultItem.css';
import linkIcon from '../imgs/LinkIcon.png'; // Adjust the path to your link icon image

const ResultItem = ({ item }) => {
  const { title, description, image, url } = item;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="result-item">
      {/* Display image */}
      {image && <img src={image} alt={title} className="result-item-image" />}
      
      {/* Display title and description in a flex container */}
      <div className="result-item-content">
        <h3 className="result-item-title">{title}</h3>
        <p className="result-item-description">{description}</p>
      </div>

      {/* Link icon that appears on hover */}
      <div className="link-icon-container">
        <img src={linkIcon} alt="Link Icon" className="link-icon" />
      </div>
    </a>
  );
};

export default ResultItem;
