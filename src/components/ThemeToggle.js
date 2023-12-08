import React, { useState, useEffect } from 'react';
import '../styles/theme.css';
import DayNightToggle from 'react-day-and-night-toggle';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('data-theme') === 'dark' ? true : false
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem('data-theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark' ? true : false);
      document.body.setAttribute('data-theme', savedTheme);
    } else {
      setIsDarkMode(false);
      document.body.setAttribute('data-theme', 'light');
    }
  }, []);

  const handleChangeTheme = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('data-theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="App">
      <header className="App-header">
        <DayNightToggle size={25} onChange={handleChangeTheme} checked={isDarkMode} />
      </header>
    </div>
  );
};

export default App;
