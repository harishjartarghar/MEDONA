import {createStore, combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import authReducers from './reducers/authReducers';
import snackbarReducers from './reducers/snackbarReducer';
import donationReducers from './reducers/donationReducer';




export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
           auth:authReducers,
           snackbar:snackbarReducers,
           donation:donationReducers
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}