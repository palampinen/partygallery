import { fromJS } from 'immutable'
import _ from 'lodash';
import api from '../services/api';
import { getCityId } from './city';
import { localStorageKeys, getLocalStorageValue, setLocalStorageValue } from '../services/localstorage';

// # Action Types

const SELECT_ITEM = 'SELECT_ITEM';
const SET_ITEMS = 'SET_ITEMS';
const GET_FEED_REQUEST = 'GET_FEED_REQUEST';
const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS';
const GET_FEED_FAILURE = 'GET_FEED_FAILURE';
const HIDE_LOAD_MORE = 'HIDE_LOAD_MORE';
const APPEND_ITEMS = 'APPEND_ITEMS';
const REFRESH_FEED_REQUEST = 'REFRESH_FEED_REQUEST';
const REFRESH_FEED_SUCCESS = 'REFRESH_FEED_SUCCESS';
const SET_SORT_TYPE = 'SET_SORT_TYPE';
const TOGGLE_URL_VIEW = 'TOGGLE_URL_VIEW';
// const SET_FEED = 'SET_FEED';


// # Selectors
export const getFeedSortType = state => state.feed.get('sortType');
export const getFeedSortTypeOptions = state => state.feed.get('sortTypeOptions');
export const isUrlViewVisible = state => state.feed.get('isUrlViewVisible');

const getFeedByType = types => createSelector(
  getFeedItems, feedItems => {
    if (!types || !types.length){
      return feedItems;
    }
    const typeArray = _.castArray(types);

    return feedItems.filter(item => typeArray.indexOf(item.get('type')) >= 0);
  });
export const getFeedImages = getFeedByType('IMAGE');

// # Action Creators
export const selectItem = item => ({ type: SELECT_ITEM, payload: item });
export const closeItem = item => ({ type: SELECT_ITEM, payload: null });

const getFeedParams = (state) => {
  const sort = getFeedSortType(state);

  return { sort, limit: 100 };
}

export const fetchFeed = () => (dispatch, getState) => {
  dispatch({ type: GET_FEED_REQUEST });

  const state = getState();
  const initialFetchParams = Object.assign(getFeedParams(state), { limit: 100 });

  api.fetchModels('feed', initialFetchParams)
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

// const refreshFeed = () => (dispatch, getState) => {
//   dispatch({ type: REFRESH_FEED_REQUEST });

//   const state = getState();
//   const params = getFeedParams(state);

//   return api.fetchModels('feed', params)
//   .then(items => {
//     dispatch({
//       type: SET_FEED,
//       feed: items
//     });
//     dispatch({ type: REFRESH_FEED_SUCCESS });
//     dispatch({ type: GET_FEED_SUCCESS });
//   })
//   .catch(error => dispatch({ type: REFRESH_FEED_SUCCESS, error: true, payload: error }));
// };


export const loadMoreItems = lastID => (dispatch, getState) => {
  const state = getState();
  const params = getFeedParams(state);

  dispatch({ type: REFRESH_FEED_REQUEST });
  api.fetchMoreFeed(lastID, params)
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

export const setSortType = sortType => (dispatch, getState) => {
  Promise.resolve(
    dispatch({ type: SET_SORT_TYPE, payload: sortType })
  ).then(() => dispatch(fetchFeed()));
};

export const toggleUrlView = () => (dispatch, getState) => {
  const state = getState();
  const visible = isUrlViewVisible(state);

  dispatch({ type: TOGGLE_URL_VIEW, payload: !visible })
}

// # Reducer

const sortTypeOptions = [
  { name: 'new', icon: 'ion-android-time'},
  { name: 'hot', icon: 'ion-flame'},
];

const initialState = fromJS({
  items: [],
  chosenItem: null,
  showLoadMore: true,
  lastItemId: '',
  loading: false,
  isUrlViewVisible: false,
  sortType: getLocalStorageValue(localStorageKeys.FEED_SORT) || sortTypeOptions[0].name,
  sortTypeOptions
});

// Get only images
const filterImages = items => items.filter(item => item.type === 'IMAGE');


export default function feed(state = initialState, action) {
  switch (action.type) {
    case SET_ITEMS: {
      const { payload } = action;
      return state.merge({
        items: fromJS(filterImages(payload)),
        lastItemId: payload[payload.length - 1].id
      });
    }
    case SELECT_ITEM:
      return state.set('chosenItem', fromJS(action.payload));

    case APPEND_ITEMS: {
      const { payload } = action;
      return (payload && payload.length)
        ? state.merge({
          items: fromJS(state.get('items')
          .concat(fromJS(filterImages(payload)))),
          lastItemId: payload[payload.length - 1].id
        })
        : state;
    }
    case HIDE_LOAD_MORE:
      return state.set('showLoadMore', false);

    case GET_FEED_REQUEST:
      return state.merge({
        loading: true,
        items: fromJS([])
      });

    case REFRESH_FEED_REQUEST:
      return state.set('loading', true);

    case GET_FEED_SUCCESS:
    case REFRESH_FEED_SUCCESS:
      return state.set('loading', false)

    case SET_SORT_TYPE:
      setLocalStorageValue(localStorageKeys.FEED_SORT, action.payload);
      return state.set('sortType', action.payload);

    case TOGGLE_URL_VIEW:
      return state.set('isUrlViewVisible', action.payload);

    default:
      return state;
  }
}
