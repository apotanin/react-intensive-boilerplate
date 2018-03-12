import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import reducer from '../reducers';
import { saga } from '../sagas/index';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({
    duration:  true,
    collapsed: true,
    diff:      true,
    colors:    {
        title:     () => '#139BFE',
        prevState: () => '#1C5FAF',
        action:    () => '#149945',
        nextState: () => '#A47104',
        error:     () => '#ff0005'
    }
});

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, logger];

const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware)));

sagaMiddleware.run(saga);

export default store;
