import axios from 'axios';
import { GET_ALL_URL, GET_TEMPERAMENT_URL, POST_DOG_URL } from '../utils/index';
export const GET_DOGS = 'GET_DOGS';
export const GET_ID_BREED = 'GET_ID_BREED';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const POST_DOG = 'POST_DOG';
export const FILTER_DOGS = 'FILTER_DOGS';
export const SORT_DOGS = 'SORT_DOGS';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';
export const SEARCH_DOG = 'SEARCH_DOG';
export const RESET_SEARCH = 'RESET_SEARCH';
export const RESET_FILTER = 'RESET_FILTER';


export function getDogs() {
    return function(dispatch) {
        return axios.get(`${GET_ALL_URL}`)
        .then(data => {
            dispatch({
                type: GET_DOGS,
                payload: data
            })
        })
    }
}

export function searchDogs(name) {
    return function(dispatch) {
        return axios.get(`${GET_ALL_URL}?name=${name}`)
        .then(data => {
            dispatch({
                type: SEARCH_DOG,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: SEARCH_DOG,
                payload: {
                    data: "error"
                }
            })
        })
    }
}

export function resetSearch(){
    return {
        type: RESET_SEARCH
    }
}

export function resetFilter(){
    return {
        type: RESET_FILTER
    }
}

export function getIdBreed(idRaza) {
    return function(dispatch) {
        return axios.get(`${GET_ALL_URL}/${idRaza}`)
        .then(data => {
            dispatch({
                type: GET_ID_BREED,
                payload: data
            })
        })
    }
}

export function getTemperaments() {
    return function(dispatch){
        return axios.get(GET_TEMPERAMENT_URL)
        .then(data => {
            dispatch({
                type: GET_TEMPERAMENTS,
                payload: data
            })
        })
    }
}

export function postDog(body) {
    return function(dispatch){
        return axios.post(POST_DOG_URL,body)
        .then(status => {
            dispatch({
                type: POST_DOG,
                payload: status
            })
        })
    }
}

export function filterDogs(payload) {
    return {
        type: FILTER_DOGS,
        payload
    }
}

export function sortDogs(payload) {
    return {
        type: SORT_DOGS,
        payload
    }
}

export function clearDetail() {
    return {
        type: CLEAR_DETAIL
    }
}

