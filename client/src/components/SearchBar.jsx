import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getGamesByName } from '../redux/actions';

function SearchBar() {
    const dispatch = useDispatch();
    const [videogames, setVideogames] = useState('');
    function handleChange(e) {
        e.preventDefault();
        setVideogames(e.target.value);
    };
    function handleClick(e) {
        e.preventDefault();
        dispatch(getGamesByName(videogames));
    };

    return (
        <div className="box">
            <input onChange={e => handleChange(e)} type="text" placeholder="Search games..." />
            <button onClick={e => handleClick(e)}>Go!</button>
        </div>
    );
}

export default SearchBar;
