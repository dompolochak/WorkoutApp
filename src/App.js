import React from 'react';
import './App.css';
import HomePage from './webpages/HomePage';
import {Route, withRouter} from 'react-router-dom'
import AddWorkoutForm from './webpages/AddWorkoutForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/addWorkoutForm" component={AddWorkoutForm}/>
      </header>
    </div>
  );
}


export default withRouter(App);
