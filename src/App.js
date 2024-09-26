import React from 'react';
import './App.css';
import logo from './assets/logo.png';  // Importing the image
import Box from './Box';               // Importing the Box component
import Timer from './components/Timer';           // Importing the Timer component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Centered Box component */}
        <Box />
      </header>

      {/* Footer with timer and logo */}
      <footer className="App-footer">
        <Timer />
        <img 
          src={logo} 
          alt="Logo"
          className="footer-logo"
        />
      </footer>
    </div>
  );
}

export default App;
