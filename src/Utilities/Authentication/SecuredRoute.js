
import React from 'react';
import {Route, Redirect } from 'react-router-dom';
import auth from './AuthHandler';
import LoadingPage from '../../components/LoadingPage'


function SecuredRoute(props){
    //Takes component displayed if authenticated, else redirects to login page
    //takes checkingSession from AuthHandler
    //path is desired path sent from App.js
    const {component: Component, path, checkingSession, ...rest} = props;

    return(
        <Route path={path} render={()=>{
            if(checkingSession)
                return (<LoadingPage/>);
            if(auth.isAuthenticated())
                return(<Component {...rest}/>);
            else
                return(<Redirect to="/LoginPage"/>);
        }}/>
    );
}

export default SecuredRoute