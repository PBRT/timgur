### TIMGUR

Tinder UI for like or dislike image provided by IMGUR available at [timgur.herokuapp.com](https://timgur.herokuapp.com).

Based on my own kickstarter [ReacToGo](https://github.com/PBRT/reactogo) using
  * [Stylus preprocessing](https://learnboost.github.io/stylus/)
  * [Webpack building and webpack dev server](http://webpack.github.io/)
  * [Stylus export loader] (https://github.com/PBRT/stylus-export-loader)
  * [React](https://facebook.github.io/react/)
  * [React Router](https://github.com/rackt/react-router)
  * [VelocityJS](http://julian.com/research/velocity/)
  * [Redux](http://redux.js.org/)


## Installation

Simply clone this project on your local machine and then : 

``` cd imgur ```
``` npm install ```
``` npm run start ```

And go to [localhost:3000](http://localhost:3000) in your favourite browser. It will start the ```webpack-dev-server``` on the 3000 port and proxy all the requests to your future production server (expressjs) on the port 9000. So you can also develop all your endpoints while having hot reload enable.

## External Libs

A lot of externals librairies are used in this project for differents goals:

1. UI : [VelocityJS](http://julian.com/research/velocity/) for handling the logic business animations, [React-Motion](https://github.com/chenglou/react-motion) for handling the Page transition animation. I initially wanted to use it for animating the swiping between cards as well.

2. Logic: [Redux](http://redux.js.org/) for managing the App State and API request. It's giving the current state of the whole app. All the action dispatched are visible thanks to the [Redux Logger Middleware](https://github.com/fcomb/redux-logger). The [Redux Thunk Middleware](https://github.com/gaearon/redux-thunk) is enabling function to be dispatched as well(useful for API calls). [React](https://facebook.github.io/react/) is simply used for the UI components and is mapped to [Redux](http://redux.js.org/) events with [React-Redux](https://github.com/rackt/react-redux). 

3. Style: I used [Stylus preprocessing](https://learnboost.github.io/stylus/) for having variables and keep my UI kit in one place. It's used in combination with [Stylus export loader] (https://github.com/PBRT/stylus-export-loader) for having these stylus variables accessible in the javascript.

4. Routing: [React Router](https://github.com/rackt/react-router) is used for handling the route changes in combinaison with [Redux-Simple-Router](https://github.com/rackt/redux-simple-router) to map it with Redux events.

5. Platform and Server: An [ExpressJS](http://expressjs.com/) server is handling the API request with [Imgur API](http://imgur.com/) and distributing the code build by [Webpack](http://webpack.github.io/docs/node.js-api.html) handling all the transformation (transpile, preprocessing, assets...) and production operations.

All is written in ES6 or ES2015 for the hipsters, transpiled by [Babel-Loader](https://github.com/babel/babel-loader) 

## To do

  * Implement [ImmutableJS](https://facebook.github.io/immutable-js/) for the state object
  * Modify ImageSwiper structure for adding In and Out animation and gestures
  * Add User Login and persistant data 
  * Learn [ELM](http://elm-lang.org/)

