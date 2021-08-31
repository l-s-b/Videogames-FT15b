import { GET_ALL_GAMES, GET_GAME_BY_ID, POST_CUSTOM_GAME } from './actions';
const initialState = {
    videogames: undefined,
    order: "ASC",
    limit: 15,
    sortBy: '',
    gameByID: undefined,
    genre: undefined,
    values: {
        name: "",
        description: "",
        released: "",
        rating: 0.0,
        genre_list: []
    }};

function reducer(state = initialState, action) {
    switch(action.type) {

        case GET_ALL_GAMES: {
            return {
                ...state,
                videogames: action.payload // FILTER HERE
            }
        }
        case GET_GAME_BY_ID: {
            return {
                ...state,
                gameByID: action.payload
            }
        }
        case POST_CUSTOM_GAME: {
            return {
                ...state,
            }
        }

        default: { return state; }
    }
}

export default reducer;