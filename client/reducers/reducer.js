import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import { REQUEST_IMAGES, RECEIVE_IMAGES, LIKE_IMAGE, DISLIKE_IMAGE, RESET_IMAGES, SET_TAG, SET_SORT } from 'images.js';
import { SET_VIEWPORT } from 'viewport.js';

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
        ...action.images.items.map((image) => imageItem(image, action))
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
    case (RESET_IMAGES):
      return state.filter((image) => image['isLiked']);
    default: return state;
  }
}

// Handle current tag
function tag(state = 'dogs', action) {
  switch (action.type) {
    case (SET_TAG): return action.tag;
    default: return state;
  }
};

// Handle current sort
function sort(state = 'viral', action) {
  switch (action.type) {
    case (SET_SORT): return action.sort;
    default: return state;
  }
};

function imageLiked(state=[], action) {
  switch(action.type) {
    case (LIKE_IMAGE): return [
      ...state,
      action.image.id,
    ];
    default: return state;
  }
};

// Handle the images
function images(state = {
  isFetching: false,
  pagination: 0,
  tag: 'dogs',
  sort: 'viral',
  imageList: [],
  imageLiked: [],
}, action) {
  switch (action.type) {
    case (REQUEST_IMAGES):
      return Object.assign({}, state, {isFetching: true});
    case (RECEIVE_IMAGES):
      return Object.assign({}, state, {
        isFetching: false,
        pagination: state.pagination + 1,
        imageList: imageList(state.imageList,action)});
    case (LIKE_IMAGE):
      return Object.assign({}, state, {
        imageLiked: imageLiked(state.imageLiked, action),
        imageList: imageList(state.imageList, action)});
    case (DISLIKE_IMAGE):
      return Object.assign({}, state, {imageList: imageList(state.imageList, action)});
    case (SET_TAG):
      return Object.assign({}, state, {tag: tag(state.tag, action)});
    case (SET_SORT):
      return Object.assign({}, state, {sort: sort(state.sort, action)});
    case (RESET_IMAGES):
      return Object.assign({}, state, {pagination: 0, imageList: imageList(state.imageList, action)});
    default: return state;
  }
};

// viewport handler
function viewport(state = {isMobile: false, isDesktop: true}, action) {
  switch(action.type) {
    case (SET_VIEWPORT):
      return Object.assign({}, {isMobile: action.width < 768, isDesktop: action.width >= 768});
    default: return state;
  }
};

const todoApp = combineReducers({
  routing: routeReducer,
  images: images,
  viewport: viewport
});

export default todoApp;
