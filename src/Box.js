import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './components/SearchBar';
import Tag from './components/Tag';
import ResultItem from './components/ResultItem';
import LoadingSpinner from './components/LoadingSpinner';
import './Box.css';
import noresults from './imgs/no-results.png';
import errorImage from './imgs/error.png'; // Import the error image

const Box = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [timeoutError, setTimeoutError] = useState(false); // State for timeout error
  const availableTags = ['Languages', 'Build', 'Design', 'Cloud'];

  // To track the latest request
  const requestRef = useRef(0);

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
  };

  useEffect(() => {
    if (searchQuery) {
      const currentRequestId = ++requestRef.current;
      setLoading(true);
      setError(false);
      setTimeoutError(false); // Reset timeout error state

      // Set a timeout for the fetch request
      const timeoutId = setTimeout(() => {
        if (currentRequestId === requestRef.current) {
          setLoading(false);
          setTimeoutError(true); // Set timeout error
        }
      }, 5000); // Set timeout to 5 seconds

      fetch(`https://frontend-test-api.digitalcreative.cn/?no-throttling=false&search=${searchQuery}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          // Ensure this result is from the latest request
          if (currentRequestId === requestRef.current) {
            clearTimeout(timeoutId); // Clear the timeout on successful response
            setResults(data.length === 0 ? [] : data);
            setError(false);  // Clear any previous errors if we get a successful response
          }
        })
        .catch(() => {
          // Only show the error if this is from the latest request
          if (currentRequestId === requestRef.current) {
            clearTimeout(timeoutId); // Clear the timeout if there is an error
            setError(true);
            setResults([]);
          }
        })
        .finally(() => {
          if (currentRequestId === requestRef.current) {
            setLoading(false);
          }
        });
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  return (
    <div className="Box">
      <SearchBar value={searchQuery} onSearch={(query) => setSearchQuery(query)} error={error} />
      <div className="tags-container">
        {availableTags.map((tag) => (
          <Tag key={tag} label={tag} onClick={() => handleTagClick(tag)} />
        ))}
      </div>

      <div className="results-container">
        {loading && (
          <div className="loading-container">
            <LoadingSpinner />
          </div>
        )}
        {!loading && timeoutError && ( // Check for timeout error
          <div className="error-message">
            <img src={errorImage} alt="Request timed out" className="error-image" />
          </div>
        )}
        {!loading && !error && !timeoutError && results.length === 0 && (
          <div className="no-results-message">
            <img src={noresults} alt="No results found" className="no-results-image" />
          </div>
        )}
        {!loading && error && !timeoutError && (
          <div className="error-message">
            <img src={errorImage} alt="Something went wrong" className="error-image" />
          </div>
        )}
        {!loading && !error && !timeoutError && results.map((item, index) => (
          <ResultItem key={index} item={item} />
        ))}
      </div>

      <div className="results-count" style={{ color: error || timeoutError ? 'red' : '#999FAA' }}>
  {loading ? (
    'Searching...'
  ) : timeoutError ? (
    'The request timed out'
  ) : error ? (
    'Something went wrong but this is not your fault :)'
  ) : results.length === 0 ? (
    'No results found'
  ) : (
    `${results.length} result(s)`
  )}
</div>

    </div>
  );
};

export default Box;
