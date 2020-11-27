import { combineReducers } from 'redux'

import pollReducer from './pollReducer'
import qnaReducer from './qnaReducer'
import userReducer from './userReduser'

export default combineReducers({
    user: userReducer,
    polls: pollReducer,
    qna: qnaReducer
})