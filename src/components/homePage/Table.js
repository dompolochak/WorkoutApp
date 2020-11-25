import React from 'react';
import axios from 'axios';
import '../../styles/HomePage/Table.css';
class Table extends React.Component
{
    constructor(props)
    {
        super(props);
       // this.state = {reformedDate: ''}
        this.parseDate = this.parseDate.bind(this);
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
        let dateString = this.props.date + '';
        let arrayOfStrings = dateString.split(" ");
        let reformedDate = this.parseDate(arrayOfStrings);
        let temp, backendDate;
        
        
        let todaysArray = this.props.data.filter(item=>{
            temp = item.Date.split('T');
            backendDate = temp[0];
            return backendDate == reformedDate;
        })
        return(
            <div>     
                <table>
                        <th>Lift ID</th>
                        <th>Lift Name</th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                    
                        {todaysArray.map(item=>{
                            return(
                            <tbody key={item.Lift_ID}>
                                <tr>
                                    <td>{item.Lift_ID}</td>
                                    <td>{item.Lift_name}</td>
                                    <td>{item.Set1}</td>
                                    <td>{item.Set2}</td>
                                    <td>{item.Set3}</td>
                                    <td>{item.Set4}</td>
                                    <td>{item.Set5}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>{item.Weight1}</td>
                                    <td>{item.Weight2}</td>
                                    <td>{item.Weight3}</td>
                                    <td>{item.Weight4}</td>
                                    <td>{item.Weight5}</td>
                                </tr>
                            </tbody>
                            );
                        })}
                </table>               
                {console.log(todaysArray)}     
            </div>
        );
    }
}

export default Table;