import { fromJS } from 'immutable'

import { fetchFeed } from './feed';
import api from '../services/api';
import { localStorageKeys, getLocalStorageValue, setLocalStorageValue } from '../services/localstorage';


// # Action Types
const SET_CITY = 'city/SET_CITY';
const SET_CITY_LIST = 'city/SET_CITY_LIST';
const GET_CITY_LIST_REQUEST = 'city/GET_CITY_LIST_REQUEST';
const GET_CITY_LIST_SUCCESS = 'city/GET_CITY_LIST_SUCCESS';
const GET_CITY_LIST_FAILURE = 'city/GET_CITY_LIST_FAILURE';
const FETCH_CITY_CONTENT_SUCCESS = 'city/FETCH_CITY_CONTENT_SUCCESS';


// # Selectors
export const getCityList = state => state.city.get('list', fromJS([])) || fromJS([]);
export const getCityId = state => state.city.get('id');


// # Action Creators

export const fetchCitySpecificContent = () => dispatch =>
  Promise.all([
    dispatch(fetchFeed())
  ])
  .then(() => dispatch({ type: FETCH_CITY_CONTENT_SUCCESS }))


export const setCity = (cityId) => dispatch => {
  // set to state
  dispatch({ type: SET_CITY, payload: cityId })

  dispatch(fetchCitySpecificContent())
}

export const initializeUsersCity = () => (dispatch, getState) => {
  const defaulCityId = '2';
  const savedCityId = getLocalStorageValue(localStorageKeys.CITY);
  const cities = getCityList(getState());

  const cityId = savedCityId || cities.getIn([0, 'id']) || defaulCityId;

  dispatch(setCity(cityId))
};

export const fetchCities = () => dispatch => {
  dispatch({ type: GET_CITY_LIST_REQUEST });

  return api.fetchModels('cities')
  .then(cities => {
    dispatch({ type: GET_CITY_LIST_SUCCESS });
    return dispatch({
      type: SET_CITY_LIST,
      payload: cities
    });
  })
  .then(() => dispatch(initializeUsersCity()))
  .catch(error => dispatch({ type: GET_CITY_LIST_FAILURE, error: true, payload: error }));
};


// # Reducer

const initialState = fromJS({
  id: getLocalStorageValue(localStorageKeys.CITY),
  list: [],
});

export default function city(state = initialState, action) {
  switch (action.type) {
    case SET_CITY_LIST: {
      return state.set('list', fromJS(action.payload));
    }

    case SET_CITY: {
      const cityId = parseInt(action.payload, 10);
      setLocalStorageValue(localStorageKeys.CITY, cityId);
      return state.set('id', cityId);
    }

    default: {
      return state;
    }
  }
}
