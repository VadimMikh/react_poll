import { 
    UPDATE_POLL,
    ACTIVATE_POLL,
    DEACTIVATE_POLL
} from './types'

export function updatePoll(poll) {
    return {
        type: UPDATE_POLL,
        payload: poll
    }
}

export function activatePoll(id) {
    return {
        type: ACTIVATE_POLL,
        payload: id
    }
}

export function deactivatePoll(id) {
    return {
        type: DEACTIVATE_POLL,
        payload: id
    }
}