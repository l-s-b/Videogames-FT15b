import { GET_ALL_GAMES, GET_GAME_BY_ID, GET_ALL_GENRES, GET_GAMES_BY_NAME } from './actions';
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
        case GET_GAMES_BY_NAME: {
            return {
                ...state,
                videogames: action.payload
            }
        }
        case GET_GAME_BY_ID: {
            return {
                ...state,
                gameByID: action.payload
            }
        }
       /*  case RATING_SORT: {
            let sortedArr = action.payload.direction === "asc" ?
            sortAsc(state.videogames, 'rating') :
            sortDesc(state.videogames, 'rating');
            return {
                ...state,
                videogames: sortedArr,
            };
        } */
         default: { return state; }
    }
}

export default reducer;