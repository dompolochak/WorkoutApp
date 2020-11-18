import React from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';
import HomePage from './webpages/HomePage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HomePage/>
      </header>
    </div>
  );
}


export default App;
