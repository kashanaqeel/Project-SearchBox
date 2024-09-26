import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ value, onSearch, error }) => {
  const [localValue, setLocalValue] = useState(value);

  // Update localValue when value prop changes (e.g., when a tag is clicked)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e) => {
    setLocalValue(e.target.value);
  };

  // Debounce effect to delay search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Trigger the search only when the user stops typing
      onSearch(localValue);
    }, 800); // 800ms delay before the search is triggered

    // Clean up the timeout if the value changes (new keystroke)
    return () => clearTimeout(delayDebounceFn);
  }, [localValue, onSearch]);

  return (
    <div className={`search-bar-container ${error ? 'error' : value ? 'active' : ''}`}>
      <FaSearch className="search-icon" />
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder="Search technologies we use at DC..."
        className="search-bar"
      />
    </div>
  );
};

export default SearchBar;
