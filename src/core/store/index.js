import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';

import reducer from '../reducers';
import thunk from 'redux-thunk';
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

const middleWare = [thunk, logger];

export default createStore(reducer, composeEnhancers(applyMiddleware(...middleWare)));
