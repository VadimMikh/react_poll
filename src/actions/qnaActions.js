import { 
    ACTIVATE_QUESTIONS,
    DEACTIVATE_QUESTIONS,
    ADD_QUESTION,
    LIKE_QUESTION,
    DISLIKE_QUESTION,
    DELETE_QUESTION,
    APPROVE_QUESTION
} from './types'

export function activateQuestions() {
    return {
        type: ACTIVATE_QUESTIONS
    }
}

export function deactivateQuestions() {
    return {
        type: DEACTIVATE_QUESTIONS
    }
}

export function addQuestion(item) {
    return {
        type: ADD_QUESTION,
        payload: item
    }
}

export function likeQuestion(id) {
    return {
        type: LIKE_QUESTION,
        payload: id
    }
}

export function dislikeQuestion(id) {
    return {
        type: DISLIKE_QUESTION,
        payload: id
    }
}

export function deleteQuestion(id) {
    return {
        type: DELETE_QUESTION,
        payload: id
    }
}

export function approveQuestion(id) {
    return {
        type: APPROVE_QUESTION,
        payload: id
    }
}