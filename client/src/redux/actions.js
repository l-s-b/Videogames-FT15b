import axios from 'axios';
import React from 'react';
import OtherError from '../components/OtherError';

export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const GET_GAME_BY_ID = "GET_GAME_BY_ID";
export const POST_CUSTOM_GAME = "POST_CUSTOM_GAME";

// CREATE MORE ACTIONS WHEN NECESSARY

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

// GET Videogame detail action (Promise style)
export function getVideogame(id) {
    return (dispatch) => {
        axios.get(`http://localhost:3001/videogame/${id}`)
            .then(res => {
                dispatch({
                    type: GET_GAME_BY_ID,
                    payload: res.data,
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

//POST Videogame action (Promise style)(NOT TESTED YET)
/*
export function postVideogame(values) {

    return (dispatch) => {
        axios.post('http://localhost:3001/videogames', values)
            .then(response => {
                dispatch(getVideogames());
            })
    }
};
*/
