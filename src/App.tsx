// src/App.tsx
import React from 'react';
import './App.css';
import BarChart from './components/BarChart';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Flask & React Chart Example</h1>
      <BarChart />
    </div>
  );
};

export default App;
