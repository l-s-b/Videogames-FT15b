import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../redux/actions";
import { Link } from 'react-router-dom';

function Main() {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames); // Mapping
  const waitgif = "https://media2.giphy.com/media/xUOrw01a1gy7BUwq40/giphy.gif?cid=ecf05e47esox7qnyrlnkp5ude73smqlpiv5702w9tqe7d5zc&rid=giphy.gif&ct=g";
  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

    return (
      <div className="videogames">
      <h1>This is Henry Games Main.</h1>
        {!videogames ? (
          <img src={waitgif} alt=''/>
        ) : (
          videogames.map((v) => (
            <div className='videogame'>
            <Link className="link" to={`main/videogame/${v.id}`}>
              <h2>{v.name}</h2>
              <img className="picture" src={v.background_image} alt=''/>
              <p><ul>{v.genres/*?*/.map(g => <li>{`${g.name}`}</li>)}</ul></p>
              <p>{v.rating}<span role="img" aria-label="star">⭐</span></p>
            </Link>
            </div>
          ))
        )}
      </div>
    )
}

export default Main;
