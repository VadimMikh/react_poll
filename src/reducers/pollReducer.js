import { 
    UPDATE_POLL,
    ACTIVATE_POLL,
    DEACTIVATE_POLL
} from '../actions/types'

const initialState = {
    allPolls: [
        {
            pollId: 1,
            question: 'How are you?',
            voted: [],
            active: true,
            answers: [
                {   
                    id: 123,
                    text: 'Good',
                    votes: 7,
                    selected: false
                },
                {
                    id: 234535,
                    text: 'Bad',
                    votes: 2,
                    selected: false
                },
                {   
                    id: 64747,
                    text: 'Not sure',
                    votes: 5,
                    selected: false
                }
            ]
        },
        {
            pollId: 2,
            question: 'Are you hungry?',
            voted: [],
            active: false,
            answers: [
                {   
                    id: 12564563,
                    text: 'Yes',
                    votes: 9,
                    selected: false
                },
                {
                    id: 2345675674535,
                    text: 'No',
                    votes: 4,
                    selected: false
                }
            ]
        },
        {
            pollId: 3,
            question: 'How is the weather today?',
            voted: [],
            active: false,
            answers: [
                {   
                    id: 12678683,
                    text: 'Sunny',
                    votes: 7,
                    selected: false
                },
                {
                    id: 2341231535,
                    text: 'Cloudy',
                    votes: 3,
                    selected: false
                },
                {   
                    id: 6476898947,
                    text: 'Rainy',
                    votes: 6,
                    selected: false
                },
                {   
                    id: 647689844947,
                    text: 'Snowing',
                    votes: 1,
                    selected: false
                }
            ]
        },
    ]
}

export default (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_POLL:
        return {
            ...state,
            allPolls: [
                ...state.allPolls.map(poll => {
                    if (poll.pollId === action.payload.pollId) {
                        return {
                            ...poll,
                            ...action.payload
                        }
                    } 
                    return poll
                }),
            ]
        }
    case ACTIVATE_POLL:
        return {
            ...state,
            allPolls: [
                ...state.allPolls.map(poll => {
                    return {
                        ...poll,
                        active: poll.pollId === action.payload
                    }
                }),
            ]
        }
    case DEACTIVATE_POLL:
        return {
            ...state,
            allPolls: [
                ...state.allPolls.map(poll => {
                    if (poll.pollId === action.payload) {
                        return {
                            ...poll,
                            active: false
                        }
                    }
                    return poll
                }),
            ]
        }
    default:
        return state
    }
}