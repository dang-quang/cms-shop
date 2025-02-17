/**
 * Created by Long ND on 3/8/21.
 */

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from '../saga/sagas';
import logger from 'redux-logger';
import { createRouterMiddleware } from 'connected-next-router';
import thunk from 'redux-thunk';

/**s
 *  Redux Store configuration
 */
const sagaMiddleware = createSagaMiddleware();
const routerMiddleware = createRouterMiddleware();

// create store
const store = createStore(
  reducers,
  compose(applyMiddleware(sagaMiddleware, routerMiddleware, logger, thunk))
);

sagaMiddleware.run(rootSaga);
export default store;
