import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import { REQUEST_IMAGES, RECEIVE_IMAGES, LIKE_IMAGE, DISLIKE_IMAGE } from 'images.js';

// Handle the image object state
function imageItem(state = {}, action) {
  switch (action.type) {
    case (RECEIVE_IMAGES):
      return Object.assign({}, state, {isLiked: false});
    case (LIKE_IMAGE):
      return state.id !== action.image.id ? state : Object.assign({}, state, {isLiked: true});
    default: return state;
  }
}

// Handle the image list state
function imageList(state = [], action) {
  switch (action.type) {
    case (RECEIVE_IMAGES):
      return [
        ...state,
        ...action.images.map((image) => imageItem(image, action))
      ];
    case (DISLIKE_IMAGE):
      const index = state.filter((image) => (image.id === action.image.id)).map((image) => state.indexOf(image))[0];
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
    case (LIKE_IMAGE):
      return state.map((image) => {
        return imageItem(image, action);
      });
    default: return state;
  }
}

// Handle the images
function images(state = {
  isFetching: false,
  pagination: 0,
  sort: 'viral',
  section: 'top',
  imageList: [],
}, action) {
  switch (action.type) {
    case (REQUEST_IMAGES):
      return Object.assign({}, state, {isFetching: true});
    case (RECEIVE_IMAGES):
      return Object.assign({}, state,
          {isFetching: false, pagination: state.pagination + 1, imageList: imageList(state.imageList, action)});
    case (LIKE_IMAGE):
      return Object.assign({}, state, {imageList: imageList(state.imageList, action)});
    case (DISLIKE_IMAGE):
      return Object.assign({}, state, {imageList: imageList(state.imageList, action)});
    default: return state;
  }
};

const todoApp = combineReducers({
  routing: routeReducer,
  images: images,
});

export default todoApp;
