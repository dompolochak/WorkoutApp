import React from 'react';
import Button from '../components/homePage/Button';
import ReactCalendar from '../components/homePage/ReactCalendar';
import AddWorkoutFrom from './AddWorkoutForm';
import axios from 'axios';

class HomePage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={showAdd: false, tile: false, data: null}
        this.showAddForm = this.showAddForm.bind(this);
        this.fetchWorkouts = this.fetchWorkouts.bind(this);
    }

    showAddForm()
    {
        this.setState({showAdd: true});
    }

    changeTile()
    {
        this.setState({tile: true})
    }

    async fetchWorkouts() {
        await axios//get all workouts and set to data
            .get('http://localhost:4000/get_workouts')
            .then(results => {
                console.log(results);
                this.setState({data: results.data});
            })
            .catch(error => {
                console.log(error.response);
            });
    }

    componentDidMount()
    {
        this.fetchWorkouts();
    }

    render()
    {
        let isClicked = this.state.showAdd;
        let tile = this.state.tile
        const tileContent = ({ date, view }) => view === 'month' && date.getDay() === 4 ? <p>Chest Day</p> : null;
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
                    <ReactCalendar tileInfo = {tileContent}/>
                    <br/>
                    <Button buttonText = "Add workout" action = {this.showAddForm}/>
                </div>
            );
        }

    }
}

export default HomePage;
