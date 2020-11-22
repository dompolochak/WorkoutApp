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
        this.postWorkouts = this.postWorkouts.bind(this);
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
        await axios
            .get('http://localhost:4000/get_workouts')
            .then(results => {
                console.log(results);
                this.setState({data: results.data});
            })
            .catch(error => {
                console.log(error.response);
            });
    }

    async postWorkouts()
    {
        await axios
            .post('http://localhost:4000/post_workouts', {
                Lift_ID: 1
            })
            .then((response)=>{
                console.log(response);
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    componentDidMount()
    {
        this.fetchWorkouts();
        this.postWorkouts();
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
                    {
                        this.state.data && 
                        this.state.data.map(item => {
                            return <p>{item.Lift_name}</p>;
                        })
                    }
                </div>
            );
        }

    }
}

export default HomePage;
