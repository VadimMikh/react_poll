import {
    SET_ADMIN_TYPE,
    SET_USER_TYPE
} from './actions'

export function switchToAdmin() {
    return {
        type: SET_ADMIN_TYPE
    }
}

export function switchToUser() {
    return {
        type: SET_USER_TYPE
    }
}