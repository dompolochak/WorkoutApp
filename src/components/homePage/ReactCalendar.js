import React, {useState} from 'react';
import Calendar from 'react-calendar';
import Table from './Table.js';
import '../../styles/HomePage/Calendar.css';
import 'react-calendar/dist/Calendar.css';
/* {        
    props.queryInfo &&
    props.queryInfo.filter((item, index, queryInfo)=>{ 
    console.log(queryInfo);
        return item.Weight1===225; //returns all items with this condition as an array
    }).map(item=>{//this section option for displaying html only
        return(
             item.Lift_name
        );
})}

*/

const ReactCalendar = (props) => {
    const [date, setDate] = useState(new Date());

    const onChange = date => {
        setDate(date);
    }

    return(
        <Calendar onChange={onChange} value={date} tileContent={props.tileInfo} onClickDay = {(value, event)=>props.display(<Table date={value} data={props.queryInfo}/>)}/>
    )
};

export default ReactCalendar;