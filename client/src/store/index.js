import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import {requestsPromiseMiddleware} from "redux-saga-requests";
import thunkMiddleware from "redux-thunk";
import saga from './saga'

import auth from '../store/auth/reducer'
import folders from '../store/folders/reducer'
import files from '../store/files/reducer'

const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
    auth,
    folders,
    files
});

const sagaMiddleware = createSagaMiddleware();

const index = createStore(
    rootReducer,
    applyMiddleware(
        requestsPromiseMiddleware({ auto: true}),
        thunkMiddleware,
        sagaMiddleware,
        loggerMiddleware
    )
);

sagaMiddleware.run(saga);

export default index;
