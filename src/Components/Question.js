import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeQuestion, dislikeQuestion, deleteQuestion, approveQuestion } from '../actions/qnaActions'
import { useUser } from '../customHooks'
import Sprite from './../../node_modules/bootstrap-icons/bootstrap-icons.svg'

const Question = ({ question }) => {
    const [ isAdmin ] = useUser()
    const [ liked, setliked ] = useState(false)
    const dispatch = useDispatch()

    const likesHandler = () => {
        const hadnler = liked ? dislikeQuestion : likeQuestion
        
        dispatch(hadnler(question.id))
        setliked(!liked)
    }

    const deleteQuestionHandler = () => {
        dispatch(deleteQuestion(question.id))
    }

    const approveHandler = () => {
        dispatch(approveQuestion(question.id))
    }

    return (
        <div className="qna-question alert alert-light alert-dismissible" role="listitem">
            <div className="d-flex align-items-center mb-2">
                <svg className="bi" width="16" height="16">
                    <use href={ Sprite + "#person-circle" }/>
                </svg>
                <span className="qna-question-author ml-2">{question.author}</span>
                {(isAdmin && !question.approved) 
                    && <button type="button" onClick={approveHandler} className="btn btn-success btn-sm ml-3">Approve</button>}
            </div>
            <p className="qna-question-text mb-0">{question.text}</p>
            <a type="button" className="qna-question-like d-flex align-items-center" onClick={likesHandler}>
                <span className="mr-1">{question.likes}</span>
                <svg className="bi" width="16" height="16">
                    <use href={ Sprite + "#hand-thumbs-up" }/>
                </svg>
            </a>
            {isAdmin && <button type="button" onClick={deleteQuestionHandler} className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>}
        </div>
    )
}

export default Question
