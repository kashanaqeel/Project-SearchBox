// App.test.js
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';  // Import your App component

// Mocking Date to return a fixed time for testing
const mockDate = new Date('2024-01-01T12:34:56.789Z');

// Mock the Date object
global.Date = jest.fn(() => mockDate);
global.Date.UTC = Date.UTC;
global.Date.now = Date.now;

// Add the toLocaleTimeString method to the prototype of Date
global.Date.prototype.toLocaleTimeString = jest.fn(() => '12:34:56.789');

// Make sure to reset the mock after each test
afterEach(() => {
  jest.clearAllMocks();
});

test('renders App component correctly', () => {
  const { asFragment } = render(<App />); // Render the App component
  expect(asFragment()).toMatchSnapshot();  // Take a snapshot and compare it with previous snapshot
});
