import React from 'react';
import './App.css';
import HomePage from './webpages/HomePage';
import {Route, withRouter} from 'react-router-dom'
import AddWorkoutForm from './webpages/AddWorkoutForm';
import Help from './webpages/Help.js';
import LoginPage from './webpages/LoginPage';
import SecuredRoute from './Utilities/Authentication/SecuredRoute';
import auth from './Utilities/Authentication/AuthHandler';

function TestComponent(props) {
  return (
      <h1>
          HELLO WORLD - {props.text}
      </h1>
  );
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {checkingSession: true};
  }

  //On initial load
  async componentDidMount(){
      //checkAuthentication gives a promise that is in AuthHandler
      await auth.checkAuthentication();
      //After promise is completed checkingSession: false
      this.setState({checkingSession: false});
  }

  render(){
    return (
        <div className="App">
          <header className="App-header">
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/addWorkoutForm" component={AddWorkoutForm}/>
            <Route exact path="/Help" component={Help}/> 
            <Route exact path="/LoginPage" component={LoginPage}/>
            <SecuredRoute exact path="/Test" 
                          component={TestComponent} 
                          checkingSession = {this.state.checkingSession}
                          text ="cowabunga"
            />

          </header>
        </div>
      );
  }
}


export default withRouter(App);
