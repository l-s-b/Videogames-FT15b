import axios from 'axios';
import React from 'react';
import OtherError from '../components/OtherError';

export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const GET_GAME_BY_ID = "GET_GAME_BY_ID";
export const GET_GAMES_BY_NAME = "GET_GAMES_BY_NAME";
export const GET_ALL_GENRES = "GET_ALL_GENRES";
export const RATING_SORT = "RATING_SORT";

export const POST_CUSTOM_GAME = "POST_CUSTOM_GAME";

// CREATE MORE ACTIONS WHEN NECESSARY

export function getGenres() {
    return (dispatch) => {
        axios.get('http://localhost:3001/genres')
            .then(response => {
                dispatch({
                    type: GET_ALL_GENRES,
                    payload: response.data,
                })
            })
    }
};

// GET Videogame list action (Promise style)
export function getVideogames() {
    return (dispatch) => {
        axios.get('http://localhost:3001/videogames')
            .then(response => {
                dispatch({
                    type: GET_ALL_GAMES,
                    payload: response.data,
                })
            })
    }
};

export function getGamesByName(name) {
    return (dispatch) => {
        axios.get(`http://localhost:3001/videogames?name=${name}`)
            .then(response => {
                dispatch({
                    type: GET_GAMES_BY_NAME,
                    payload: response.data,
                })
            })
        }
};

// GET Videogame detail action (Promise style)
export function getVideogame(id) {
    return (dispatch) => {
        axios.get(`http://localhost:3001/videogame/${id}`)
            .then(response => {
                dispatch({
                    type: GET_GAME_BY_ID,
                    payload: response.data,
                })
            }).catch(e => {
             if(e.res && e.res.status !== '404') {return < OtherError /> }
                console.error(e);
            dispatch({
                type: GET_GAME_BY_ID,
                payload: null
            })
        })
    }
};

// Clear videogame detail action
export function clearDetail() {
    return {
           type: GET_GAME_BY_ID,
           payload: undefined
   }
};

// Clear videogame list action
export function clearList() {
    return {
           type: GET_ALL_GAMES,
           payload: undefined
   }
};

/* // Sort list action (Promise style)
export function sortByRating() {
    return (dispatch) => {
        axios.get('http://localhost:3001/videogames')
            .then(response => {
                dispatch({
                    type: RATING_SORT,
                    payload: response.data,
                })
            })
    }
}; */
