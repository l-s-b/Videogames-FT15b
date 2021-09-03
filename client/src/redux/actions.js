import axios from 'axios';
import React from 'react';
import OtherError from '../components/OtherError';
import Error404 from '../components/Error404';

export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const GET_GAME_BY_ID = "GET_GAME_BY_ID";
export const GET_GAMES_BY_NAME = "GET_GAMES_BY_NAME";
export const GET_ALL_GENRES = "GET_ALL_GENRES";

export const POST_CUSTOM_GAME = "POST_CUSTOM_GAME";

// CREATE MORE ACTIONS IF/WHEN NECESSARY

export function getGenres() {
    return (dispatch) => {
        axios.get('http://localhost:3001/genres')
            .then(response => {
                dispatch({
                    type: GET_ALL_GENRES,
                    payload: response.data,
                })
            }).catch (e => e.code === "ECONNRESET" ? getGenres() : console.error(e));
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
            }).catch (e => e.code === "ECONNRESET" ? getVideogames() : console.error(e));
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
            }).catch(e => {
                console.error(e);
                dispatch({
                    type: GET_GAMES_BY_NAME,
                    payload: null
                });
                if (e.res && e.res.status === '404') { return < Error404 /> }
                else { return < OtherError /> }
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