import React from 'react';

export default function Loading() {
    const waitgif = "https://media2.giphy.com/media/xUOrw01a1gy7BUwq40/giphy.gif?cid=ecf05e47esox7qnyrlnkp5ude73smqlpiv5702w9tqe7d5zc&rid=giphy.gif&ct=g";
    return <div>
        <img className="waitgif" src={waitgif} alt='Loading . . .'/>
        <h3> Hang in there, this may take a while... </h3>
        </div>

}


