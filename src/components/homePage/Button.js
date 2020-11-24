import React, {Component} from 'react';
import '../../styles/HomePage/Button.css';

class Button extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
        <div className='Button' onClick={this.props.action}>{this.props.buttonText}</div>
        );
    }
    
}

export default Button;
