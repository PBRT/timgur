### TIMGUR

Tinder UI for like or dislike image provided by IMGUR. Based on my own kickstarter [ReacToGo](https://github.com/PBRT/reactogo) using
  * [Stylus preprocessing](https://learnboost.github.io/stylus/)
  * [Webpack building and webpack dev server](http://webpack.github.io/)
  * [Stylus export loader] (https://github.com/PBRT/stylus-export-loader)
  * [React](https://facebook.github.io/react/)
  * [React Router](https://github.com/rackt/react-router)
  * [React Motion](https://github.com/chenglou/react-motion)
  * [VelocityJS](http://julian.com/research/velocity/)
  * [Bootstrap (imported with webpack)](https://github.com/gowravshekar/bootstrap-webpack)
  * [Redux](http://redux.js.org/)


## Installation

Simply for this project on your local machine and then : 

``` cd reacToGo ```

``` npm install ```

``` npm run start ```

And go to `http://localhost:3000`in your favourite browser. It will start the ```webpack-dev-server``` on the 3000 port and proxy all the requests to your future production server (expressjs) on the port 9000. So you can also develop all your endpoints while having hot reload enable.


