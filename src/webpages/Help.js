import React, {Component} from 'react';

class Help extends Component{

render()
{
    return(<p style={{width:"75%"}}>Welcome to the Work it workout tracker!
        press the "add workout" button to add a workout 
        or click on any day on the calendar to view, edit, or delete workouts for that day.
        If you don't see an entry try refreshing the page, if not wait for the back-end to catch up </p>);
}

}

export default Help