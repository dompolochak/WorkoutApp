import React from 'react';
import Button from '../components/homePage/Button';
import ReactCalendar from '../components/homePage/ReactCalendar'

class HomePage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            number: 0
        };
        this.gas = this.gas.bind(this);
        this.gasDown = this.gasDown.bind(this);

    }

    gas(ammount)
    {
        this.setState({
            number: this.state.number+ammount
        });
    }

    gasDown(ammount)
    {
        this.setState({
            number: this.state.number-ammount
        });
    }

    render()
    {
        return(
            <div>
                <p>Hello cruel world {this.state.number}</p>
                <Button amount={10} buttonText="God damnit" action={this.gas}/>
                <Button amount={7} buttonText="Button" action={this.gasDown}/>
                <Button amount={this.state.number} buttonText="Alert" action={(parameter) => {
                    console.log(React.version);
                    console.log("Here is the amount: "+ parameter);
                }}/>
                <ReactCalendar/>
            </div>
        );
    }
}

export default HomePage;