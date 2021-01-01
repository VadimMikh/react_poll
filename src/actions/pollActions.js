import { 
    UPDATE_POLL,
    ACTIVATE_POLL,
    DEACTIVATE_POLL
} from './types'

export const updatePoll = poll => ({
    type: UPDATE_POLL,
    payload: poll
})

export const activatePoll = id => ({
    type: ACTIVATE_POLL,
    payload: id
})

export const deactivatePoll = id => ({
    type: DEACTIVATE_POLL,
    payload: id
})