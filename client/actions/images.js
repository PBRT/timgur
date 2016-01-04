require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';


// Action constants
export const REQUEST_IMAGES = 'REQUEST_IMAGES';
export const RECEIVE_IMAGES = 'RECEIVE_IMAGES';
export const LIKE_IMAGE = 'LIKE_IMAGE';
export const DISLIKE_IMAGE = 'DISLIKE_IMAGE';

export function likeImage(image) {
  return {
    type: LIKE_IMAGE,
    image
  };
}

export function dislikeImage(image) {
  return {
    type: DISLIKE_IMAGE,
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

// Fetch images from IMNGUR API
function fetchImages(state) {
  return dispatch => {
    dispatch(requestImages());
    const pagination = state.images.pagination;
    const section = state.images.section;
    const sort = state.images.sort;

    return fetch(`https://api.imgur.com/3/gallery/${section}/${sort}/${pagination}.json`,
      {method: 'GET',headers: {'Authorization': 'Client-ID 6755073f1310a88'}})
      .then(response => response.json())
      .then(json => dispatch(receiveImages(json)));
  };
};

function shouldFetchImages(state) {
  const imageList = state.images.imageList.length === 0 ? [] :
    state.images.imageList.filter((image) => !image['isLiked']).map((image) => image);
  return (imageList.length < 45);
}


// Automatically check if new images needed
export function fetchImagesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchImages(getState())) {
      return dispatch(fetchImages(getState()));
    }
  };
};
