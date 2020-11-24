import React from 'react';
import axios from 'axios';

class AddWorkoutForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            name: '',
            set1: null,
            set2: null,
            set3: null,
            set4: null,
            set5: null,
            weight1: null,
            weight2: null,
            weight3: null,
            weight4: null,
            weight5: null,
            date: ''     
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.postWorkouts = this.postWorkouts.bind(this);
    }

    handleChange(event)
    {
       const value = event.target.value;
       this.setState({
            [event.target.id]: value
        });
    }

    handleSubmit(event)
    {
        this.postWorkouts();
        event.preventDefault();
    }

    async postWorkouts()
    {
        await axios //call backend
            .post('http://localhost:4000/post_workouts',{
                Lift_name: this.state.name,
                Set1: this.state.set1,
                Set2: this.state.set2,
                Set3: this.state.set3,
                Set4: this.state.set4,
                Set5: this.state.set5,
                Weight1: this.state.weight1,
                Weight2: this.state.weight2,
                Weight3: this.state.weight3,
                Weight4: this.state.weight4,
                Weight5: this.state.weight5,
                Date: this.state.date
            })
            .then(results=>{console.log(results)})//console any error messages
            .catch(error=>{console.log(error)});
    }
    

    render()
    {
        return(
            //Display input fields 
            <form onSubmit={this.handleSubmit}>
                <label>
                    Enter your workout info
                    <br/>
                    Name of Lift:
                    <br/>
                    <input type= "text" id = "name" value={this.state.name} onChange={this.handleChange}/>
                    <br/>
                    Reps in each set
                    <br/>
                    <input type= "text" id = "set1" value={this.state.set1} onChange={this.handleChange}/>
                    <br/>
                    <input type= "text" id = "set2" value={this.state.set2} onChange={this.handleChange}/>
                    <br/>
                    <input type= "text" id = "set3" value={this.state.set3} onChange={this.handleChange}/>
                    <br/>
                    <input type= "text" id = "set4" value={this.state.set4} onChange={this.handleChange}/>
                    <br/>
                    <input type= "text" id = "set5" value={this.state.set5} onChange={this.handleChange}/>
                    <br/>
                    Enter the weight used for each set
                    <br/>
                    <input type= "text" id = "weight1" value={this.state.weight1} onChange={this.handleChange}/>
                    <br/>
                    <input type= "text" id = "weight2" value={this.state.weight2} onChange={this.handleChange}/>
                    <br/>
                    <input type= "text" id = "weight3" value={this.state.weight3} onChange={this.handleChange}/>
                    <br/>
                    <input type= "text" id = "weight4" value={this.state.weight4} onChange={this.handleChange}/>
                    <br/>
                    <input type= "text" id = "weight5" value={this.state.weight5} onChange={this.handleChange}/>
                    <br/>
                    Enter the date of your workout
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
