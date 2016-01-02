// Libs
import 'velocity-animate';
import 'bootstrap-webpack';
import './style/app.styl';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

// Redux libs
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/reducer.js';
import { syncReduxAndRouter } from 'redux-simple-router';

// Pages
import Home from './containers/home.jsx';
import NotFound from './containers/not-found.jsx';
import Index from './containers/index.jsx';
import Todos from './containers/Todos/todos.jsx';

// Redux store
const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk, promise, logger)(createStore);
const store = createStoreWithMiddleware(rootReducer);

// Routing
const history = createBrowserHistory();
syncReduxAndRouter(history, store);

// Main class - App
let App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={Index}>
        <IndexRoute component={Home}/>
        <Route path='/home' component={Home}/>
        <Route path='/todos' component={Todos}/>
      </Route>
      <Route path='*' component={NotFound}/>
    </Router>
  </Provider>
);

ReactDOM.render(<App/>, document.getElementById('app'));
