import { fromJS } from 'immutable';

import { fetchCities } from './city';
import { fetchFeed } from './feed';

// # Action Types
const START_APP = 'app/START_APP';

// # Action Creators
export const startApp = () => (dispatch, getState) => {
  console.log('Start App');
  return Promise.resolve(
    dispatch(fetchCities())
  ).then(() => dispatch(fetchFeed()));
}


// # Reducer
const initialState = fromJS({
  settings: {}
});

export default function app(state = initialState, action) {
  switch (action.type) {
    case START_APP: {
      return state;
    }

    default:
      return state;
  }
}
