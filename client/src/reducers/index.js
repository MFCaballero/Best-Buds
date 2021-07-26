import { GET_DOGS, GET_ID_BREED, GET_TEMPERAMENTS, POST_DOG, FILTER_DOGS, SORT_DOGS, CLEAR_DETAIL, SEARCH_DOG, RESET_FILTER, RESET_SEARCH } from '../actions/index';
import { filterDogs, sortDogs } from '../utils/index';

const initialState = {
    dogsAll: [],
    dogsFiltered: [],
    dogsSearch: [],
    dogDetail: [],
    dogTemperaments: [],
    postStatus: 0
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogsAll: action.payload.data
            }
        case SEARCH_DOG:
            return {
                ...state,
                dogsSearch: action.payload.data
            }
        case RESET_SEARCH:
            return {
                ...state,
                dogsSearch: []
            }
        case RESET_FILTER:
            return {
                ...state,
                dogsFiltered: []
            }
        case GET_ID_BREED:
            return {
                ...state,
                dogDetail: [action.payload.data]
            }
        case CLEAR_DETAIL:
            return {
                ...state,
                dogDetail: []
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                dogTemperaments: action.payload.data
            }
        case POST_DOG:
            return {
                ...state,
                postStatus: action.payload.status
            }
        case FILTER_DOGS:
            if(action.payload.searched) return {
                ...state,
                dogsFiltered: filterDogs([...state.dogsSearch],action.payload.value,action.payload.display)
            }
            return {
                ...state,
                dogsFiltered: filterDogs([...state.dogsAll],action.payload.value,action.payload.display)
            }
        case SORT_DOGS:
            if(action.payload.filtered) return {
                ...state,
                dogsFiltered: sortDogs([...state.dogsFiltered],action.payload.value)
            }
            if(action.payload.searched) return {
                ...state,
                dogsSearch: sortDogs([...state.dogsSearch],action.payload.value)
            }
            return {
                ...state,
                dogsAll: sortDogs([...state.dogsAll],action.payload.value)
            }

        default:
            return state;
    }
}