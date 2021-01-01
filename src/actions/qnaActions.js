import { 
    ACTIVATE_QUESTIONS,
    DEACTIVATE_QUESTIONS,
    ADD_QUESTION,
    LIKE_QUESTION,
    DISLIKE_QUESTION,
    DELETE_QUESTION,
    APPROVE_QUESTION
} from './types'

export const activateQuestions = () => ({
    type: ACTIVATE_QUESTIONS
})

export const deactivateQuestions = () => ({
    type: DEACTIVATE_QUESTIONS
})

export const addQuestion = item => ({
    type: ADD_QUESTION,
    payload: item
})

export const likeQuestion = id => ({
    type: LIKE_QUESTION,
    payload: id
})

export const dislikeQuestion = id => ({
    type: DISLIKE_QUESTION,
    payload: id
})

export const deleteQuestion = id => ({
    type: DELETE_QUESTION,
    payload: id
})

export const approveQuestion = id => ({
    type: APPROVE_QUESTION,
    payload: id
})