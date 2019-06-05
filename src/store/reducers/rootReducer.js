import authReducer from './authReducer'
import animeReducer from './animeReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    anime: animeReducer
});

export default rootReducer