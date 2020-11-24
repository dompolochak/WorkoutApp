import React from 'react';
import axios from 'axios';

class Table extends React.Component
{
    constructor(props)
    {
        super(props);
    }



    render()
    {
        console.log(this.props.date);
        for(let i = 0; i<this.props.data.size; ++i)
        {
            console.log(this.props.data[i]);
        }
        return(
            <div/>
        );
    }
}

export default Table;