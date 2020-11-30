import React from 'react';
import axios from 'axios';
import '../../styles/HomePage/Table.css';
import Button from './Button.js';
class Table extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {reformedDate: '', 
                      deleteID: null, 
                      showDeleteForm: false, 
                      showEditForm: false,
                      name: '',
                      set1: null,
                      set2: null,
                      set3: null,
                      set4: null,
                      set5: null,
                      weight1: null,
                      weight2: null,
                      weight3: null,
                      weight4: null,
                      weight5: null,
                      date: ''}
        this.parseDate = this.parseDate.bind(this);
        this.deleteInput = this.deleteInput.bind(this);
        this.editWorkout = this.editWorkout.bind(this);
        this.deleteWorkout = this.deleteWorkout.bind(this);
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
            default:
            break;
        }
        newStr+='-';
        newStr+=arrayOfStrings[2];

        return newStr;
    }

    deleteInput()
    {
       return(
        <div className="DeleteForm">
            Enter Lift ID to Delete
            <form onSubmit={this.deleteWorkout}>
                    <input type="text" value={this.state.deleteID ? this.state.deleteID : ''} onChange={event=>{this.setState({deleteID: event.target.value})}}/>
                    <input type="submit" value="Submit" /> 
            </form>
            <br/>
        </div>
       );
    }

    editInput()
    {
        return(
            <div>
                Enter only what you would like to change
                <br/>
                <form onSubmit={this.editWorkout}>
                    <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>

                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><input type="text" value={this.state.name || ''} onChange={event=>{this.setState({name: event.target.value})}}></input></td>
                        <td><input type="text" value={this.state.set1 || ''} onChange={event=>{this.setState({set1: event.target.value})}}></input></td>
                        <td><input type="text" value={this.state.set2 || ''} onChange={event=>{this.setState({set2: event.target.value})}}></input></td>
                        <td><input type="text" value={this.state.set3 || ''} onChange={event=>{this.setState({set3: event.target.value})}}></input></td>
                        <td><input type="text" value={this.state.set4 || ''} onChange={event=>{this.setState({set4: event.target.value})}}></input></td>
                        <td><input type="text" value={this.state.set5 || ''} onChange={event=>{this.setState({set5: event.target.value})}}></input></td>
                    </tr>
                    <tr>
                        <td/>
                        <td><input type="text" value={this.state.weight1 || ''} onChange={event=>{this.setState({weight1: event.target.value})}}></input></td>
                        <td><input type="text" value={this.state.weight2 || ''} onChange={event=>{this.setState({weight2: event.target.value})}}></input></td>
                        <td><input type="text" value={this.state.weight3 || ''} onChange={event=>{this.setState({weight3: event.target.value})}}></input></td>
                        <td><input type="text" value={this.state.weight4 || ''} onChange={event=>{this.setState({weight4: event.target.value})}}></input></td>
                        <td><input type="text" value={this.state.weight5 || ''} onChange={event=>{this.setState({weight5: event.target.value})}}></input></td>
                        <td rowSpan="2">Date<input type="text" value={this.state.date || ''} onChange={event=>{this.setState({date: event.target.value})}}></input></td>
                    </tr>
                    </tbody>
                    </table>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }

    // handleEditSubmit(event)
    // {
    //     this.editWorkout();
    // }

    // handleDeleteSubmit(event)
    // {
    //     this.deleteWorkout();
    //     event.preventDefault();
    // }

    async editWorkout()
    {
        await axios
            .post('http://localhost:4000/edit_workout',{
                Lift_ID: this.state.deleteID,
                Lift_name: this.state.name,
                Set1: this.state.set1,
                Set2: this.state.set2,
                Set3: this.state.set3,
                Set4: this.state.set4,
                Set5: this.state.set5,
                Weight1: this.state.weight1,
                Weight2: this.state.weight2,
                Weight3: this.state.weight3,
                Weight4: this.state.weight4,
                Weight5: this.state.weight5,
                Date: this.state.date                 
            })
            .then(results=>{console.log(results)})
            .catch(error=>{console.log(error)});
        window.location.reload();
    }

    async deleteWorkout()
    {
        await axios 
            .post('http://localhost:4000/delete_workout', {
                Lift_ID: this.state.deleteID
            })
            .then(results=>{console.log(results)})//console any error messages
            .catch(error=>{console.log(error)});
        window.location.reload();
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
            return backendDate === reformedDate;
        })
        return(
            <div>     
                <table>
                    <thead>
                        <tr>
                            <th>Lift ID</th>
                            <th>Lift Name</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                        </tr>
                    </thead>
                    
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
                                    <td rowSpan="2"> <Button buttonText="Edit" action={()=>{this.setState({showEditForm: true});
                                    this.setState({deleteID: item.Lift_ID})}}/></td>
                                    
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
                {this.state.showEditForm ? this.editInput() : <p/>}
                
                <Button buttonText="Delete" action={()=>this.setState({showDeleteForm: true})}/>
               {this.state.showDeleteForm ? this.deleteInput() : <p></p>}
                              
            </div>
        );
    }
}

export default Table;