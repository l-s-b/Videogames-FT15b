import React from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { getVideogames } from "../redux/actions";
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function PostGame() {
    const dispatch = useDispatch();
    const { push } = useHistory();
    const [values, setValues] = useState({
        name: "",
        description: "",
        released: "",
        rating: 0.0,
        genre_list: [],
        platforms: []
    });

    function handleChange(e) {
        setValues( values => ({
            ...values,
            [e.target.name]: e.target.value,
        }));
    }

    function handleRating(e) {
        setValues( values => ({
            ...values,
            [e.target.name]: parseFloat(e.target.value),
        }));
    }

    function handleCheck(e) { // Works a charm!
        setValues( values => ({ ...values, }))
        if (e.target.checked) {
            values.genre_list.push(parseInt(e.target.value));
        values.genre_list.sort((a, b) => a - b)
    }
        if (!e.target.checked) {
            values.genre_list = values.genre_list.filter(v => parseInt(v) !== parseInt(e.target.value))}
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:3001/videogame', values)
            .then(response => {
                dispatch(getVideogames());
                push(response.data.route);
                alert("New custom game successfully posted!");
            }).catch(e => console.error(e));

        }

      return (
        <div className="videogames">
        <h1>Post a custom game:</h1>
    {/* REMEMBER TO COMMENT LIKE THIS INSIDE JSX. */}
        <form onSubmit={handleSubmit}>
            <div className="post-unit">
                <label htmlFor="name">Name:</label>
                <input onChange={handleChange} value={values.name} name="name" type="text" />
            </div>
            <div className="post-unit">
                <label htmlFor="description">Description:</label>
                <textarea onChange={handleChange} value={values.description} name="description" rows="10" cols="80" placeholder="Don't be shy! Write here." />
            </div>
            <div className="post-unit">
                <label htmlFor="released">Release date:</label>
                <input onChange={handleChange} value={values.released} name="released" type="text" />
            </div>
            <div className="post-unit">
            <label htmlFor="rating">Overall Rating:</label>
            <input onChange={handleRating} on value={values.rating} name="rating" type="number" step=".1" min="0.0" max="5.0" />
            </div>
            <div className="post-unit">
                <h3>Genre(s):</h3>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="1" />
            <label htmlFor="1">Racing   </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="2" />
            <label htmlFor="2">Shooter  </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="3" />
            <label htmlFor="3">Adventure    </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="4" />
            <label htmlFor="4">Action   </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="5" />
            <label htmlFor="5">RPG  </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="6" />
            <label htmlFor="6">Fighting </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="7" />
            <label htmlFor="7">Puzzle   </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="10" />
            <label htmlFor="10">Strategy    </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="14" />
            <label htmlFor="14">Simulation  </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="15" />
            <label htmlFor="15">Sports  </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="17" />
            <label htmlFor="17">Card    </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="19" />
            <label htmlFor="19">Family  </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="28" />
            <label htmlFor="28">Board Games </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="34" />
            <label htmlFor="34">Educational </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="40" />
            <label htmlFor="40">Casual  </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="51" />
            <label htmlFor="51">Indie   </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="59" />
            <label htmlFor="59">Massively Multiplayer   </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="83" />
            <label htmlFor="83">Platformer  </label>
            </div>
            <button type="submit">Add game!</button>
        </form>
        </div>
      )
  }

  export default PostGame;
