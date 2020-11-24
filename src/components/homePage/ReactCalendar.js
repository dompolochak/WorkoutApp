import React, {useState} from 'react';
import Calendar from 'react-calendar';


const ReactCalendar = ({tileInfo}) => {
    const [date, setDate] = useState(new Date());

    const onChange = date => {
        setDate(date);
    }

    return(
        <Calendar onChange={onChange} value={date} tileContent={tileInfo} onClickDay = {(event, value) => console.log(event)}/>
    )
};

export default ReactCalendar;