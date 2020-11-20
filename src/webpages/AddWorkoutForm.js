import React from 'react';

class AddWorkoutForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            name: '',
            date: ''     
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event)
    {
       // this.setState({name: event.target.value, date: event.target.value});
       const value = event.target.value;
       this.setState({
            [event.target.id]: value
        });
    }

    handleSubmit(event)
    {
        alert('Lmao code: ' + this.state.name + 'fingers crossed ' + this.state.date);
        event.preventDefault();
    }

    render()
    {
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    Enter your workout info
                    <br/>
                    <input type= "text" id = "name" value={this.state.name} onChange={this.handleChange}/>
                    <br/>
                    <input type= "text" id = "date" value={this.state.date} onChange={this.handleChange}/>   
                </label>
                <br/>
                <input type = "submit" value = "submit"/>
            </form>
        );
    }
}

export default AddWorkoutForm;
