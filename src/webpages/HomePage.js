import React from 'react';
import Button from '../components/homePage/Button';
import ReactCalendar from '../components/homePage/ReactCalendar'
import AddWorkoutFrom from './AddWorkoutForm'

class HomePage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={showAdd: false}
        this.showAddForm = this.showAddForm.bind(this);
    }

    showAddForm()
    {
        this.setState({showAdd: true});
    }

    render()
    {
        let isClicked = this.state.showAdd;
        if(isClicked){
            return (
                <div>
                    <AddWorkoutFrom/>
                </div>
            );
        }
            
        else{
            return(
                <div>
                    <ReactCalendar/>
                    <br/>
                    <Button buttonText = "Add workout" action = {this.showAddForm}/>
                </div>
            );
        }

    }
}

export default HomePage;
