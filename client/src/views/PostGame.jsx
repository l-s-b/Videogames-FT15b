import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { getGenres, clearList } from "../redux/actions";
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

    useEffect(() => {
        dispatch(getGenres());
        dispatch(clearList());
       }, [dispatch]);

    const foundGenres = useSelector((state) => state.genres);
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
        values.genre_list.sort((a, b) => a - b);
    }
        if (!e.target.checked) {
            values.genre_list = values.genre_list.filter(v => parseInt(v) !== parseInt(e.target.value))}
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:3001/videogame', values)
            .then(response => {
                push(response.data.route);
                alert("New custom game successfully posted!");
            }).catch(e => e.code === "ECONNRESET" ? handleSubmit() : console.error(e));

        }

      return (
        <div className="box">
        <h1>Post a custom game:</h1>
    {/* REMEMBER TO COMMENT LIKE THIS INSIDE JSX. */}
        <form onSubmit={handleSubmit}>
            <div className="post-unit">
                <label htmlFor="name">Name:</label>
                <input onChange={handleChange} value={values.name} name="name" type="text" />
            </div>
            <div className="post-unit">
                <label htmlFor="description">Description:</label>
                <textarea onChange={handleChange} value={values.description} name="description" rows="10" cols="50" placeholder="Don't be shy! Write here." />
            </div>
            <div className="post-unit">
                <label htmlFor="released">Release date:</label>
                <input onChange={handleChange} value={values.released} name="released" type="text" />
            </div>
            <div className="post-unit">
            <label htmlFor="rating">Overall Rating:</label>
            <input onChange={handleRating} on value={values.rating} name="rating" type="number" step=".1" min="0.0" max="5.0" />
            </div>
            <div >
                <h3>Genre(s):</h3>
                {!foundGenres ? "Wait a second..." :
                <div className="checkbox-flex">
                {foundGenres.map( element =>
                    <div className="checkbox-pair">
                    <input onChange={handleCheck} name="genre_list" type="checkbox" value={element.id} />
                    <label className="post-label" htmlFor={element.id}>{element.name}</label>
                    </div>
                )}
                </div>}
            </div>
            <button className='btn' type="submit">Add game!</button>
        </form>
        </div>
      )
  }

  export default PostGame;
