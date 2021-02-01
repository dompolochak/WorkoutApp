import React from 'react';
import './App.css';
import HomePage from './webpages/HomePage';
import {Route, withRouter} from 'react-router-dom'
import AddWorkoutForm from './webpages/AddWorkoutForm';
import Help from './webpages/Help.js';
import LoginPage from './webpages/LoginPage';
import SecuredRoute from './Utilities/Authentication/SecuredRoute';

function TestComponent(props) {
  return (
      <h1>
          HELLO WORLD - {props.text}
      </h1>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/addWorkoutForm" component={AddWorkoutForm}/>
        <Route exact path="/Help" component={Help}/> 
        <Route exact path="/LoginPage" component={LoginPage}/>
        <SecuredRoute exact path="/Test" component={TestComponent} text ="cowabunga"/>
      </header>
    </div>
  );
}


export default withRouter(App);
