import { 
    ACTIVATE_QUESTIONS,
    DEACTIVATE_QUESTIONS,
    ADD_QUESTION,
    LIKE_QUESTION,
    DISLIKE_QUESTION,
    DELETE_QUESTION,
    APPROVE_QUESTION
} from '../actions/types'

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
            questions: state.questions.map(item => item.id === action.payload ? {...item, likes: item.likes + 1} : item)
        }
    case DISLIKE_QUESTION:
        return {
            ...state,
            questions: state.questions.map(item => item.id === action.payload ? {...item, likes: item.likes - 1} : item)
        }
    case APPROVE_QUESTION:
        return {
            ...state,
            questions: state.questions.map(item => item.id === action.payload ? {...item, approved: true} : item)
        }
    default:
        return state
    }
}