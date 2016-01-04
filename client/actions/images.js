require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';


// Action constants
export const REQUEST_IMAGES = 'REQUEST_IMAGES';
export const RECEIVE_IMAGES = 'RECEIVE_IMAGES';
export const LIKE_IMAGE = 'LIKE_IMAGE';
export const DISLIKE_IMAGE = 'DISLIKE_IMAGE';
export const SET_TAG = 'SET_TAG';
export const SET_SORT = 'SET_SORT';
export const RESET_IMAGES = 'RESET_IMAGES';

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

function setTag(tag) {
  return {
    type: SET_TAG,
    tag
  };
}

function resetImages() {
  return {
    type: RESET_IMAGES,
  };
};

// Update the new tag in the state and fetch new images
export function updateTag(tag) {
  return (dispatch) => {
    dispatch(setTag(tag));
    dispatch(resetImages());
  };
}

function setSort(sort) {
  return {
    type: SET_SORT,
    sort
  };
}

// Update the new sort in the state and fetch new images
export function updateSort(sort) {
  return (dispatch) => {
    dispatch(setSort(sort));
    dispatch(resetImages());
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

// Remove images already liked from the answer of the API
function filterFetchedImages(json, state) {
  return Object.assign({}, json, {data: Object.assign({}, json.data, {items:
    json.data.items.filter((item) => (state.images.imageLiked.indexOf(item.id) === -1))
  })});
}

// Fetch images from IMNGUR API
function fetchImages(state) {
  return dispatch => {
    dispatch(requestImages());
    const pagination = state.images.pagination;
    const tag = state.images.tag;
    const sort = state.images.sort;

    return fetch(`https://api.imgur.com/3/gallery/t/${tag}/${sort}/${pagination}.json`,
      {method: 'GET',headers: {'Authorization': 'Client-ID 6755073f1310a88'}})
      .then(response => response.json())
      .then(json => filterFetchedImages(json, state))
      .then(json => dispatch(receiveImages(json)));
  };
};

function shouldFetchImages(state) {
  const imageList = state.images.imageList.length === 0 ? [] :
    state.images.imageList.filter((image) => !image['isLiked']).map((image) => image);
  return (imageList.length < 5);
}


// Automatically check if new images needed
export function fetchImagesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchImages(getState())) {
      return dispatch(fetchImages(getState()));
    }
  };
};
