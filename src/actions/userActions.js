import {
    SET_ADMIN_TYPE,
    SET_USER_TYPE
} from './types'

export const switchToAdmin = () => ({
    type: SET_ADMIN_TYPE
})

export const switchToUser = () => ({
    type: SET_USER_TYPE
})