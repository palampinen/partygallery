// Prefix for localStorage keys
const APP_PREFIX = 'whappu-web-';

// Local Storage Keys
export const localStorageKeys = {
  CITY: 'city',
  FEED_SORT: 'feed-sort'
};

// LocalStorage Getter and Setter
export const getLocalStorageValue = (key) => localStorage.getItem(`${APP_PREFIX}${key}`);
export const setLocalStorageValue = (key, value) => localStorage.setItem(`${APP_PREFIX}${key}`, value);
