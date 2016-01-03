import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import { REQUEST_IMAGES, RECEIVE_IMAGES, LIKE_IMAGE } from '../actions/images';

function imageItem(state = {}, action) {
  switch (action.type) {
    case (LIKE_IMAGE):
      return state.id !== action.image.id ? state : Object.assign({}, state, {liked: true});
    default: return state;
  }
}

function imageList(state = [], action) {
  switch (action.type) {
    case (RECEIVE_IMAGES):
      let test = _.clone(state);
      action.images.map((image) => test.push(image));
      return test;
    case (LIKE_IMAGE):
      return state.map((image) => {
        return imageItem(image, action);
      });
    default: return state;
  }
}

function images(state = {isFetching: false, images: []}, action) {
  switch (action.type) {
    case (REQUEST_IMAGES):
      return Object.assign({}, state, {isFetching: true});
    case (RECEIVE_IMAGES):
      return Object.assign({}, state, {isFetching: false, images: imageList(state.images, action)});
    case (LIKE_IMAGE):
      return Object.assign({}, state, {images: imageList(state.images, action)});
    default: return state;
  }
};

const todoApp = combineReducers({
  routing: routeReducer,
  images: images,
});

export default todoApp;
