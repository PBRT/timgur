require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';

export const REQUEST_IMAGES = 'REQUEST_IMAGES';
export const RECEIVE_IMAGES = 'RECEIVE_IMAGES';
export const LIKE_IMAGE = 'LIKE_IMAGE';

export function likeImage(image) {
  return {
    type: LIKE_IMAGE,
    image
  };
}

function requestImages() {
  return {
    type: REQUEST_IMAGES,
  };
}

function receiveImages(json) {
  return {
    type: RECEIVE_IMAGES,
    images: json.data,
  };
}

export function fetchImages() {
  return dispatch => {
    dispatch(requestImages());
    return fetch(`https://api.imgur.com/3/gallery/hot/viral/0.json`,
      {method: 'GET',headers: {'Authorization': 'Client-ID 6755073f1310a88'}})
      .then(response => response.json())
      .then(json => dispatch(receiveImages(json)));
  };
};
