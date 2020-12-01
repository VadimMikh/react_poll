import { 
    ACTIVATE_QUESTIONS,
    DEACTIVATE_QUESTIONS,
    ADD_QUESTION,
    LIKE_QUESTION,
    DISLIKE_QUESTION,
    DELETE_QUESTION,
    APPROVE_QUESTION
} from './../actions/actions'

const initialState = {
    questions: [],
    active: false
}

export default (state = initialState, action) => {
    switch (action.type) {
    case ACTIVATE_QUESTIONS:
        return {
            ...state,
            active: true
        }
    case DEACTIVATE_QUESTIONS:
        return {
            ...state,
            active: false
        }
    case ADD_QUESTION:
        return {
            ...state,
            questions: state.questions.concat(action.payload)
        }
    case DELETE_QUESTION:
        return {
            ...state,
            questions: state.questions.filter(item => item.id !== action.payload)
        }
    case LIKE_QUESTION:
        return {
            ...state,
            questions: [
                ...state.questions.map(item => {
                    if (item.id === action.payload) {
                        return {
                            ...item,
                            likes: item.likes + 1
                        }
                    }
                    return item
                })
            ]
        }
    case DISLIKE_QUESTION:
        return {
            ...state,
            questions: [
                ...state.questions.map(item => {
                    if (item.id === action.payload) {
                        return {
                            ...item,
                            likes: item.likes - 1
                        }
                    }
                    return item
                })
            ]
        }
    case APPROVE_QUESTION:
        return {
            ...state,
            questions: [
                ...state.questions.map(item => {
                    if (item.id === action.payload) {
                        return {
                            ...item,
                            approved: true
                        }
                    }
                    return item
                })
            ]
        }
    default:
        return state
    }
}