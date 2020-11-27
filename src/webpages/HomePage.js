import React from 'react';
import Button from '../components/homePage/Button';
import ReactCalendar from '../components/homePage/ReactCalendar';
import AddWorkoutFrom from './AddWorkoutForm';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Table from '../components/homePage/Table';

/*Notes
this.props.history.replace("/addWorkoutForm"); //redirect without back arrow
//console.log(this.props.match.params.var_name); Sending stuff through link
*/

class HomePage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={data: null, table: <div/>}
        this.fetchWorkouts = this.fetchWorkouts.bind(this);
        this.parseDate = this.parseDate.bind(this);
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

    parseDate(arrayOfStrings)
    {
        let newStr=arrayOfStrings[3];
        newStr += '-';
        switch(arrayOfStrings[1])
        {
            case 'Jan':
                newStr+='01';
            break;
            case 'Feb':
                newStr+='02';
            break;
            case 'Mar':
                newStr+='03';
            break;
            case 'Apr':
                newStr+='04';
            break;
            case 'May':
                newStr+='05';
            break;
            case 'Jun':
                newStr+='06';
            break;
            case 'Jul':
                newStr+='07';
            break;
            case 'Aug':
                newStr+='08';
            break;
            case 'Sep':
                newStr+='09';
            break;
            case 'Oct':
                newStr+='10';
            break;
            case 'Nov':
                newStr+='11';
            break;
            case 'Dec':
                newStr+='12';
            break;
        }
        newStr+='-';
        newStr+=arrayOfStrings[2];

        return newStr;
    }

    render()
    {
        let isClicked = this.state.showTable;
        let tile = this.state.tile
        let dateString, arrayOfStrings, reformedDate, temp, backendDate, todaysArray, tileContent;
        //const tileContent = ({ date, view }) => view === 'month' && date.getDay() === 4 ? <p>Chest Day</p> : null;
        if(this.state.data){
            tileContent = ({ date, view }) => {
                if(view === 'month')
                {
                    dateString = date + '';
                    arrayOfStrings = dateString.split(" ");
                    reformedDate = this.parseDate(arrayOfStrings);

                    todaysArray = this.state.data.filter(item=>{
                        temp = item.Date.split('T');
                        backendDate = temp[0];
                        return backendDate === reformedDate;
                    })
                    if(todaysArray.length)
                        return(<div className="tile"><p>Lift</p></div>);
                    else
                    return <div className="tile"></div>;                
                }
            }
        }

            return(
                <div className="calendarContainer">
                    
                    <ReactCalendar tileInfo = {tileContent} queryInfo = {this.state.data} display={newTableValue=>{this.setState({table: newTableValue})}} />
                    <br/>
                    {this.state.table}
                    <br/>
                    <Link to="/addWorkoutForm"  style={{textDecoration: 'none'}}>
                        <Button buttonText = "Add workout" action={()=>{}}/>
                    </Link>
                </div>
            );
        

    }
}

export default HomePage;
