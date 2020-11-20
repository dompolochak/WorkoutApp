import React, {useState} from 'react';
import Calendar from 'react-calendar';


const ReactCalendar = ({tileInfo}) => {
    const [date, setDate] = useState(new Date());

    const onChange = date => {
        setDate(date);
    }

    return(
        <Calendar onChange={onChange} value={date} tileContent={tileInfo}/>
    )
};

export default ReactCalendar;