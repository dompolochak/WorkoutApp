import React from 'react';
import Button from '../components/homePage/Button';
import axios from 'axios';
import auth from '../Utilities/Authentication/AuthHandler';

class LoginPage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={username: null, password: null, createAccount: false, repassword: null, email: null};
        this.handleChange = this.handleChange.bind(this);
        this.checkInputs = this.checkInputs.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }

    handleChange(event)
    {
       const value = event.target.value;
       this.setState({
            [event.target.id]: value
        });
    }
    //called one enter button
    handleInput()
    {
        if(!this.checkInputs()){//input validation
            return;
        }
        else if(this.state.createAccount)//create new account
        {
            //promise in AuthHandler takes user information and tries to register
            auth.requestRegistration(this.state.username, this.state.email, this.state.password)
            .then((results)=>{console.log(results);})
            .catch((error)=>{console.log(error);});
        }
        else//login existing account
        {
            auth.requestLogin(this.state.username, this.state.password)
            .then(results=>{console.log(results);})
            .catch((error)=>{console.log(error);});
        }
    }

    checkInputs()
    {
        if(!this.state.username)
        {
            alert("Username was left blank");
            return false;
        }
        if(this.state.createAccount){
            if(!this.state.password || !this.state.repassword)
            {
                alert("One of the password lines was left blank");
                return false;
            }
            if(this.state.password !== this.state.repassword)
            {
                alert("Passwords do not match");
                return false;
            }
            if(!this.state.email || !this.validateEmail())
            {
                alert("Invalid email");
                return false;
            }
        }

        return true;
    }

    validateEmail(){
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email);
        //Regex for "__@__.__"
    }

    render()
    {
        if(this.state.createAccount)
        {
            return(
                <div>
                    <p>Username:</p> 
                    <input type="text" id="username" value={this.state.username ? this.state.username : ''} onChange={this.handleChange}/>
                    <br/>
                    <p>Email:</p>
                    <input type="text" id = "email" value={this.state.email ? this.state.email : ''} onChange={this.handleChange}/> 
                    <p>Password:</p>
                    <input type="text" id="password" value={this.state.password ? this.state.password : ''} onChange={this.handleChange}/>
                    <br/>
                    <p>Re-enter Password:</p>
                    <input type="text" id="repassword" value={this.state.repassword ? this.state.repassword : ''} onChange={this.handleChange}/>
                    <Button buttonText="Enter" action={this.handleInput}/>
                </div>
            ); 
        }
        return(
            <div>
                <p>Username:</p> 
                <input type="text" id="username" value={this.state.username ? this.state.username : ''} onChange={this.handleChange}/>
                <br/>
                <p>Password:</p>
                <input type="text" id="password" value={this.state.password ? this.state.password : ''} onChange={this.handleChange}/>
                <Button buttonText="Enter" action={this.handleInput}/>
                <Button buttonText="Create Account" action={()=>{this.setState({createAccount: true})}}/>
            </div>
        );
    }
}

export default LoginPage;