const initialState = {
    questions: []
}

export default (state = initialState, action) => {
    switch (action.type) {
    case 'ADD_QUESTION':
        return {
            ...state,
            questions: state.questions.concat(action.payload)
        }
    case 'DELETE_QUESTION':
        return {
            ...state,
            questions: state.questions.filter(item => item.id !== action.payload)
        }
    case 'LIKE_QUESTION':
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
    case 'DISLIKE_QUESTION':
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
    default:
        return state
    }
}