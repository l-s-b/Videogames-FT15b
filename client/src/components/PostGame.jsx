import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame } from "../redux/actions";
// import { Link } from 'react-router-dom';
import { useState } from 'react';

function PostGame() {
    const [values, setValues] = useState({
        name: "",
        description: "",
        released: "",
        rating: 0.0,
        genre_list: []
    });

    function handleChange(e) {
        setValues( values => ({
            ...values,
            [e.target.name]: e.target.value,
        }))
    }

    function handleCheck(e) {
        setValues( values => ({
            ...values,
            //[e.target.name]: e.target.value,
        }))
    }

    function handleSubmit(e) {
        //
        }

    const dispatch = useDispatch();
    // const videogames = useSelector((state) => state.videogames); // Do I need this?
    /*useEffect(() => {
      dispatch(postVideogame());
    }, [dispatch]);*/

      return (
        <div className="videogames">
        <h1>Post a custom game:</h1>
    {/* REMEMBER TO COMMENT LIKE THIS INSIDE JSX. */}
        <form method="POST" action='/videogames'>
            <div className="post-unit">
                <label for="name">Name:</label>
                <input onChange={handleChange} name="name" type="text" />
            </div>
            <div className="post-unit">
                <label for="description">Description:</label>
                <textarea onChange={handleChange} name="description" rows="10" cols="80" placeholder="Don't be shy! Write here." />
            </div>
            <div className="post-unit">
                <label for="released">Release date:</label>
                <input onChange={handleChange} name="released" type="text" />
            </div>
            <div className="post-unit">
            <label for="rating">Overall Rating (between 0.0 and 5.0):</label>
            <input onChange={handleChange} name="rating" type="number" step=".1" id="gameRating" min="0.0" max="5.0" />
            </div>
            <div className="post-unit">
                <h3>Genre(s):</h3>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="1" />
            <label for="1">Racing   </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="2" />
            <label for="2">Shooter  </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="3" />
            <label for="3">Adventure    </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="4" />
            <label for="4">Action   </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="5" />
            <label for="5">RPG  </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="6" />
            <label for="6">Fighting </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="7" />
            <label for="7">Puzzle   </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="10" />
            <label for="10">Strategy    </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="14" />
            <label for="14">Simulation  </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="15" />
            <label for="15">Sports  </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="17" />
            <label for="17">Card    </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="19" />
            <label for="19">Family  </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="28" />
            <label for="28">Board Games </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="34" />
            <label for="34">Educational </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="40" />
            <label for="40">Casual  </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="51" />
            <label for="51">Indie   </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="59" />
            <label for="59">Massively Multiplayer   </label>
            <input onChange={handleCheck} name="genre_list" type="checkbox" value="83" />
            <label for="83">Platformer  </label>
            </div>
            <input onSubmit={handleSubmit} type="submit" value="Add Game!" />
        </form>
        </div>
      )
  }

  export default PostGame;
