import Immutable from 'immutable';

import {
  SET_ITEMS,
  SELECT_ITEM,
  APPEND_ITEMS,
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  REFRESH_FEED_REQUEST,
  REFRESH_FEED_SUCCESS,
  HIDE_LOAD_MORE
} from '../actions/app-actions';

const initialState = Immutable.fromJS({
  items: [],
  chosenItem: null,
  showLoadMore: true,
  lastItemId: '',
  loading: false
});

// Get only images
const filterImages = items => items.filter(item => item.type === 'IMAGE');


export default function app(state = initialState, action) {
  switch (action.type) {
    case SET_ITEMS: {
      const { payload } = action;
      return state.merge({
        items: Immutable.fromJS(filterImages(payload)),
        lastItemId: payload[payload.length - 1].id
      });
    }
    case SELECT_ITEM:
      return state.set('chosenItem', Immutable.fromJS(action.payload));

    case APPEND_ITEMS: {
      const { payload } = action;
      return (payload && payload.length)
        ? state.merge({
          items: Immutable.fromJS(state.get('items')
          .concat(Immutable.fromJS(filterImages(payload)))),
          lastItemId: payload[payload.length - 1].id
        })
        : state;
    }
    case HIDE_LOAD_MORE:
      return state.set('showLoadMore', false);

    case GET_FEED_REQUEST:
    case REFRESH_FEED_REQUEST:
      return state.set('loading', true);

    case GET_FEED_SUCCESS:
    case REFRESH_FEED_SUCCESS:
      return state.set('loading', false)

    default:
      return state;
  }
}
