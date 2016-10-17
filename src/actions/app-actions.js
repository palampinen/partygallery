import _ from 'lodash';
import api from '../services/api';


const SELECT_ITEM = 'SELECT_ITEM';
const selectItem = item => ({ type: SELECT_ITEM, payload: item });
const closeItem = item => ({ type: SELECT_ITEM, payload: null });

const SET_ITEMS = 'SET_ITEMS';
const GET_FEED_REQUEST = 'GET_FEED_REQUEST';
const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS';
const GET_FEED_FAILURE = 'GET_FEED_FAILURE';
const HIDE_LOAD_MORE = 'HIDE_LOAD_MORE';
const fetchItems = () => {
  return (dispatch) => {
    dispatch({ type: GET_FEED_REQUEST });

    api.fetchModels('feed')
      .then(items => {
        dispatch({
          type: SET_ITEMS,
          payload: items
        });
        if (_.isEmpty(items)) {
          dispatch({ type: HIDE_LOAD_MORE });
        }

        dispatch({ type: GET_FEED_SUCCESS });
      })
      .catch(error => dispatch({ type: GET_FEED_FAILURE, error: true, payload: error }));
  };
};


const APPEND_ITEMS = 'APPEND_ITEMS';
const REFRESH_FEED_REQUEST = 'REFRESH_FEED_REQUEST';
const REFRESH_FEED_SUCCESS = 'REFRESH_FEED_SUCCESS';
const loadMoreItems = (lastID) => {
  return (dispatch) => {

    dispatch({ type: REFRESH_FEED_REQUEST });
    api.fetchMoreFeed(lastID)
      .then(items => {
        dispatch({
          type: APPEND_ITEMS,
          payload: items
        });
        dispatch({ type: REFRESH_FEED_SUCCESS });
        dispatch({ type: GET_FEED_SUCCESS });
      })
      .catch(error => dispatch({ type: REFRESH_FEED_SUCCESS }));
  };
};

export {
  APPEND_ITEMS,
  SET_ITEMS,
  SELECT_ITEM,
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_FEED_FAILURE,
  REFRESH_FEED_REQUEST,
  REFRESH_FEED_SUCCESS,
  HIDE_LOAD_MORE,

  fetchItems,
  selectItem,
  closeItem,
  loadMoreItems,
};