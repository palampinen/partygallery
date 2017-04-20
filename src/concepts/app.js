import { fetchCities } from './city';
import { fetchFeed } from './feed';

// # Action Creators
export const startApp = () => (dispatch, getState) => {
  console.log('Start App');
  return Promise.resolve(
    dispatch(fetchCities())
  ).then(() => dispatch(fetchFeed()));
}