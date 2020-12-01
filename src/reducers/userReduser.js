import {
    SET_ADMIN_TYPE,
    SET_USER_TYPE
} from './../actions/actions'

const initialState = {
    type: 'user',
    name: 'Anonymous'
}

export default (state = initialState, action) => {
    switch (action.type) {
    case SET_ADMIN_TYPE:
        return {
            ...state,
            type: 'admin'
        }
    case SET_USER_TYPE:
        return {
            ...state,
            type: 'user'
        }
    default:
        return state
    }
}