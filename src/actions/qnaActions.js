export function addQuestion(item) {
    return {
        type: 'ADD_QUESTION',
        payload: item
    }
}

export function likeQuestion(id) {
    return {
        type: 'LIKE_QUESTION',
        payload: id
    }
}

export function dislikeQuestion(id) {
    return {
        type: 'DISLIKE_QUESTION',
        payload: id
    }
}

export function deleteQuestion(id) {
    return {
        type: 'DELETE_QUESTION',
        payload: id
    }
}

export function approveQuestion(id) {
    return {
        type: 'APPROVE_QUESTION',
        payload: id
    }
}