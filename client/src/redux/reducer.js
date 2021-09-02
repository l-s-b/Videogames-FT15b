import { GET_ALL_GAMES, GET_GAME_BY_ID, GET_ALL_GENRES, POST_CUSTOM_GAME, } from './actions';
const initialState = {
    videogames: undefined,
    gameByID: undefined,
    genre: undefined,
    genres: undefined,
    values: { // POST method
        name: "",
        description: "",
        released: "",
        rating: 0.0,
        genre_list: [],
        platforms: []
    }};

function reducer(state = initialState, action) {
    switch(action.type) {

        case GET_ALL_GAMES: {
            return {
                ...state,
                videogames: action.payload // FILTER HERE
            }
        }
        case GET_ALL_GENRES: {
            return {
                ...state,
                genres: action.payload // FILTER HERE
            }
        }
        case GET_GAME_BY_ID: {
            return {
                ...state,
                gameByID: action.payload
            }
        }
        case POST_CUSTOM_GAME: {
            return { ...state, }
        }

         default: { return state; }
    }
}

export default reducer;