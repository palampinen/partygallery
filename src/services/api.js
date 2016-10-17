
import Endpoints from '../constants/Endpoints';
import * as ENV from '../env';
import 'whatwg-fetch';


const VERSION_NUMBER = ENV.VERSION;
const USER_UUID = ENV.UUID;
const API_TOKEN = ENV.API_TOKEN;


const checkResponseStatus = response => {
  if (response.status >= 200 && response.status < 400) {
    return response;
  } else {
    return response.json()
      .then(res => {
        console.log('Error catched', response);
        const error = new Error(response.statusText);
        error.response = response;
        error.responseJson = res;
        throw error;
      });
  }
};


// Our own wrapper for fetch. Logs the request, adds required version headers, etc.
// Instead of using fetch directly, always use this.
const galleryFetch = (url, opts) => {
  opts = opts || {};
  opts.headers = opts.headers || {};


  opts.headers.Accept = 'application/json';
  opts.headers['x-client-version'] = VERSION_NUMBER;
  opts.headers['x-user-uuid'] = USER_UUID;
  opts.headers['x-token'] = API_TOKEN;
  opts.headers['content-type'] = 'application/json; charset=utf-8';
  opts.headers['x-requested-with'] = 'XMLHttpRequest';


  return fetch(url, opts);
};


// Not actually caching like in the RN version
const cachedFetch = (url, opts) => {
  return galleryFetch(url, opts)
  .then(response => {
    // If server responds with error, it is thrown
    if (isErrorResponse(response.status)) {
      const error = new Error(response.statusText);
      error.response = response;
      error.status = response.status;
      throw error;
    }

    return response.json();
  })
  .catch(error => {
    if (error.response) {
      // Re-throw server errors
      throw error;
    }
    return Promise.reject(null);

  });
}


const _post = (url, body) => {
  return galleryFetch(url, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(checkResponseStatus);
};

const _put = (url, body) => {
  return galleryFetch(url, {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(checkResponseStatus);
};

const _delete = (url, body) => {
  return galleryFetch(url, {
    method: 'delete',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(checkResponseStatus);
};


const fetchModels = modelType => {
  const url = Endpoints.urls[modelType];
  return cachedFetch(url);
};

const fetchUpdateFeed = afterId => {
  const params = { afterId };
  let url = Endpoints.urls.feed;
  url += '?' + Object.keys(params).map(k => {
    return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
  }).join('&');

  return cachedFetch(url);
};

const fetchMoreFeed = lastID => {
  const params = { beforeId: lastID, limit: 100 };
  let url = Endpoints.urls.feed;
  url += '?' + Object.keys(params).map(k => {
    return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
  }).join('&');

  return cachedFetch(url);
};

const postAction = (params, location) => {
  let payload = Object.assign({}, params, { user: USER_UUID });

  // Add location to payload, if it exists
  if (location) {
    payload.location = location;
  }

  return _post(Endpoints.urls.action, payload);
};

const putUser = payload => {
  return _put(Endpoints.urls.user(payload.uuid), payload);
};

const getUser = uuid => {
  return galleryFetch(Endpoints.urls.user(uuid))
    .then(checkResponseStatus)
    .then(response => response.json());
};

const loginUser = payload => {
  return _put(Endpoints.urls.login, payload)
    .then(response => response.json());
};

const deleteFeedItem = item => {
  return _delete(Endpoints.urls.feedItem(item.id));
};


function isErrorResponse(status) {
  return status && status >= 400;
}


export default {
  deleteFeedItem,
  fetchModels,
  fetchUpdateFeed,
  fetchMoreFeed,
  postAction,
  putUser,
  getUser,
  loginUser
};
