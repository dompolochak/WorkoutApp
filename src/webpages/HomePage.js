import React from 'react';
import Button from '../components/homePage/Button';
import ReactCalendar from '../components/homePage/ReactCalendar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ROUTES from '../Utilities/routes.js';
import '../styles/HomePage/HomePage.css';



/*Notes
this.props.history.replace("/addWorkoutForm"); //redirect without back arrow
//console.log(this.props.match.params.var_name); Sending stuff through link
*/

class HomePage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={data: null, table: <div/>, loading: true}
        this.fetchWorkouts = this.fetchWorkouts.bind(this);
        this.parseDate = this.parseDate.bind(this);
    }
    //Run backend function to fetch workouts for quick operations
    async fetchWorkouts() {
        await axios//get all workouts and set to data
            .get(ROUTES.get_workouts)
            .then(results => {
                console.log(results);
                this.setState({data: results.data, loading: false});
            })
            .catch(error => {
                console.log(error.response);
            });
    }

    componentDidMount()
    {
        this.fetchWorkouts();
    }
    //pre: takes an array of strings split from react-calendar date format
    //post: returns a string in the format of the mySQL Date data type
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
            default:
            break;
        }
        newStr+='-';
        newStr+=arrayOfStrings[2];

        return newStr;
    }

    render()
    {
        if(this.state.loading)
        {
            return (<div className="LoadingScreen">Loading...</div>)
        }
        let dateString, arrayOfStrings, reformedDate, temp, backendDate, todaysArray, tileContent;
        //if data in database display message on the date of the workout

        if(this.state.data){
            tileContent = ({ date, view }) => {
                if(view === 'month')
                {
                    dateString = date + '';
                    arrayOfStrings = dateString.split(" ");
                    reformedDate = this.parseDate(arrayOfStrings);//change react-calendar format to Date format
                    //loop through data and return array of dates where a there is workout 
                    todaysArray = this.state.data.filter(item=>{
                        temp = item.Date.split('T');
                        backendDate = temp[0];
                        return backendDate === reformedDate;
                    })
                    if(todaysArray.length)//give dates a message
                        return(<div className="tile"><p>Lift</p></div>);
                    else
                        return <div className="tile"></div>;                
                }
            }
        }
        return(
            <div key={this.state.data} className="calendarContainer">
                <header style={{fontSize: "3em", margin:"20px"}}>Work It</header>
                
                <ReactCalendar tileInfo = {tileContent} queryInfo = {this.state.data} display={newTableValue=>{this.setState({table: newTableValue})}} />
                <br/>
                {this.state.table}
                <br/>
                <Link to="/addWorkoutForm"  style={{textDecoration: 'none'}}>
                    <Button buttonText = "Add workout" action={()=>{}}/>
                </Link>
                <br/>
                <Link to="/Help" style={{textDecoration: 'none'}}>
                    <Button buttonText="Help" action={()=>{}}/>
                </Link>
            </div>
        );     

    }
}

export default HomePage;
