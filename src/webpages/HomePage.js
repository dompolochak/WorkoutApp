import React from 'react';
import Button from '../components/homePage/Button';
import ReactCalendar from '../components/homePage/ReactCalendar';
import AddWorkoutFrom from './AddWorkoutForm';
import axios from 'axios';
import { Link } from 'react-router-dom';

/*Notes
this.props.history.replace("/addWorkoutForm"); //redirect without back arrow
//console.log(this.props.match.params.var_name); Sending stuff through link
*/

class HomePage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={showTable: false, tile: false, data: null}
        this.displayTable = this.displayTable.bind(this);
        this.fetchWorkouts = this.fetchWorkouts.bind(this);
    }

    displayTable()
    {
        this.setState({showTable: true});
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
        let isClicked = this.state.showTable;
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
                    <ReactCalendar tileInfo = {tileContent} queryInfo = {this.state.data} />
                    <br/>
                    <Link to="/addWorkoutForm"  style={{textDecoration: 'none'}}>
                        <Button buttonText = "Add workout" action={()=>{}}/>
                    </Link>
                </div>
            );
        }

    }
}

export default HomePage;
