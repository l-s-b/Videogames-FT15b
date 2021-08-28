import React from "react";
import { Link } from 'react-router-dom';

const LP = function() {
    return (<div className= 'LP'>
    <h2 className='h2'>Welcome to Henry Games</h2>
    <Link to= '/main'><button className='btn'>Take a look!</button></Link>
    <div className='Gap'></div>
    </div>);
}

export default LP;