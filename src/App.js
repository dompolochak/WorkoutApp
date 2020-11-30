import React from 'react';
import './App.css';
import HomePage from './webpages/HomePage';
import {Route, withRouter} from 'react-router-dom'
import AddWorkoutForm from './webpages/AddWorkoutForm';
import Help from './webpages/Help.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/addWorkoutForm" component={AddWorkoutForm}/>
        <Route exact path="/Help" component={Help}/> 
      </header>
    </div>
  );
}


export default withRouter(App);
