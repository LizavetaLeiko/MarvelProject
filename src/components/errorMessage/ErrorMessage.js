import img from './error.gif'
import { Component } from 'react';

class ErrorMessage extends Component {
    render(){
    return(
        <img style={{display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto'}} alt='Error' src={img}/>
    )
    }
}

// Как достать гифку из папки паблик:
// <img src={process.env.PUBLIC_URL + '/error.gif'}/> 
// Но лучше всё хранить в 1 месте.
export default ErrorMessage;