import React, {Component} from 'react';
import '../../styles/HomePage/Button.css';

class Button extends Component
{

    render()
    {
        return(
        <div className='Button' onClick={this.props.action}>{this.props.buttonText}</div>
        );
    }
    
}

export default Button;
