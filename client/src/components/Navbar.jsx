import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = function() {
    return (<div className='Nav'>
    <Link className='link home' to= '/main'>Henry Games</Link>
    <Link className='link' to= '/genres'>Game genres</Link>
    <Link className='link' to= '/post-videogame'>Add New Videogame</Link>
    </div>);
}
export default NavBar;

