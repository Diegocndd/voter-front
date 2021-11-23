import app from './ducks';
import {createStore, combineReducers} from 'redux';

const reducers = combineReducers({
    app,
});

export const Store = createStore(reducers);
