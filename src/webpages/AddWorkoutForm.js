import React from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import ToggleSwitch from '../components/homePage/ToggleSwitch.js';

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
            date: '' ,
            submitted: false, 
            toggle: false 
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.postWorkouts = this.postWorkouts.bind(this);
        this.daysPerMonth = this.daysPerMonth.bind(this);
    }

    handleChange(event)
    {
       const value = event.target.value;
       this.setState({
            [event.target.id]: value
        });
    }
    daysPerMonth()
    {
        var month = (this.state.date[5]*10)+this.state.date[6];
        if(month === 2)
            return 28;
        else if(month === 4 || month === 6 || month === 9 || month === 11)
            return 30;
        else 
            return 31;
    }
    handleSubmit(event)
    {
        if(this.state.toggle){
            let dateArray = this.state.date.split('-');
            let day = parseInt(dateArray[2], 10);
            let dateStr;
            for(day; day<this.daysPerMonth(); day+=7)
            {
                dateStr = dateArray[0] +'-'+dateArray[1]+'-'+day.toString();
                this.postWorkouts(dateStr);
                console.log(this.state.date);
               // this.postWorkouts();
            }
        }
        else
            this.postWorkouts();
        this.setState({submitted: true});
        event.preventDefault();
    }

    async postWorkouts(dateStr)
    {
        console.log(this.state.date);
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
                Date: dateStr
            })
            .then()//console any error messages
            .catch(error=>{console.log(error)});
    }
    

    render()
    {
        if(this.state.submitted)
        {
            return <Redirect to = "/"/>;
        }
        return(
            //Display input fields 
            <form onSubmit={this.handleSubmit}>
                <label>
                    Enter your workout info
                    <br/>
                    Name of Lift:
                    <br/>
                    <input type= "text" id = "name" value={this.state.name} onChange={this.handleChange} autoComplete="off"/>
                    <br/>
                    Reps in each set
                    <br/>
                    <input type= "text" id = "set1" value={this.state.set1 ? this.state.set1 : ''} onChange={this.handleChange} autoComplete="off"/>
                    <br/>
                    <input type= "text" id = "set2" value={this.state.set2 ? this.state.set2 : ''} onChange={this.handleChange} autoComplete="off"/>
                    <br/>
                    <input type= "text" id = "set3" value={this.state.set3 ? this.state.set3 : ''} onChange={this.handleChange} autoComplete="off"/>
                    <br/>
                    <input type= "text" id = "set4" value={this.state.set4 ? this.state.set4 : ''} onChange={this.handleChange} autoComplete="off"/>
                    <br/>
                    <input type= "text" id = "set5" value={this.state.set5 ? this.state.set5 : ''} onChange={this.handleChange} autoComplete="off"/>
                    <br/>
                    Enter the weight used for each set
                    <br/>
                    <input type= "text" id = "weight1" value={this.state.weight1 ? this.state.weight1: ''} onChange={this.handleChange} autoComplete="off"/>
                    <br/>
                    <input type= "text" id = "weight2" value={this.state.weight2 ? this.state.weight2: ''} onChange={this.handleChange} autoComplete="off"/>
                    <br/>
                    <input type= "text" id = "weight3" value={this.state.weight3 ? this.state.weight3: ''} onChange={this.handleChange} autoComplete="off"/>
                    <br/>
                    <input type= "text" id = "weight4" value={this.state.weight4 ? this.state.weight4: ''} onChange={this.handleChange} autoComplete="off"/>
                    <br/>
                    <input type= "text" id = "weight5" value={this.state.weight5 ? this.state.weight5: ''} onChange={this.handleChange} autoComplete="off"/>
                    <br/>
                    Enter the date of your workout
                    <br/>
                    <input type= "text" id = "date" value={this.state.date} onChange={this.handleChange} placeholder="yyyy-mm-dd" autoComplete="off"/>   
                </label>
                <br/>
                <p style={{fontSize:'small'}}>Repeat weekly for the month</p>
                    <ToggleSwitch onState={this.state.toggle}
                                toggleOn={()=>this.setState({toggle: !this.state.toggle})}
                                xsHeight={20}
                                xsWidth={40}
                                xsMargin="10px, 10px"
                                inactiveColor="#999"
                                activeColor="#efde57"    
                                 />           
                    <input type = "submit" value = "submit" style={{margin:'10px'}}/>
                
            </form>
        );
    }
}

export default AddWorkoutForm;
