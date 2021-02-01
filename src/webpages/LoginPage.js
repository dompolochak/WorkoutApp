import React from 'react';
import Button from '../components/homePage/Button';
import axios from 'axios';

class LoginPage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={username: null, password: null, createAccount: false, repassword: null};
        this.handleChange = this.handleChange.bind(this);
        this.checkInputs = this.checkInputs.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleChange(event)
    {
       const value = event.target.value;
       this.setState({
            [event.target.id]: value
        });
    }
    handleInput()
    {
        if(!this.checkInputs())
            return;
    

    }
    checkInputs()
    {
        if(!this.state.username)
        {
            alert("Username was left blank");
            return false;
        }
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
        else
            return true;
    }

    async addUser()
    {
        await axios
            .post()
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
                <Button buttonText="Enter" action={()=>{}}/>
                <Button buttonText="Create Account" action={()=>{this.setState({createAccount: true})}}/>
            </div>
        );
    }
}

export default LoginPage;