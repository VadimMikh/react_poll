import { combineReducers } from 'redux'

import pollReducer from './pollReducer'
import userReducer from './userReduser'

export default combineReducers({
    user: userReducer,
    polls: pollReducer
})